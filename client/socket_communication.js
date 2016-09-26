
    // creating a new websocket
    var socket = io.connect('http://localhost:8000');
    // on every message recived we print the new datas inside the #container div
    socket.on('notification', function (data) {
        // convert the json string into a valid javascript object
        var _data = JSON.parse(data);
        console.log(_data);
        $('#question').html(_data.question);
        $('#optionA').html(_data.options[0]);
        $('#optionB').html(_data.options[1]);
        $('#score').html(_data.score);
        <!--$('time').html('Last Update:' + new Date());-->

        setLevel(_data.score);


    });

    socket.on('end', function (data) {
            // convert the json string into a valid javascript object
            var _data = JSON.parse(data);
            console.log(_data);
            $('#score').html(_data);
            $('#question').html("");
            $('#optionA').html("");
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
