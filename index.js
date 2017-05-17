/**
 * Created by jb cordovado on 16/05/2017.
 */
// chargement d'express
var express = require('express');
// chargement du body-parser
var bodyParser = require('body-parser');
// création de l'app express
var app = express();
// chargement des sockets
var socket = require('socket.io');

// utilisation du repertoire public dans l'application
var htmlDirectory = __dirname + '/public';
app.use(express.static(htmlDirectory));

// utilisation du middleware body-parser dans l'application
app.use(bodyParser.urlencoded({extended: false}));

// creation d'un server http pour encapsuler l'appli express
var http = require('http').Server(app);
// connexion du server au socket
var io = socket(http);

// deploiement du server sur le port 3010
http.listen(3010, function(){
  console.log('listening on *:3010');
});

// creation d'une redirection automatique
app.get('/', function (req, res){
  res.redirect('/home');
});

// exemple d'une route en GET qui lance un fichier html
app.get('/home', function(req, res){
  res.sendFile( htmlDirectory + '/index.html');
});

// exemple d'une route en POST qui renvoit des données JSON
app.post('/home', function(req, res){
  return res.status(200).send( {status: 200, data: {} }) ;
});

// exemple d'utilisation d'une socket
io.on('connection', function(socket){
    var socketId = socket.id;
    socket.on('userConnexion',function(u){
      socket.emit('userConnexion', u + 'on id : '+socketId);
    });
});