const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let audioContext;
let mic;
let freq = 0;

function setup() {
    createCanvas(400, 400);
    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);
}

function listening() {
    console.log('listening!');
    pitch = ml5.pitchDetection(
        model_url,
        audioContext,
        mic.stream,
        modelLoaded
    );
}

function gotPitch(error, frequency) {
    if(error) {
        console.error(error);
    } else {
        if(frequency) {
            freq = frequency;
        }
    }
    pitch.getPitch(gotPitch);
}

function modelLoaded() {
    console.log('model loaded!');
    pitch.getPitch(gotPitch);
}

function draw() {
    background(220);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(64);
    text(freq.toFixed(4), width/2, height/2);
}