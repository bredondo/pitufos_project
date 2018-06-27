from pymongo import MongoClient
from flask import Flask, request, jsonify, send_from_directory, make_response, current_app

app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.cfg')

client = MongoClient(app.config['NAME_BD'], app.config['PORT_BD'])
db = client.pitufos

recommendation = db.recommendation
users = db.users
projects = db.projects

projectsData = [
    {
        'name': 'Ether',
        'description': 'Plataforma de unificación central del banco.',
        'location': 'Vaguada',
        'workday': 'Jornada completa',
        'technologies': ['Maven', 'Spring', 'Hibernate', 'JUnit'],
        'schedule': 'Por la mañana',
        'telecommuting': '0 dias'
    },
    {
        'name': 'Día',
        'description': 'Web online de productos.',
        'location': 'Vaguada',
        'workday': 'Jornada completa',
        'technologies': ['Maven', 'Spring', 'Hibernate', 'JUnit'],
        'schedule': 'Por la tarde',
        'telecommuting': '0 dias'
    },
    {
        'name': 'PCI',
        'description': 'Codificación tarjetas de cŕedito',
        'location': 'Las Tablas',
        'workday': 'Jornada Parcial',
        'technologies': ['Flask', 'NodeJS', 'ReactJS'],
        'schedule': 'Por la tarde',
        'telecommuting': '2 dias'
    },
    {
        'name': 'GDPR',
        'description': 'Adaptarse a las nuevas políticas',
        'location': 'Vaguada',
        'workday': 'Jornada completa',
        'technologies': ['Maven', 'Spring', 'Hibernate'],
        'schedule': 'Por la mañana',
        'telecommuting': '0 dias'
    },
{
        'name': 'Repsol',
        'description': 'App móvil de Repsol',
        'location': 'Vaguada',
        'workday': 'Jornada completa',
        'technologies': ['Maven', 'Spring', 'Hibernate', 'JUnit'],
        'schedule': 'Por la mañana',
        'telecommuting': '1 dias'
    },
    {
        'name': 'newSiem',
        'description': 'Desarrollo de QRadar',
        'location': 'Av. de Burgos',
        'workday': 'Jornada Parcial',
        'technologies': ['Cassandra', 'MongoDB', 'Docker', 'Polymer'],
        'schedule': 'Indiferente',
        'telecommuting': '1 dias'
    },
    {
        'name': 'No se ha encontrado ningún proyecto coincidente.',
        'description': '',
        'location': '',
        'workday': '',
        'technologies': [],
        'schedule': '',
        'telecommuting': ''
    }
]


recommendationsData = [
    {   
        'order': 1,
        'question': '¿En qué tecnologías estás interesado?',
        'answers': ['Java', 'Python', 'JavaScript', 'SQL', 'NoSQL', 'DevOps'],
        'technology': 'all',
        'type': 'varias'
    },
    {
        'order': 2,
        'technology': 'Java',
        'question': '¿Cuánto sabes de Maven?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 3,
        'technology': 'Java',
        'question': '¿Cuánto sabes de Spring?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 4,
        'technology': 'Java',
        'question': '¿Cuánto sabes de Hibernate?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 5,
        'technology': 'Java',
        'question': '¿Cuánto sabes de JUnit?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 6,
        'technology': 'Python',
        'question': '¿Cuánto sabes de Flask?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 7,
        'technology': 'Python',
        'question': '¿Cuánto sabes de Django?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 8,
        'technology': 'JavaScript',
        'question': '¿Cuánto sabes de NodeJS?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 9,
        'technology': 'JavaScript',
        'question': '¿Cuánto sabes de ReactJS?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 10,
        'technology': 'JavaScript',
        'question': '¿Cuánto sabes de Polymer?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 11,
        'technology': 'JavaScript',
        'question': '¿Cuánto sabes de Ember?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 12,
        'technology': 'JavaScript',
        'question': '¿Cuánto sabes de VueJS?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 13,
        'technology': 'JavaScript',
        'question': '¿Cuánto sabes de Angular?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 14,
        'technology': 'SQL',
        'question': '¿Cuánto sabes de MySQL?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 15,
        'technology': 'SQL',
        'question': '¿Cuánto sabes de MariaDB?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 16,
        'technology': 'SQL',
        'question': '¿Cuánto sabes de Oracle?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 17,
        'technology': 'NoSQL',
        'question': '¿Cuánto sabes de MongoDB?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 18,
        'technology': 'NoSQL',
        'question': '¿Cuánto sabes de Cassandra?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 19,
        'technology': 'DevOps',
        'question': '¿Cuánto sabes de Docker?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 20,
        'technology': 'DevOps',
        'question': '¿Cuánto sabes de Jenkins?',
        'answers': [],
        'type': 'puntuacion'
    },
    {
        'order': 21,
        'question': '¿Qué tipo de jornada quieres?',
        'technology': '',
        'answers':  ['Jornada completa','Jornada parcial'],
        'type': 'unica'
    },
    {
        'order': 22,
        'question': '¿Dónde prefieres trabajar?',
        'technology': '',
        'answers': ['Av. de Burgos', 'Vaguada', 'Las Tablas','Alonso Martínez'],
        'type': 'varias'
    },
    {
        'order': 23,
        'question': '¿Qué horario prefieres?',
        'technology': '',
        'answers': ['Por la mañana', 'Por la tarde', 'Indiferente'],
        'type': 'unica'
    },
    {
        'order': 24,
        'question': '¿Cuántos días de teletrabajo prefieres',
        'technology': '',
        'answers': ['0 dias', '1 dias', '2 dias'],
        'type': 'unica'
    },
]

usersData = [
    {
        'email': 'carlos.alonso@beeva.com', 
        'passwd': 'Carlosa7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057Alonso',
        'name': 'Carlos',
        'lastname': 'Alonso', 
        'img': 'img/contacto1.png', 
        'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        'sendEmail': False,
        'answers': [],
        'result': []
    },
    {
        'email': 'laura.martin@beeva.com', 
        'passwd': 'Lauraa7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057Martin',
        'name': 'Laura',
        'lastname': 'Martin', 
        'img': 'img/contacto2.png', 
        'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        'sendEmail': False,
        'answers': [],
        'result': []
    },
    {
        'email': 'beatriz.redondo@beeva.com', 
        'passwd': 'Beatriz7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057Redondo',
        'name': 'Beatriz',
        'lastname': 'Redondo', 
        'img': 'img/contacto3.png', 
        'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        'sendEmail': False,
        'answers': [],
        'result': []
    },
    {
        'email': 'sergio.mario@beeva.com', 
        'passwd': 'Sergio7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057Marino',
        'name': 'Sergio',
        'lastname': 'Marino', 
        'img': 'img/contacto4.png', 
        'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        'sendEmail': False,
        'answers': [],
        'result': []
    },
    {
        'email': 'eduardo.lopez@beeva.com', 
        'passwd': 'Eduardo7470858e79c282bc2f6adfd831b132672dfd1224c1e78cbf5bcd057Lopez',
        'name': 'Eduardo',
        'lastname': 'Lopez',
        'img': 'img/contacto5.png', 
        'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        'sendEmail': False,
        'answers': [],
        'result': []
    }
]

for item in recommendationsData:
    recommendation.insert(item)

for item in usersData:
    users.insert(item)

for item in projectsData:
    projects.insert(item)

client.close()
