#!/bin/bash
file = open("/home/eduardolopez/Escritorio/Proyecto_pitufos/Proyecto_pitufos/back_flask_pymongo/imagen.txt", "r")
image = file.read()
print (image)
image2 =image.rstrip()
