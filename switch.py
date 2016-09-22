import RPi.GPIO as GPIO
import time
import requests

GPIO.setmode(GPIO.BCM)

GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.setup(3, GPIO.OUT)

GPIO.setup(17, GPIO.OUT)


while True:
    input_state = GPIO.input(18)
    if input_state == False:
		resp = requests.get('http://localhost:8000/submitAnswer/?optionId=0')
		print('Button Pressed 0. Lighting LED')
		GPIO.output(3, 3)
		time.sleep(1)
		print "LED off"
		GPIO.output(3,GPIO.LOW)
    input_state_2 = GPIO.input(12)
    if input_state_2 == False:
		resp_2 = requests.get('http://localhost:8000/submitAnswer/?optionId=1')
		print('Button Pressed 1')
		GPIO.output(17, 3)
		time.sleep(1)
