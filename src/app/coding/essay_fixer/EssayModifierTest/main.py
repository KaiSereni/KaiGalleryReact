from flask import Flask, request
from flask_cors import CORS
import torch
import json
from transformers import AutoTokenizer, AutoModelForCausalLM
import logging
from functools import lru_cache

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])


# Load Gemma 2B model
with open ('hf_token.txt') as f:
    hf_auth = f.read()

# Check if CUDA is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

try:
    tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b", token=hf_auth)
    model = AutoModelForCausalLM.from_pretrained("google/gemma-2b", token=hf_auth)
    model = model.to(device)
except Exception as e:
    app.logger.error(f"Failed to load model: {e}")
    raise

def clean_tokens(list):
    return [string.replace("▁", " ") for string in list if "bos" not in string]

def get_candidates(input_ids, num_candidates, app=None):
    if app and app.debug:
        app.logger.debug("Getting candidates...")

    # Generate predictions
    with torch.no_grad():
        logits = model(input_ids).logits

    # Get top n candidates
    top_candidates = [(tokenizer.decode(token_id), logits[0, -1, token_id].item()) for token_id in logits[0, -1].topk(num_candidates).indices.tolist() if not tokenizer.decode(token_id).isspace()]

    # Normalize confidence scores to [0, 1]
    confidences = [confidence for _, confidence in top_candidates]
    max_confidence = max(confidences)
    min_confidence = min(confidences)
    top_candidates = [(token, (confidence - min_confidence) / (max_confidence - min_confidence) * 100) for token, confidence in top_candidates]

    # Create JSON output
    output_dict = {token: confidence for token, confidence in top_candidates}

    return output_dict

@lru_cache(maxsize=1000)
def tokenize(input_string, app=None):
    logging.debug("Tokenizing...")

    # Load Gemma 2B model
    tokenized = tokenizer(input_string, return_tensors="pt")

    # Move tokenized.input_ids to the device
    tokenized.input_ids = tokenized.input_ids.to(device)

    return tokenized.input_ids, clean_tokens(tokenized.tokens())

# helper function
def get_predictions(tokens_list, context_title, app=None):
    token_confidence_list = []

    for i, token in enumerate(tokens_list):
        context = context_title + "\n" + " ".join(tokens_list[:i])
        context_ids, _ = tokenize(context, app=app)
        candidate_predictions = get_candidates(context_ids, 1000 , app=app)  # Get predictions
        # Create a new entry
        token_confidence_list.append([token, candidate_predictions])

    return token_confidence_list

# MAIN FUNCTION
def get_corrections(string, context_title, app=None):
    corrected_output = []
    input_ids, tokens_list = tokenize(string, app=app)
    predictions = get_predictions(tokens_list, context_title=context_title, app=app)

    #print(predictions)

    for i in range(len(predictions)):
        this_predictions = predictions[i][1]
        this_word = predictions[i][0]
        #get statistics
        this_predictions_keys = list(this_predictions.keys())
        word_one = this_predictions_keys[0]
        word_two = this_predictions_keys[1]
        word_three = this_predictions_keys[2]
        #print(this_predictions)
        if this_word in this_predictions:
            this_word_quality = this_predictions[this_word]
            corrected_output.append([this_word, this_word_quality, word_one, word_two, word_three])
        else:
            corrected_output.append([this_word, 0, word_one, word_two, word_three])

    return corrected_output

@app.route('/correct', methods=['POST'])
def process_request():
    body = request.data.decode().replace("'", '')
    data = json.loads(body)
    string = data['string']
    context_title = data['context_title']
    app.logger.debug(f"Processing request for string: {string}")
    corrections = get_corrections(string, context_title, app=app)
    return ({"data": corrections})

if __name__ == '__main__':
    app.run(debug=True)

