import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, AutoModel
import transformers
import os
import kagglehub

# Load Gemma 2B model
with open ('hf_token.txt') as f:
    hf_token = f.read()

tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b", token=hf_token)
model = AutoModelForCausalLM.from_pretrained("google/gemma-2b", token=hf_token)

def clean_tokens(list):
    new_list = []
    for string in list:
        if "bos" in string:
            continue
        new_list.append(string.replace("▁", " "))
    return new_list

def get_candidates(input_ids, num_candidates):

    # Generate predictions
    with torch.no_grad():
        logits = model(input_ids).logits

    # Get top n candidates
    top_candidates = []
    for token_id in logits[0, -1].topk(num_candidates).indices.tolist():
        token = tokenizer.decode(token_id)
        confidence = logits[0, -1, token_id].item()
        if not token.isspace():
            top_candidates.append((token, confidence))

    # Normalize confidence scores to [0, 1]
    max_confidence = max(confidence for _, confidence in top_candidates)
    min_confidence = min(confidence for _, confidence in top_candidates)
    for i, (token, confidence) in enumerate(top_candidates):
        normalized_confidence = (confidence - min_confidence) / (max_confidence - min_confidence) * 100
        top_candidates[i] = (token, normalized_confidence)

    # Create JSON output
    output_dict = {token: confidence for token, confidence in top_candidates}

    return output_dict

def tokenize(input_string):
    # Load Gemma 2B model
    return tokenizer(input_string, return_tensors="pt").input_ids, clean_tokens(tokenizer(input_string, return_tensors="pt").tokens())
