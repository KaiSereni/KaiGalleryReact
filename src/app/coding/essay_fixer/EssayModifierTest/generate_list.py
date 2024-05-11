from torch import tensor
from gemma_logic import get_candidates, tokenize
import json

# helper function
def get_predictions(tokens_list, context_title):
    token_confidence_list = []

    for i, token in enumerate(tokens_list):
        context = context_title + "\n" + " ".join(tokens_list[:i])
        context_ids, _ = tokenize(context)
        candidate_predictions = get_candidates(context_ids, 100)  # Get predictions
        # Create a new entry
        token_confidence_list.append([token, candidate_predictions])

    return token_confidence_list

# MAIN FUNCTION
def get_corrections(string, context_title):
    corrected_output = []
    input_ids, tokens_list = tokenize(string)
    predictions = get_predictions(tokens_list, context_title=context_title)

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

# Example usage:
if __name__ == "__main__":
    corrections = get_corrections("The sun is the hottest object in the universe", "What is the hottest object?")
    print(corrections)