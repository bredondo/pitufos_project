#!/bin/bash
import os
file = open("imagen2.txt", "r")
image2 = file.read()
print (image2)
image3 =image2.rstrip()
os.system("sudo docker tag %s pitufosgraduates/%s" %(image3, image3))
#print("docker tag %s pitufosgraduates/%s" %(image3, image3)
os.system("sudo docker push pitufosgraduates/%s" %image3)
