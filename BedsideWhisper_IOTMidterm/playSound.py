
import os
import sys

file = open('/home/pi/Desktop/node-parse-backup3/count.txt', 'r')

val= file.readline()
# os.system('arecord -f cd -t raw | lame -x -out.' +str(val)+ 'mp3')
# os.system('aplay '+ 's' + str(val)+'.wav')

os.system('aplay ' + str(val)+'.wav')

# os.system('aplay s5.wav')
