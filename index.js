var http = require('http');
var express = require('express');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var gs = require('./server/gameServer.js');

app.use(express.static('client'));

var socketGlobal;

server.listen(8000);
console.log('server listening on localhost:8000');

app.get('/', function(req, res){
    res.sendfile('/client/game.html', { root: __dirname  } );
});

app.get('/startGame', function (req, res) {
    console.log("inside startGame ");

    gs.startGame();
    triggerNextAction();
    var curQuestion = gs.getCurrentQuestion();
    res.send('Request Completed '+ curQuestion);
});

app.get('/submitAnswer', function (req, res) {
    var answer = req.param('optionId');
    gs.submitAnswer(answer);
    triggerNextAction();
    res.send('Request Completed');
});

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

    console.log(__dirname);
    socketGlobal= socket;

    socket.on('reset', function(data){
            console.log('reset the session');
    });
});

function triggerNextAction (req,res){
    console.log('next call');
    var next = gs.triggerNextAction();
    var jsonNext = JSON.stringify(next);
    console.log("json Next "+jsonNext);
    if(next != undefined){
        if(socketGlobal != undefined){
            socketGlobal.volatile.emit('notification', jsonNext);
        } else {
            console.log("Open the web page for game http://localhost:8000");
        }
    } else{
        var score = gs.endGame();
        jsonNext = JSON.stringify(score);
        if(socketGlobal != undefined) {
            socketGlobal.volatile.emit('end', jsonNext);
        } else {
            console.log("Open the web page for game http://localhost:8000")
        }
    }
}
