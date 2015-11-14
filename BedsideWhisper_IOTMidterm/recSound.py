
import os
import sys

file = open('/home/pi/Desktop/node-parse-backup3/count.txt', 'rw')

val= file.readline()
# os.system('arecord -f cd -t raw | lame -x -out.' +str(val)+ 'mp3')
os.system('arecord -f S16_LE -D hw:1,0 --duration 10 -r 48000 '+str(val)+'.wav')
os.system('lame '+str(val)+'.wav '+ str(val)+'.mp3')
os.rename("/home/pi/Desktop/node-parse-backup3/" + str(val)+ ".mp3", "/home/pi/Desktop/node-parse-backup3/public/" + str(val)+ ".mp3")

# os.system('arecord -f S16_LE -D hw:1,0 --duration 1 -r 480 00 s'+str(n)+'.wav')//Ayo's code