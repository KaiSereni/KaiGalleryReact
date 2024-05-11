import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load Gemma 2B model
with open ('hf_token.txt') as f:
    hf_token = f.read()

device = torch.device("cuda")
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b", token=hf_token)
model = AutoModelForCausalLM.from_pretrained("google/gemma-2b", token=hf_token)

model = model.to(device)

def clean_tokens(list):
    return [string.replace("▁", " ") for string in list if "bos" not in string]

def get_candidates(input_ids, num_candidates):
    # Move input_ids to device
    input_ids = input_ids.to(device)

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

def tokenize(input_string):
    # Load Gemma 2B model
    tokenized = tokenizer(input_string, return_tensors="pt")

    # Move tokenized.input_ids to the device
    tokenized.input_ids = tokenized.input_ids.to(device)

    return tokenized.input_ids, clean_tokens(tokenized.tokens())