from flask import Flask, jsonify, request, g
import hashlib
import jwt


from pymongo import MongoClient
app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.cfg')
client = MongoClient(app.config['NAME_BD'], app.config['PORT_BD'])
db = client.pitufos
import json

def empty_database():
    projects = db.projects
    projects.remove()
    users = db.users
    users.remove()
    recommendation = db.recommendation
    recommendation.remove()
    output = []
    return jsonify({'result': output})



