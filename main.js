objects = [];
video = ""
status1 = ""
function preload(){
}


function setup(){
    canvas = createCanvas(350,350)
    canvas.position(550,250)
    video = createCapture(VIDEO)
    video.size(350,350)
    video.hide()


}


function draw(){
    image(video, 0, 0, 350,350)
    if(status1 != ""){
        objectDetector.detect(video, gotResults)
        
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected: "


            fill("#fcba03")
            percent = floor(objects[i].confidence*100)
            text(objects[i].label+  ""+ percent + "%", objects[i].x + 15 +  objects[i].y + 15)
            noFill()
            stroke("FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(object[i].label == object_input){
                video.stop()
                objectDetecter.detect(gotResults)
                document.getElementById("object_status").innerHTML = object_input+"found"
                synth = window.speechSynthesis()
                utterthis = new SpeechSynthesisUtterance(object_input+"found")
                synth.speak(utterthis)
                
            }
            else{
                document.getElementById("object_status").innerHTML = object_input+"not found"
            }
        }
    }

  
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modeLoaded)
    document.getElementById("status").innerHTML = "Status: detecting objects"
    object_input = document.getElementById("object_input").value
}

function modeLoaded(){
    console.log("Model Loaded!")
    status1 = true
}


function gotResults(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)
    objects = results;
}


