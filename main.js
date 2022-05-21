song1status="";
song2status="";
lwx=0;
lwy=0;
rwx=0;
rwy=0;
scorelw=0;
scorerw=0;
function modelloaded(){
    console.log("Model is loaded");
    }
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotposes);
}
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("song2.mp3");
}
function draw(){
    image(video,0,0,600,500);
    fill("#d757fa");
    stroke("#00ffd5");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    if(scorerw>0.1){
        circle(rwx,rwy,30);
        song2.stop();
        if(song1status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing song 1";
        }
    }
    if(scorelw>0.1){
        circle(lwx,lwy,30);
        song1.stop();
        if(song2status==false){
            song2.play();
            document.getElementById("song").innerHTML="Playing song 2";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotposes(results){
    if(results.length>0){
console.log(results);
lwx=results[0].pose.leftWrist.x;
rwx=results[0].pose.rightWrist.x;
lwy=results[0].pose.leftWrist.y;
rwy=results[0].pose.rightWrist.y;
scorelw=results[0].pose.keypoints[9].score;
scorerw=results[0].pose.keypoints[10].score;
}}