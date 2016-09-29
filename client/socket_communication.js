
    // creating a new websocket
    var socket = io.connect('http://localhost:8000');
    // on every message recived we print the new datas inside the #container div
    socket.on('notification', function (data) {
        // convert the json string into a valid javascript object
        var _data = JSON.parse(data);
        console.log(_data);
        $('#question').html(_data.question);
        document.getElementById("yellowButton").style.visibility = "visible";

        $('#optionA').html(_data.options[0]);
        document.getElementById("optionBIcon").style.visibility = "visible";

        $('#optionB').html(_data.options[1]);
//        $('#score').html(_data.score);
        <!--$('time').html('Last Update:' + new Date());-->

        setLevel(_data.score);
        countdown();

    });

 socket.on('gyan', function (data) {
        var _data = JSON.parse(data);
        console.log(_data);
        document.getElementById("options").style.visibility = "hidden";

        $('#wrongAnswerGyan .gyan-message').html(_data);
    });


 socket.on('congratulations', function (data) {
        document.getElementById("options").style.visibility = "hidden";
        $('#correctAnswerGyan .gyan-message').html("");
 });

 socket.on('timeup', function (data) {
        document.getElementById("options").style.visibility = "hidden";
        document.getElementById("timeUpMessage").style.visibility = "visible";
 });


  socket.on('end', function (data) {
          // convert the json string into a valid javascript object
          var _data = JSON.parse(data);
          console.log(_data);
          $('#score').html(_data);
          $('#question').html("");
          document.getElementById("options").style.visibility = "hidden";

          <!--$('time').html('Last Update:' + new Date());-->
      });


var setLevel = function (score){
    console.log('score '+ score);
    switch (score){
        case 0:
        case 1:
        case 2:
        case 3:
            document.getElementById("state-image").src='./images/novice.png';
            break;
        case 4:
        case 5:
        case 6:
            document.getElementById("state-image").src='./images/pro.png';
            break;
        case 7:
        case 8:
        case 9:
        case 10:
            document.getElementById("state-image").src='./images/expert.png';
            break;
        default:
            document.getElementById("state-image").src='./images/novice.png';
            break;
    }
};

var countdown = function (){

 	var countdown =  $("#countdown").countdown360({
       	 	radius      : 60,
         	seconds     : 10,
         	fontColor   : '#FFFFFF',
         	autostart   : false,
         	onComplete  : function () {
         	    console.log('done')

         	     $.ajax({
                        url: "http://localhost:8000/timeUp"
                    }).then(function(data) {
console.log('res'+ data);
                    });
         	}
		   });
			countdown.start();

			console.log('countdown360 ',countdown);
		 	$(document).on("click","button",function(e){
		 		e.preventDefault();
		 		var type = $(this).attr("data-type");
		 		if(type === "time-remaining")
		 		{
		 			var timeRemaining = countdown.getTimeRemaining();
		 			alert(timeRemaining);
		 		}
		 		else
		 		{
		 			var timeElapsed = countdown.getElapsedTime();
		 			alert(timeElapsed);
		 		}
		 	});
}