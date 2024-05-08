import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

def clean_tokens(list):
    new_list = []
    for string in list:
        if "bos" in string:
            continue
        new_list.append(string.replace("▁", " "))
    return new_list

def get_candidates(input_ids, num_candidates):

    # Load Gemma 2B model
    model_id = "/kaggle/input/gemma/transformers/2b/2"
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(model_id, hidden_activation="gelu_pytorch_tanh")

    # Generate predictions
    with torch.no_grad():
        logits = model(input_ids).logits

    # Get top n candidates
    top_candidates = []
    for token_id in logits[0, -1].topk(num_candidates).indices.tolist():
        token = tokenizer.decode(token_id)
        confidence = logits[0, -1, token_id].item()
        top_candidates.append((token, confidence))

    # Create JSON output
    output_dict = {token: confidence for token, confidence in top_candidates}
    output_json = json.dumps(output_dict)

    return output_json

def tokenize(input_string):
    # Load Gemma 2B model
    model_id = "/kaggle/input/gemma/transformers/2b/2"
    tokenizer = AutoTokenizer.from_pretrained(model_id)

    return tokenizer(input_string, return_tensors="pt").input_ids, clean_tokens(tokenizer(input_string, return_tensors="pt").tokens())
