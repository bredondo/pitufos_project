#!/bin/bash
import os
os.chdir("/home/eduardolopez/Escritorio/Proyecto_pitufos/Proyecto_pitufos/front")
os.system("pwd")
os.system("docker build --no-cache -t front:dockerfile .")
os.system("sudo docker login -u pitufosgraduates -p pitufos")
os.system('sudo docker images -q | grep -m 1 "" > imagen.txt')
os.system('imagen=$(<imagen.txt)')
os.system("echo $imagen")

file = open("/home/eduardolopez/Escritorio/Proyecto_pitufos/Proyecto_pitufos/front/imagen.txt", "r")

image = file.read()
print (image)

image2 =image.rstrip()

#docker_tag = "docker tag ", image2 , "pitufosgraduates/", image2

#print (docker_tag)
os.system("sudo docker tag %s pitufosgraduates/%s" %(image2, image2))
#print("docker tag %s pitufosgraduates/%s" %(image2, image2))
os.system("sudo docker push pitufosgraduates/%s" %image2)

#os.system('image2=$(sudo docker images -q | grep -m 1 "")')
#os.system("echo $image2")
#os.system('sudo docker tag "%a" ')
