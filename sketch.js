//Code and Design by Phong Tran 
//phongmusic.com
//@phongmusic

// recording and general setup variables
var t = 0;
var startMillis;
var duration = 5000; //duration in milliseconds
var fps = 60;
var capturer = new CCapture({ format: 'png', framerate: fps });
var recording = true;
var preview = false
var elapsed;

// init
function setup() {
	createCanvas(540, 540);
	colorMode(HSB);
	frameRate(fps);
	if (recording) {
		capturer.start();
	}

}

// control draw
function draw() {

	//reset millisecond counter on 1st draw
	if (startMillis == null) {
		startMillis = millis();
	}
	
	//seekbar -- preivew on, mouse acts as seek; off means play normal 
	if (preview) {
		elapsed = map(mouseX,0,width,0,duration);
	} else {
		elapsed = millis() - startMillis;
	}

	//play or record
	if (recording) {
		t = map(elapsed, 0, duration, 0, 1);
		//console.log(capturer);
		draw_();
		console.log('capturing frame');
		capturer.capture(document.getElementById('defaultCanvas0'));
		if (t > 1) {
			console.log('finished recording');
			capturer.stop();
			capturer.save();
			noLoop();
			return;
		}
	} else {
		t = (elapsed/duration) % 1; 
		draw_();
	}



	


}

/////////////////////////////////////////////////////////////
//sketch globals
var spacing = 50;
var breakpoints = 2;


//actual draw function
function draw_() {
	background(100*(1+sin(t*TWO_PI)),70,70);
	stroke(0,0,100)
	noFill();
	for (let i = -height*2; i < height*2; i += spacing) {
		push();
		beginShape();
		curveVertex(0,i);
		curveVertex(0,i);
		for (let j = -width; j < width; j += 30) {
			let x = j;
			let y = i + (70*sin((t+i/30)*TWO_PI)*cos((t+j/spacing)*TWO_PI));
			// let y = i+(1000*sin(t*TWO_PI)*noise(j));

			curveVertex(x,y);
		}
		curveVertex(width,i);
		curveVertex(width,i);
		endShape();
		pop();
		
	}

	
	for (let k = -width/2; k < width/2; k += 55) {
		push();
		let y = 50*cos((t+k/width)*TWO_PI);
		let yp = 1+cos((t+k/width)*TWO_PI);
		let z = 1+cos((t+k/50)*TWO_PI);
		fill(yp*100,100,100);
		noStroke();
		translate(width/2,height/2)
		translate(k+5,y);
		rect(0,0,35,35);
		pop();
	}

}