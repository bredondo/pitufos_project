from pymongo import MongoClient, TEXT
from flask import Flask, request, jsonify, send_from_directory, make_response, current_app, g
app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.cfg')
client = MongoClient(app.config['NAME_BD'], app.config['PORT_BD'])
db = client.pitufos
import json



def get_projects():
    projects = db.projects
    output = []
    for project in projects.find():
        if (project is not None):
            output.append({'technologies': project['technologies'], 'telecommuting': project['telecommuting'],
                           'workday': project['workday'], 'schedule': project['schedule'],
                           'location': project['location']})
    if (len(output)==0):
        output = "Error, proyectos no encontrados."
    return output

def post_project():
    projects = db.projects
    output = []
    req = json.loads(request.data.decode('utf-8'))
    technologies = req['technologies']
    workday = req['workday']
    schedule = req['schedule']
    location = req['location']
    telecommuting = req['telecommuting']

    project_id = projects.insert(
        {'technologies': technologies, 'telecommuting': telecommuting, 'workday': workday, 'schedule': schedule,
         'location': location})

    project = projects.find_one({'_id': project_id})

    if (project is not None):
        output.append(
            {'technologies': project['technologies'], 'workday': project['workday'], 'schedule': project['schedule'],
             'location': project['location']})
    if (len(output)==0):
        output = "Error, proyecto no encontrado."
    return output

def delete_projects():
    projects = db.projects
    projects.remove()
    output = []
    for item in projects.find():
        if (item is not None):
            output.append({'name': item['name'], 'description': item['description'], 'location': item['location'],
                           'workday': item['workday'],
                           'technologies': item['technologies'], 'telecommuting': item['telecommuting'],
                           'schedule': item['schedule']})
    return output

def recommend_project():
    projects = db.projects
    users = db.users

    req = json.loads(request.data.decode('utf-8'))
    user = req['result']['user']
    technologies = req['result']['answers']
    answersAux = req['result']['answers']

    user = users.find_one({"email": user['email']})

    questions = []  # se guardarán las preguntas enviadas por el usuario
    answers = []  # se guardarán las respuestas enviadas por el usuario
    output = []

    for tec in technologies:  # se guardan todas las preguntas
        if (tec is not None):
            questions.append(tec['question'])

    for ans in answersAux:  # se guardan todas las respuestas de las preguntas
        if (ans is not None):
            answers.append(ans['answers'])
    # print('respuestas obtenidas' + answers2.__str__())

    projectsTechnologies = []
    projectPercentageTechnology = 0
    projectPercentage = 0

    for project in projects.find():
        projectsTechnologies.extend(project['technologies'])  # guardamos todas las tecnologias de cada projecto
        projectLocation = project['location']
        projectWorkday = project['workday']
        projectSchedule = project['schedule']
        projectTelecommuting = project['telecommuting']
        projectPercentageTechnology = 1 / (len(projectsTechnologies) + 4)  # se calcula el porcentaje de cada tecnología y cada tipo de jornada, horario, teletrabajo y localización.
        # print(projectsTechnologies)
        for question in questions:  # se busca cada tecnología en cada pregunta
            for pT in projectsTechnologies:
                if pT in question:
                    projectPercentage += projectPercentageTechnology
        for answ in answers:
            if projectLocation in answ or projectWorkday in answ or projectSchedule in answ or projectTelecommuting in answ:
                projectPercentage += projectPercentageTechnology
        if (projectPercentage >= 0.7):  # si el proyecto matchea al menos un 70% se añade a la lista de proyectos válidos
            del project['_id']
            project['porcentaje'] = round(projectPercentage, 2)
            output.append(project)
        projectPercentageTechnology = 0
        projectPercentage = 0
        projectsTechnologies.clear()

    output = sorted(output, key=lambda k: k['porcentaje'], reverse=True)  # ordenar los proyectos
    # for item in output: #quitar el atributo auxiliar porcentaje
    #   del item['porcentaje']

    length = len(output)
    if (length > 3):
        for i in range(3, length):
            del output[i]

    length2 = len(output)
    if (length2 < 1):
        project = projects.find_one({"name": "No se ha encontrado ningún proyecto coincidente."})
        del project['_id']
        output.append(project)

    users.update_one({'_id': user['_id']}, {'$set': {'answers': req['result']['answers'], 'result': output}})

    user['answers'] = req['result']['answers']
    user['result'] = output

    del user['_id']

    return jsonify({'result': user})

def search_project():
    query = request.args.get('search')
    page = request.args.get('page')
    pre_query = '.*' + '(?i)' + query + '.*'

    projects = db.projects
    output = []
    seen = set()
    for project in projects.find({'location': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    for project in projects.find({'name': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    for project in projects.find({'schedule': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    for project in projects.find({'telecommuting': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    for project in projects.find({'workday': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    for project in projects.find({'technologies': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen 
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    for project in projects.find({'description': {'$regex': pre_query}}):
        if (project is not None and project['name'] not in seen 
        and 'No se ha encontrado' not in  project['name']):
            output.append({'name': project['name'], 'technologies': project['technologies'],
                           'telecommuting': project['telecommuting'], 'workday': project['workday'],
                           'schedule': project['schedule'],'description': project['description'],
                           'location': project['location']})
            seen.add(project['name'])

    length = len(output)
    if (length < 1):
        project = projects.find_one({"name": "No se ha encontrado ningún proyecto coincidente."})
        del project['_id']
        output.append(project)
        length = 1
    output2 = []
    init = int(page) * 3
    fin = init + 3 if init + 3 <= length else length
    for i in range(init, fin):  # se devuelven 2 elementos por página
        output2.append(output[i])

    if ((int(page) * 3 + 3) < length):
        return jsonify({'result': output2, 'hasMoreResult': True, 'itemsPerPage': 3, 'totalItems': length})

    return jsonify({'result': output2, 'hasMoreResult': False, 'itemsPerPage': 3, 'totalItems': length})