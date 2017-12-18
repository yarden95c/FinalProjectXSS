var app = require('express')();
var http = require('http').Server(app);
var url = require('url');
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/DOM_server.html');
});
http.listen(port, function(){
    console.log('listening on *:' + port);
});


// http://localhost:3000/?keyword=<button onclick='alert(1)' >queen</button>