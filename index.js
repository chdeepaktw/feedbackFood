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
    gs.loadQuestions();
//    socketGlobal.volatile.emit('welcome', "");
});

app.get('/startGame', function (req, res) {
    gs.loadQuestions();
    gs.startGame();
    gs.setCurrentQuestion();
    triggerNextAction();
    var curQuestion = gs.getCurrentQuestion();
    console.log('Game Started with question : '+ curQuestion.question);
    res.send('Request Completed');
});

app.get('/submitAnswer', function (req, res) {
    var answer = req.param('optionId');
    var isCorrect = gs.submitAnswer(answer);
    console.log('Answer submitted for '+ gs.getCurrentQuestion().question +' Answer '+ answer +'  IsCorrect:  '+ isCorrect);
    if(isCorrect === true){
        var player = require('play-sound')(opts = {})
        player.play('audio/correct.mp3', function(err){})
        console.log('Correct Answer. Moving to Next Question');
        var curQuestion = gs.getCurrentQuestion();
        var gyan = JSON.stringify(curQuestion.gyan);
        socketGlobal.volatile.emit('congratulations', gyan);
        setTimeout(function(){
            console.log('Congratulations Done. Moving to Next Question');
            gs.setCurrentQuestion();
            triggerNextAction();
            res.send('Request Completed');
        }, 2000);
    } else if(isCorrect == false){
        var player = require('play-sound')(opts = {})
        player.play('audio/wrong.mp3', function(err){})
        console.log('InCorrect Answer. Showing Gyan and then Moving to Next Question');
        var curQuestion = gs.getCurrentQuestion();
        var gyan = JSON.stringify(curQuestion.gyan);
        socketGlobal.volatile.emit('gyan', gyan);
        setTimeout(function(){
            console.log('Gyan Done. Moving to Next Question');
            gs.setCurrentQuestion();
            triggerNextAction();
            res.send('Request Completed');
        }, 2000);
    } else {
        console.log('Option Button Pressed without Question. Restarting Game');
        gs.startGame();
        gs.setCurrentQuestion();
        triggerNextAction();
        res.send('Request Completed');
    }

});

app.get('/timeUp', function (req, res) {
    console.log('Time Up.');
    gs.timeUp();
    var gyan ="timeup";
    socketGlobal.volatile.emit('timeup', gyan);
    setTimeout(function(){
        console.log('Moving to Next Question.');
        gs.setCurrentQuestion();
        triggerNextAction();
        res.send('Request Completed');
    }, 2000);


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
    console.log('Trigger next call');
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
