FROM node:8.11

RUN apt-get update
RUN apt-get -y install npm

RUN git clone --recursive -b sistemas https://github.com/bredondo/pitufos_project.git

#WORKDIR /pitufos_project/frontend

RUN npm install 

EXPOSE 3001

CMD npm start -p 3001
