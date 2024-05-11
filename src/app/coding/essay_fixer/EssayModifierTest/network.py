from generate_list import get_corrections
from flask import Flask, request
import json
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

@app.route('/correct', methods=['POST'])
def process_request():
    body = request.data.decode().replace("'", '')
    data = json.loads(body)
    string = data['string']
    context_title = data['context_title']
    corrections = get_corrections(string, context_title)
    return ({"data": corrections})

if __name__ == '__main__':
    app.run()
