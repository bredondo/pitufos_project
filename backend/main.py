from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g
from pymongo import MongoClient
import hashlib
from functools import update_wrapper
from datetime import timedelta
import urllib.request, json
import jwt
import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as JWT
from flask_httpauth import HTTPTokenAuth

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'hola'
jwt = JWT(app.config['SECRET_KEY'], expires_in=3600)
auth = HTTPTokenAuth('Bearer')

client = MongoClient('localhost', 27017)
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
    recommendation = db.recommendation
    output = []

    for item in recommendation.find():
        output.append({'question': item['question'], 'answers': item['answers'], 'technology':item['technology'], 'type': item['type'], 'order': item['order']})


    return jsonify({'result': output})

@app.route('/recommendationStart', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_first_question():
    recommendation = db.recommendation
    output = []

    question = recommendation.find_one({'order': 1})

    output.append({'question': question['question'], 'answers': question['answers'], 'type': question['type'],
                   'order': question['order']})
    return jsonify({'result': output})


@app.route('/recommendationKeepsGoing', methods=['POST'])
@crossdomain(origin='*')
@auth.login_required
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

    return jsonify({'result': output})

@app.route('/recommendation', methods=['POST'])
@auth.login_required
def save_questions():
    recommendation = db.recommendation
    req = json.loads(request.data.decode('utf-8'))
    question = req['question']
    answers = req['answers']
    type = req['type']
    order = req['order']
    output = []

    question_id = recommendation.insert({'question': question, 'answers': answers, 'type': type , 'order': order})
    question = recommendation.find_one({'_id': question_id})

    output.append({'question': question['question'], 'answers': question['answers'], 'type': question['type'], 'order': question['order']})
    return jsonify({'result': output})


@app.route('/recommendation', methods=['DELETE'])
@auth.login_required
def delete_questions():
    recommendation = db.recommendation
    recommendation.remove()
    output = []
    for item in recommendation.find():
        output.append({'question': item['question'], 'answers': item['answers'], 'type': item['type'], 'order' : item['order']})

    return jsonify({'result': output})



@app.route('/getHash', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_hash():

    pre_pass = request.args.get('pass')
    output = []

    pre_pass2 = hashlib.sha224(pre_pass.encode()).hexdigest()
    name = request.args.get('name')
    lastname = request.args.get('lastname')
    passwd = name + pre_pass2 + lastname

    return passwd




"""Users """
@app.route('/users', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_users():
    users = db.users
    output = []
    for user in users.find():
        output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail']})

    return jsonify({'result': output})

@app.route('/user/<email>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
@auth.login_required
def get_user_email(email):
    users = db.users
    output = []
    user = users.find_one({'email': email})
    if (user is not None):
        output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail'], 'answers': user['answers'], 'result': user['result']})

    return jsonify({'result': output})

@app.route('/users', methods=['POST'])
@auth.login_required
def save_users():
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

    output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail']})
    return jsonify({'result': user})


@app.route('/users', methods=['DELETE'])
@auth.login_required
def delete_users():
    users = db.users
    users.remove()
    output = []
    for user in users.find():
        output.append({'email': user['email'], 'passwd': user['passwd'], 'name': user['name'],
                       'lastname': user['lastname'], 'img': user['img'], 'description': user['description'],
                       'sendEmail': user['sendEmail']})

    return jsonify({'result': output})

"""Projects"""

@app.route('/projects', methods=['GET', 'OPTIONS'])
@auth.login_required
@crossdomain(origin='*')
def get_projects():
    projects = db.projects
    output = []
    for project in projects.find():
        output.append({'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    return jsonify({'result': output})


@app.route('/projects', methods=['POST'])
@auth.login_required
def save_projects():
    projects = db.projects
    output = []
    req = json.loads(request.data.decode('utf-8'))
    technologies = req['technologies']
    workday = req['workday']
    schedule = req['schedule']
    location = req['location']
    telecommuting = req['telecommuting']

    project_id = projects.insert({'technologies': technologies, 'telecommuting': telecommuting,'workday': workday, 'schedule': schedule,
                            'location': location})

    project = projects.find_one({'_id': project_id})

    output.append({'technologies': project['technologies'], 'workday': project['workday'], 'schedule': project['schedule'],
                   'location': project['location']})
    return jsonify({'result': output})

@app.route('/projects', methods=['DELETE'])
@auth.login_required
def delete_projects():
    projects = db.projects
    projects.remove()
    output = []
    for item in projects.find():
        output.append({'name': item['name'], 'description': item['description'], 'location': item['location'], 'workday' : item['workday'],
                       'technologies': item['technologies'], 'telecommuting': item['telecommuting'], 'schedule': item['schedule']})

    return jsonify({'result': output})

@app.route('/projectRecommendation', methods=['POST'])
@crossdomain(origin='*')
@auth.login_required
def recommend_projects():

    projects = db.projects
    users = db.users

    req = json.loads(request.data.decode('utf-8'))
    user = req['result']['user']
    technologies = req['result']['answers']
    answersAux = req['result']['answers']

    user = users.find_one({"email": user['email']})
        
    questions = [] #se guardarán las preguntas enviadas por el usuario
    answers = [] #se guardarán las respuestas enviadas por el usuario
    output = []

    for tec in technologies:#se guardan todas las preguntas
        questions.append(tec['question'])

    for ans in answersAux:#se guardan todas las respuestas de las preguntas
            answers.append(ans['answers'])
    #print('respuestas obtenidas' + answers2.__str__())

    projectsTechnologies = []
    projectPercentageTechnology = 0
    projectPercentage = 0

    for project in projects.find():
        projectsTechnologies.extend(project['technologies']) #guardamos todas las tecnologias de cada projecto
        projectLocation =  project['location']
        projectWorkday = project['workday']
        projectSchedule = project['schedule']
        projectTelecommuting = project['telecommuting']
        projectPercentageTechnology = 1 / (len(projectsTechnologies) + 4) #se calcula el porcentaje de cada tecnología y cada tipo de jornada, horario, teletrabajo y localización.
        #print(projectsTechnologies)
        for question in questions: #se busca cada tecnología en cada pregunta
            for pT in projectsTechnologies:
                if pT in question:
                    projectPercentage += projectPercentageTechnology
        for answ in answers:
            if projectLocation in answ or projectWorkday in answ or projectSchedule in answ or projectTelecommuting in answ:
                projectPercentage += projectPercentageTechnology
        if (projectPercentage >= 0.7): #si el proyecto matchea al menos un 70% se añade a la lista de proyectos válidos
            del project['_id']
            project['porcentaje'] = projectPercentage
            output.append(project)
        projectPercentageTechnology = 0
        projectPercentage = 0
        projectsTechnologies.clear()

    output = sorted(output, key=lambda k: k['porcentaje'], reverse=True)#ordenar los proyectos
    for item in output: #quitar el atributo auxiliar porcentaje
        del item['porcentaje']

    length = len(output)
    if (length>3):
        for i in range(3, length):
            del output[i]
    
    users.update_one({ '_id': user['_id']},  {'$set': {'answers': req['result']['answers'],'result': output }})

    user['answers'] = req['result']['answers']
    user['result'] = output

    del user['_id']

    return  jsonify({'result': user})
    #return jsonify({'result': output})

@app.route('/emptyDatabase', methods=['DELETE'])
@auth.login_required
def delete_all():
    projects = db.projects
    projects.remove()
    users = db.users
    users.remove()
    recommendation = db.recommendation
    recommendation.remove()
    output = []

    return jsonify({'result': output})


@app.route('/projectSearcher/', methods=['GET'])
@auth.login_required
def project_searcher():
    query = request.args.get('search')
    page = request.args.get('page')
    pre_query = '.*' + '(?i)' + query + '.*'

    projects = db.projects
    output = []



    for project in projects.find({'location': {'$regex' : pre_query}}):
        output.append({'name': project['name'],'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    for project in projects.find({'name': {'$regex' : pre_query}}):
        output.append({'name': project['name'],'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    for project in projects.find({'schedule': {'$regex' : pre_query}}):
        output.append({'name': project['name'],'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    for project in projects.find({'telecommuting': {'$regex' : pre_query}}):
        output.append({'name': project['name'],'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    for project in projects.find({'workday': {'$regex' : pre_query}}):
        output.append({'name': project['name'],'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    for project in projects.find({'technologies': {'$regex' : pre_query}}):
        output.append({'name': project['name'],'technologies': project['technologies'], 'telecommuting': project['telecommuting'], 'workday': project['workday'], 'schedule': project['schedule'],
                       'location': project['location']})

    length = len(output)

    output2 = []
    for i in range(int(page)*2, (int(page)*2+2)): #se devuelven 2 elementos por página
        output2.append(output[i])

    if ((int(page)*2+2)<length):
        return jsonify({'result': output2, 'hasMoreResult': True, 'itemsPerPage': 2, 'totalItems': length})

    return jsonify({'result': output2, 'hasMoreResult': False, 'itemsPerPage': 2, 'totalItems': length})





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='8000')
