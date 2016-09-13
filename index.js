var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  parser = new require('xml2json'),
  fs = require('fs');

var url = require('url');
var socketGlobal;

// creating the server ( localhost:8000 )
app.listen(8000);

console.log('server listening on localhost:8000');

// on server started we can load our client.html page
function handler(req, res) {

// your normal server code
    var path = url.parse(req.url).pathname;
    switch (path){
        case '/':
            initialLoad(req,res);
            break;
        case '/next':
            triggerNextQuestion(req,res);
            res.writeHead(200);
            res.end('Request Completed');
            break;
         default:
            send404(res);
    }
}

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

function initialLoad (req,res){
       fs.readFile(__dirname + '/client.html', function(err, data) {
           if (err){
                 console.log(err);
                 res.writeHead(500);
                 return res.end('Error loading client.html');
           }
                res.writeHead(200);
                res.end(data);
           });
}

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

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

    console.log(__dirname);
    socketGlobal= socket;

    socket.on('reset', function(data){
            console.log('reset the session');
    });
});