var gotometre = function (sketch) {
    let offsetWidth = 1;
    let offsetHeight = 1;
    let pct = 100;
    let overlay;

    sketch.setup = function () {
        // get element 'p5jsid'
        var p5jsid = document.getElementById('p5jsid');
        // get width and height of the element
        offsetWidth = p5jsid.offsetWidth;
        offsetHeight = p5jsid.offsetHeight;
        // create canvas
        var myCanvas = sketch.createCanvas(offsetWidth, offsetHeight);
        myCanvas.parent('p5jsid');
        sketch.background(0, 0, 0);
        sketch.textSize(40);

        overlay = sketch.createGraphics(offsetWidth, offsetHeight);
        overlay.noStroke();
        overlay.fill(255);
        overlay.background(25, 25, 25);
    }

    sketch.draw = function () {
        // clear background
        sketch.background(155);
        sketch.stroke(0, 0, 0);

        // change pct by mouse position. Max: 100, Min: 0
        var R = (offsetWidth / 2.0) * 0.7;
        var bottomCircle = offsetHeight / 2 + R;
        var topCircle = offsetHeight / 2 - R;
        pct = sketch.map(sketch.mouseY, bottomCircle, topCircle, 0, 100, true);

        // draw circle on the middle
        sketch.fill(155);


        // Area of the circular segment
        // https://ca.wikipedia.org/wiki/Segment_circular
        var h = 2 * R * pct / 100.0;
        var d = R - h;
        var phi = 2.0 * sketch.acos(d / R);
        var Asegment = (R ^ 2 / 2.0) * (phi - sketch.sin(phi)) / 2.0;
        var Acircle = sketch.PI * R ^ 2;
        var pctsegment = Asegment / Acircle * 100.0;

        // Y
        var yA = sketch.map(pctsegment, 0, 100, bottomCircle, topCircle);
        var yH = sketch.mouseY;
        // keep yH between height/2 - R and height/2 + R
        yH = sketch.min(yH, bottomCircle);
        yH = sketch.max(yH, topCircle);

        // Water
        sketch.fill(0, 0, 255);
        sketch.rectMode(sketch.CORNERS);
        sketch.rect(0, bottomCircle, offsetWidth, yH);

        // A hole to see water
        overlay.erase(100);
        overlay.ellipse(offsetWidth / 2, offsetHeight / 2, R * 2, R * 2);
        overlay.noErase();
        sketch.image(overlay, 0, 0, offsetWidth, offsetHeight);

        // Show H
        sketch.fill(255); sketch.stroke(255);
        sketch.textAlign(sketch.CENTER);
        sketch.text(sketch.round(pct) + '% alçada ≅ ' + sketch.round(pctsegment) + '% àrea', offsetWidth / 2, yH - 10);

    }
}