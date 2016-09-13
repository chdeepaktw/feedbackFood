
    // creating a new websocket
    var socket = io.connect('http://localhost:8000');
    // on every message recived we print the new datas inside the #container div
    socket.on('notification', function (data) {
        // convert the json string into a valid javascript object
        var _data = JSON.parse(data);
        console.log(_data);
        $('#container').html("");
        $('#question').html(_data.test.sample.question);
        $('#optionA').html(_data.test.sample.optionA);
        $('#optionB').html(_data.test.sample.optionB);
        <!--$('time').html('Last Update:' + new Date());-->
    });

    socket.on('next', function (data) {
        // convert the json string into a valid javascript object

        console.log(data);
        $('#container').html(data);
        $('time').html('Last Update:' + new Date());
    });

    function reset(){
          socket.emit('reset', {'call': 'reset'});
    }
