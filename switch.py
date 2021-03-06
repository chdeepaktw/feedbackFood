import RPi.GPIO as GPIO
import time
import requests

GPIO.setmode(GPIO.BCM)

GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(2, GPIO.OUT)

GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(26, GPIO.OUT)

GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(25, GPIO.OUT)

GPIO.output(2, GPIO.LOW)
GPIO.output(26, GPIO.LOW)
GPIO.output(25, GPIO.LOW)

blink_time =0.4

while True:
    input_state = GPIO.input(18)
    if input_state == False:
		resp = requests.get('http://localhost:8000/submitAnswer/?optionId=0')
		print('Button Pressed 0. Lighting LED')
		# GPIO.output(2, 5)
		time.sleep(blink_time)
		# print "LED off 0"
		# GPIO.output(2,GPIO.LOW)
    input_state_2 = GPIO.input(12)
    if input_state_2 == False:
		resp_2 = requests.get('http://localhost:8000/submitAnswer/?optionId=1')
		print('Button Pressed 1. Lighting LED')
		# GPIO.output(26, GPIO.HIGH)
		time.sleep(blink_time)
		# print "LED off 1"
		# GPIO.output(26, GPIO.LOW)
    input_state_3 = GPIO.input(24)
    if input_state_3 == False:
		resp_3 = requests.get('http://localhost:8000/startGame')
		print('Button Pressed 2. Lighting LED')
		# GPIO.output(25, 5)
		time.sleep(blink_time)
		# print "LED off 2"
		# GPIO.output(25, GPIO.LOW)
