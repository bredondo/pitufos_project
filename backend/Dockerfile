FROM python:3.5.2

RUN apt-get update
RUN apt-get install git

RUN git clone --recursive -b sys_def https://github.com/bredondo/pitufos_project.git
RUN pip install -r pitufos_project/backend/requirements.txt

EXPOSE 8000

WORKDIR /pitufos_project/backend

ENTRYPOINT python main.py
ENTRYPOINT python insert.py

