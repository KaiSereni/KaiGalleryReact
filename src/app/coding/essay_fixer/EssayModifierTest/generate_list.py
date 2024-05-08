from torch import tensor
from gemma_logic import get_candidates, tokenize
import json

def get_predictions(token_ids, tokens_list):
    token_confidence_list = {}

    for i, token in enumerate(tokens_list):
        context = " ".join(tokens_list[:i])
        print(context)  # Print context for debugging
        candidate_predictions = get_candidates(token_ids, 100)  # Get predictions
        if token in token_confidence_list:
            # Append predictions to existing list
            if isinstance(token_confidence_list[token], list):
                token_confidence_list[token].extend(candidate_predictions)
            else:
                token_confidence_list[token] = candidate_predictions
        else:
            # Create a new entry
            token_confidence_list[token] = candidate_predictions

    return token_confidence_list

def get_corrections(string):
    corrected_output = {}
    input_ids, tokens_list = tokenize(string)
    predictions = get_predictions(input_ids, tokens_list)

    for word, word_predictions in predictions.items():
        if word in json.loads(word_predictions):
            corrected_output[word] = [json.loads(word_predictions)[word]]
        else:
            corrected_output[word] = [0]

    return corrected_output

# Example usage:
corrections = get_corrections("The sun is the hottest body in the world")
print(corrections)