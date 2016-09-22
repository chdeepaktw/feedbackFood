import RPi.GPIO as GPIO
import time
import requests

GPIO.setmode(GPIO.BCM)

GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(2, GPIO.OUT)

GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(26, GPIO.OUT)

GPIO.output(2, GPIO.LOW)
GPIO.output(26, GPIO.LOW)
blink_time =0.8

while True:
    input_state = GPIO.input(18)
    if input_state == False:
		resp = requests.get('http://localhost:8000/submitAnswer/?optionId=0')
		print('Button Pressed 0. Lighting LED')
		GPIO.output(2, GPIO.HIGH)
		time.sleep(blink_time)
		print "LED off"
		GPIO.output(2,GPIO.LOW)
    input_state_2 = GPIO.input(12)
    if input_state_2 == False:
		resp_2 = requests.get('http://localhost:8000/submitAnswer/?optionId=1')
		print('Button Pressed 1')
		GPIO.output(26, GPIO.HIGH)
		time.sleep(blink_time)
        GPIO.output(26, GPIO.LOW)