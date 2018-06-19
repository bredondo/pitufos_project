from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g


from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.pitufos

def first_question():
    recommendation = db.recommendation

    question = recommendation.find_one({'order': 1})

    return {'question': question['question'], 'answers': question['answers'], 'type': question['type'],
                   'order': question['order']}


