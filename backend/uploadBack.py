#!/bin/bash
import os
os.system("ls -la")
file = open("imagen.txt", "r")
image = file.read()
print (image)
image2 =image.rstrip()
os.system("sudo docker tag %s pitufosgraduates/%s" %(image2, image2))
#print("docker tag %s pitufosgraduates/%s" %(image2, image2))
os.system("sudo docker push pitufosgraduates/%s" %image2)

