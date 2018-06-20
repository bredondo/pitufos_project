from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g
from pymongo import MongoClient
import hashlib
from functools import update_wrapper
from datetime import timedelta
import urllib.request, json
import jwt
from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth
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




def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator




@app.route('/login', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
def get_token():
    users = db.users
    req_json = json.loads(request.data.decode('utf-8'))
    email = req_json['email']
    user = users.find_one({'email': email})
    g.user = user
    pre_pass = req_json['pass']
    pre_pass2 = hashlib.sha224(pre_pass.encode()).hexdigest()
    name = user['name']
    lastname = user['lastname']
    passwd = name + pre_pass2 + lastname

    if passwd == user['passwd']:
        print('login correcto')

        token = jwt.dumps({'username': user['name']})
        #return jsonify({'token': str(token)})
        return token

    else:
        return 'Email or user incorrect, good luck next time you try to enter into my system little bitch :)'

#@app.route('/verifyLogin', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.verify_token
def verify_token(token):
    #token = request.headers.get('Authorization')
    #print('token vale: ')
    #print(token)
    g.user = None
    try:
        data = jwt.loads(token)
    except:  # noqa: E722
        #return jsonify({'result': 'false'})
        return False
    if 'username' in data:
        g.user = data['username']
        return True
        #return jsonify({'result': 'true'})
    return False
    #return jsonify({'result': 'false'})


"""Recommendation """
@app.route('/recommendation', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_questions():
    return jsonify({'result': recommendation.get_questions()})

@app.route('/recommendationStart', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_first_question():
    return jsonify({'result': [recommendation.first_question()]})


@app.route('/recommendationKeepsGoing', methods=['POST'])
@crossdomain(origin='*')
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
@crossdomain(origin='*')
@auth.login_required
def get_hash():
    return recommendation.get_hash()




"""Users """
@app.route('/users', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_users():
    return jsonify({'result': users.get_users()})

@app.route('/user/<email>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
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




"""Projects"""
@app.route('/projects', methods=['GET', 'OPTIONS'])
@auth.login_required
@crossdomain(origin='*')
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
@crossdomain(origin='*')
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
