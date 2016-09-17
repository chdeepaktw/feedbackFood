var http = require('http');
var express = require('express');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var parser = new require('xml2json');
var fs = require('fs');

var gs = require('./gameServer.js');

app.use(express.static('client'));

var socketGlobal;

server.listen(8000);
console.log('server listening on localhost:8000');

app.get('/next', function (req, res) {
    triggerNextQuestion();
    gs.foo();
    res.send('Request Completed');
});

app.get('/submitAnswer', function (req, res) {
    gs.submitAnswer();
    gs.loadQuestions();
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

function triggerNextQuestion (req,res){
    console.log('next call');
    fs.readFile(__dirname + '/example.xml', function(err, data) {
          if (err) throw err;
        // parsing the new xml data and converting them into json file
        var json = parser.toJson(data);
        console.log('data '+data);
        // send the new data to the client
        socketGlobal.volatile.emit('notification', json);
    });
}
