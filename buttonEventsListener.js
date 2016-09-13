
var gpio = require('pi-gpio')

var GPIO = gpio.GPIO;

module.exports = {
  listenButtonEvents: function (pinNumber,buttonIdentifier) {
    while(true){
       gpio.read(pinNumber, function(err, value) {
            read(pinNumber,err, value)
       });
    }
  }
};


dispatchEvent = function(buttonValue){
        console.log('dispatch event')
}

read = function(pinNumber,err, value){
    if(err) throw err;
    console.log(value + ':' + buttonIdentifier);	// The current state of the pin
    setTimeout(dispatchEvent(value,buttonIdentifier), 200)
}