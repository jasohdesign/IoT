var Parse = require('node-parse-api').Parse;
var APP_ID = "N83sf1WUHXPdfs5M2OT0lAYAJHYxmjrL8hTP9BhH";
var MASTER_KEY = "WfmmcmHQd03qEet16A4O9ox8mlzuN4aP1IPOrGDW";
var appParse = new Parse(APP_ID, MASTER_KEY);


var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);

var audioCount = 1;

var PythonShell = require('python-shell');

var Gpio = require('onoff').Gpio,
    RecordTouch = new Gpio(23, 'in', 'both');
var Gpio = require('onoff').Gpio,
    ListenTouch = new Gpio(24, 'in', 'both');
var fs = require('fs'); //sound text file
var readTextFile = fs.readFileSync('count.txt').toString();
var recording = false;
var listening = false;
///create server
app.use(express.static(__dirname + '/public'));
console.log('Simple static server listening at '+url+':'+port);
console.log(readTextFile);

//initialize socket
io.sockets.on('connection', function (socket) {

    RecordTouch.watch(function(err, value) {
        if (err) exit();
      
        console.log("Record touch? " + value);
        if (value == 1 && !recording) {
            recording = true;
            // alreadyPressed = true;
            console.log("Pressed to record!");
            audioCount = audioCount+1;
            fs.writeFile("count.txt", audioCount, function(err) {
    		    console.log("The file was saved!");
  			});

            PythonShell.run('recSound.py', function (err) {
            });  
            recording = false;
            console.log('finished recording');
            
        	}
  });
    
    ListenTouch.watch(function(err, value) {
        if (err) exit();

        console.log("Listen touch? " + value);
        if (value == 1 && !listening) {
            listening = true;
            console.log("Replay recorded!");

            PythonShell.run('playSound.py', function (err) {
            });   
            console.log('finished listening');
            listening = false;
            data = new Date();
            console.log('date is' + data);
            path = 'http://192.168.1.119:8000/' + readTextFile + '.mp3';
            console.log(path);
            
            socket.emit('RecordingInfo', { dateOfRecording: data, filepath: path});

            appParse.insert('RecordingInfo', { dateOfRecording: data, filepath: path}, function (err, response){
              console.log("entry made to Parse");
            });
          }
    });


  socket.on('getFromParse', function (data) {
      appParse.find('RecordingInfo', '', function (err, response) {
        if (err) exit();
        console.log(response);
        socket.emit('toScreen',{ ParseData: response });
      });
  });

}); //end of io.sockets.on

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
