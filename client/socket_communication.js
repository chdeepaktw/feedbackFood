
    // creating a new websocket
    var socket = io.connect('http://localhost:8000');
    // on every message recived we print the new datas inside the #container div
    socket.on('notification', function (data) {
        // convert the json string into a valid javascript object
        var _data = JSON.parse(data);
        console.log(_data);
        $('#question').html(_data.question);
        document.getElementById("optionAIcon").style.visibility = "visible";

        $('#optionA').html(_data.options[0]);
        document.getElementById("optionBIcon").style.visibility = "visible";

        $('#optionB').html(_data.options[1]);
        $('#score').html(_data.score);
        <!--$('time').html('Last Update:' + new Date());-->

        setLevel(_data.score);
        countdown();

    });

    socket.on('end', function (data) {
            // convert the json string into a valid javascript object
            var _data = JSON.parse(data);
            console.log(_data);
            $('#score').html(_data);
            $('#question').html("");
                    document.getElementById("optionAIcon").style.visibility = "hiddden";

            $('#optionA').html("");
                    document.getElementById("optionBIcon").style.visibility = "visible";

            $('#optionB').html("");
            <!--$('time').html('Last Update:' + new Date());-->
        });


var setLevel = function (score){
    console.log('score '+ score);
    switch (score){
        case 0:
            break;
        case 1:
            document.getElementById("state-image").src='./images/state-01.png';
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        default:
            break;
    }
}

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