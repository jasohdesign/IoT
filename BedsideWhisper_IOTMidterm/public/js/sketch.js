var socket;
var TimeValue;
var url='192.168.1.119';
var port=8000;

socket = io.connect(url+':'+port);

function fromParse(){
	console.log("Get data from Parse");

	socket.emit('getFromParse', function(){

	});
		
};

socket.on('toScreen', function (data) {
	var num=Object.keys(data.ParseData.results).length;
	
	// if (num==1){num=0;}
	//one object
	// var date = data.ParseData.dateOfRecording;
	//multiple objects

	/*var state = 1;
	if(state == 1){*/
	var date = data.ParseData.results[num-1].dateOfRecording;
	/*state = 2;*/
	console.log(data);
	var sound = data.ParseData.results[num-1].filepath;
	console.log(sound);

	var audio = document.createElement('audio');
	audio.setAttribute('src', sound);
	audio.setAttribute("controls", "controls");
	audio.play();
	
	document.body.appendChild(audio);
	document.getElementById("dateOfRecordingBox").style.display = "block";
	// document.getElementById("soundBox").style.display = "block";
	document.getElementById("dateOfRecordingBox").innerHTML = date;
	// document.getElementById("soundBox").innerHTML = audio;

});

function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("Name must be filled out");
        return false;
    }
    else if (x == Tom) {
        return false;
    }
}