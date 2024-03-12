let offsetWidth = 1;
let offsetHeight = 1;
let pct = 100;
let overlay;

function setup(){
    // get element 'p5jsid'
    var p5jsid = document.getElementById('p5jsid');
    // get width and height of the element
    offsetWidth = p5jsid.offsetWidth;
    offsetHeight = p5jsid.offsetHeight;
    // create canvas
    var myCanvas = createCanvas(offsetWidth, offsetHeight);
    myCanvas.parent('p5jsid');
    background(0,0,0);    
    textSize(40);

    overlay = createGraphics(offsetWidth, offsetHeight);
    overlay.noStroke();
    overlay.fill(255);
    overlay.background(25, 25, 25);
}

function draw(){
    // clear background
    background(155);    
    stroke(0, 0, 0);

    // change pct by mouse position. Max: 100, Min: 0
    var R = (offsetWidth/2.0) * 0.7;
    var bottomCircle = offsetHeight/2 + R;
    var topCircle = offsetHeight/2 - R;
    pct = map(mouseY, bottomCircle, topCircle, 0, 100, true);

    // draw circle on the middle
    fill(155);


    // Area of the circular segment
    // https://ca.wikipedia.org/wiki/Segment_circular
    var h = 2 * R * pct / 100.0;
    var d = R - h;
    var phi = 2.0 * acos(d / R);
    var Asegment = (R^2 / 2.0) * (phi - sin(phi)) / 2.0;
    var Acircle = PI * R^2;
    var pctsegment = Asegment / Acircle * 100.0;

    // Y
    var yA = map(pctsegment, 0, 100, bottomCircle, topCircle);
    var yH = mouseY;
    // keep yH between height/2 - R and height/2 + R
    yH = min(yH, bottomCircle);
    yH = max(yH, topCircle);

    // Water
    fill(0, 0, 255);
    rectMode(CORNERS);
    rect(0, bottomCircle, offsetWidth, yH);

    // A hole to see water
    overlay.erase(100);
    overlay.ellipse(offsetWidth/2, offsetHeight/2, R*2, R*2);
    overlay.noErase();
    image(overlay, 0, 0, offsetWidth, offsetHeight);

    // Show H
    fill(255); stroke(255);
    textAlign(CENTER);
    text(round(pct) + '% alçada ≅ ' + round(pctsegment)+'% àrea', offsetWidth/2, yH - 10);

}


