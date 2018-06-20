from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g
import json
import hashlib
from pymongo import MongoClient
app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.cfg')
client = MongoClient(app.config['NAME_BD'], app.config['PORT_BD'])
db = client.pitufos


def first_question():
    recommendation = db.recommendation

    question = recommendation.find_one({'order': 1})

    return {'question': question['question'], 'answers': question['answers'], 'type': question['type'],
                   'order': question['order']}

def get_questions():
    recommendation = db.recommendation
    output = []

    for item in recommendation.find():
        if (item is not None):
            output.append({'question': item['question'], 'answers': item['answers'], 'technology': item['technology'],
                           'type': item['type'], 'order': item['order']})

    return output

def get_next_questions():
    recommendation = db.recommendation
    technologies = json.loads(request.data.decode('utf-8'))['technologies']
    output = []
    for technology in technologies:
        for question in recommendation.find({"technology": technology}):
            output.append({'question': question['question'], 'answers': question['answers'], 'type': question['type'],
                           'order': question['order']})
    for question in recommendation.find({"technology": ""}):
        output.append({'question': question['question'], 'answers': question['answers'], 'type': question['type'],
                       'order': question['order']})
    return output

def post_question():
    recommendation = db.recommendation
    req = json.loads(request.data.decode('utf-8'))
    question = req['question']
    answers = req['answers']
    type = req['type']
    order = req['order']
    output = []

    question_id = recommendation.insert({'question': question, 'answers': answers, 'type': type, 'order': order})
    question = recommendation.find_one({'_id': question_id})

    if (question is not None):
        output.append({'question': question['question'], 'answers': question['answers'], 'type': question['type'],
                       'order': question['order']})
    return output

def delete_questions():
    recommendation = db.recommendation
    recommendation.remove()
    output = []
    for item in recommendation.find():
        if (item is not None):
            output.append({'question': item['question'], 'answers': item['answers'], 'type': item['type'],
                           'order': item['order']})
    return output

def get_hash():
    pre_pass = request.args.get('pass')
    output = []

    pre_pass2 = hashlib.sha224(pre_pass.encode()).hexdigest()
    name = request.args.get('name')
    lastname = request.args.get('lastname')
    passwd = name + pre_pass2 + lastname
    return passwd

