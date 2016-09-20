
var gpio = require('pi-gpio')

var GPIO = gpio.GPIO;

module.exports = {
  listenButtonEvents: function (pinNumber,buttonIdentifier) {
    while(true){
       gpio.read(pinNumber, function(err, value) {
            if(err) {
                console.error('ERROR:'+ err);
            }else{
                // handle event asynchronously
                setTimeout(handleButtonEvent(buttonIdentifier,value),0)
            }
       });

       console.log('pause listening')
       setTimeout(onResume, 200)
    }
  },

  handleButtonEvent : function(buttonIdentifier,value){
      console.log(value + ':' + buttonIdentifier);	// The current state of the pin
      // notify UI using web socket
  },

  onResume : function(){
      console.log('resume listening')
  }
};

setInterval(function() {
    module.exports.listenButtonEvents();
}, 5000);