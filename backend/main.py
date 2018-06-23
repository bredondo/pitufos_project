from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g
from pymongo import MongoClient
import hashlib
from functools import update_wrapper
from datetime import timedelta
import urllib.request, json
import jwt
from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth
from flask_cors import CORS, cross_origin

import recommendation
import users
import projects
import action

app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.cfg')

jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)
auth = HTTPTokenAuth('Bearer')

client = MongoClient(app.config['NAME_BD'], app.config['PORT_BD'])
db = client.pitufos

cors = CORS(app, origins="*", allow_headers=[
        "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
        supports_credentials=True)

@app.route('/login', methods=['POST', 'OPTIONS'])
def get_token():
    users = db.users
    req_json = json.loads(request.data.decode('utf-8'))
    email = req_json['email']
    user = users.find_one({'email': email})
    del user['_id']
    g.user = user
    pre_pass = req_json['pass']
    pre_pass2 = hashlib.sha224(pre_pass.encode()).hexdigest()
    name = user['name']
    lastname = user['lastname']
    passwd = name + pre_pass2 + lastname

    if passwd == user['passwd']:
        print('login correcto')

        token = jwt.dumps({'username': user['name']})
        token = str(token)
        token = token.replace("b'", "")
        token = token.replace("'","")
        return jsonify({'token': token, 'user':user})

    else:
        return 'Email or user incorrect, good luck next time you try to enter into my system little bitch :)'


@auth.verify_token
def verify_token(token):
    g.user = None
    try:
        data = jwt.loads(token)
    except:  # noqa: E722
        return False
    if 'username' in data:
        g.user = data['username']
        return True
    return False

"""Recommendation """
@app.route('/recommendation', methods=['GET', 'OPTIONS'])
@auth.login_required
def get_questions():
    return jsonify({'result': recommendation.get_questions()})

@app.route('/recommendationStart', methods=['GET', 'OPTIONS'])
@auth.login_required
def get_first_question():
    return jsonify({'result': [recommendation.first_question()]})

@app.route('/recommendationKeepsGoing', methods=['POST'])
@auth.login_required
def get_next_questions():
    return jsonify({'result': recommendation.get_next_questions()})

@app.route('/recommendation', methods=['POST'])
@auth.login_required
def save_questions():
    return jsonify({'result': recommendation.post_question()})

@app.route('/recommendation', methods=['DELETE'])
@auth.login_required
def delete_questions():
    return jsonify({'result': recommendation.delete_questions()})

@app.route('/getHash', methods=['GET', 'OPTIONS'])
@auth.login_required
def get_hash():
    return recommendation.get_hash()

"""Users """
@app.route('/users', methods=['GET', 'OPTIONS'])
@auth.login_required
def get_users():
    return jsonify({'result': users.get_users()})

@app.route('/user/<email>', methods=['GET', 'OPTIONS'])
@auth.login_required
def get_user_email(email):

    return jsonify({'result': users.get_user_by_email(email)})

@app.route('/users', methods=['POST'])
@auth.login_required
def save_users():
    return jsonify({'result': users.post_user()})

@app.route('/users', methods=['DELETE'])
@auth.login_required
def delete_users():
    return jsonify({'result': users.delete_users()})

@app.route('/user', methods=['PUT'])
@auth.login_required
def update_user():
    return jsonify({'result': users.update_user()})

"""Projects"""
@app.route('/projects', methods=['GET', 'OPTIONS'])
@auth.login_required
def get_projects():
    return jsonify({'result': projects.get_projects()})

@app.route('/projects', methods=['POST'])
@auth.login_required
def save_projects():
    return jsonify({'result': projects.post_project()})

@app.route('/projects', methods=['DELETE'])
@auth.login_required
def delete_projects():
    return jsonify({'result': projects.delete_projects()})

@app.route('/projectRecommendation', methods=['POST'])
@auth.login_required
def recommend_projects():
    return projects.recommend_project()

@app.route('/emptyDatabase', methods=['DELETE'])
@auth.login_required
def delete_all():
    return action.empty_database()

@app.route('/projectSearcher/', methods=['GET'])
@auth.login_required
def project_searcher():
    return projects.search_project()

if __name__ == '__main__':
    app.run(debug=True, host=app.config['HOST'], port=app.config['PORT_FLASK'])
