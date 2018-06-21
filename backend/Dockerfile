FROM python:3.5.2

RUN apt-get update
RUN apt-get install git

RUN git clone --recursive -b sistemas https://github.com/bredondo/pitufos_project.git
RUN pip install -r /pitufos_project/Requirements.txt

EXPOSE 8000

WORKDIR /pitufos_project/backend

ENTRYPOINT python3 insert.py
ENTRYPOINT python3 main.py


