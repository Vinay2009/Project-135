status = "";
objects=[];
var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function setup() {
    canvas = createCanvas(500, 350);
    canvas.position(500, 150);
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 350);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_name)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("number_of_objects").innerHTML = object_name  + "found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name  + "found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("number_of_objects").innerHTML = object_name  + "not found";
        }

        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}