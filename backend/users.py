from pymongo import MongoClient
from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g
app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.cfg')
client = MongoClient(app.config['NAME_BD'], app.config['PORT_BD'])
import json
import hashlib
db = client.pitufos

def get_users():
    users = db.users
    output = []
    for user in users.find():
        if (user is not None):
            output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                           'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                           'sendEmail': user['sendEmail']})
    if (len(output)==0):
        output = "Error, usuarios no encontrados."
    return output

def get_user_by_email(email):
    users = db.users
    output = []
    user = users.find_one({'email': email})
    if (user is not None):
        output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail'], 'answers': user['answers'], 'result': user['result']})
    if (len(output)==0):
        output = "Error, usuario no encontrado."
    return output

def post_user():
    users = db.users
    output = []
    req = json.loads(request.data.decode('utf-8'))
    email = req['email']
    pre_pass = req['passwd']
    pre_pass2 = hashlib.sha224(pre_pass.encode()).hexdigest()
    name = req['name']
    lastname = req['lastname']
    passwd = name + pre_pass2 + lastname
    img = req['img']
    description = req['description']
    sendEmail = req['sendEmail']

    user_id = users.insert({'email': email, 'passwd': passwd, 'name': name,
                            'lastname': lastname, 'img': img, 'description': description,
                            'sendEmail': sendEmail})
    user = users.find_one({'_id': user_id})

    if (user is not None):
        output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail']})
    if (len(output)==0):
        output = "Error, usuario no encontrado."

    return output

def delete_users():
    users = db.users
    users.remove()
    output = []
    for user in users.find():
        if (user is not None):
            output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                           'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                           'sendEmail': user['sendEmail']})
    return output

def update_user():
    users = db.users
    output = []
    req = json.loads(request.data.decode('utf-8'))


    try:
        email = req['email']
        description = req['description']
    except KeyError:
        pass



    users.update_one({'email': email}, {'$set': {'description': description}})


    user = users.find_one({'email': email})

    if (user is not None):
        output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail']})
    if (len(output) == 0):
        output = "Error, usuario no encontrado."

    return output