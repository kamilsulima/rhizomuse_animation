// Main snippet: https://www.openprocessing.org/sketch/408132
// Seeds color effect: https://www.openprocessing.org/sketch/385532

var font;
var vehicles = [];

var texts = ['...', 'RHIZOMUSE', 'CULTIVATION', 'SOON'];
var nextT = 0;
var maxChangeForce = 44;

var instructions = [];
var insText = '';



function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

//    background(00);

    var bounds = font.textBounds(texts[nextT], 0, 0, 192);
    var posx = width / 2 - bounds.w / 2;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(texts[nextT], posx, posy, 192, {
        sampleFactor: 0.3
    });

    for (var i = 1; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);

    }

    var boundsIns = font.textBounds(insText, 0, 0, 30);
    var posxIns = width / 2 - boundsIns.w / 2;
    var posyIns = height / 6 + boundsIns.h / 2;

    var insAr = split(insText, ' ');

    for (var i = 0; i < insAr.length; i++) {
        var bounds2 = font.textBounds(insAr[i], 10, 90, 80);
        var posx2 = posxIns;
        var posy2 = posyIns;

        posxIns += bounds2.w + 10;

        var points2 = font.textToPoints(insAr[i], posx2, posy2, 20, {
            sampleFactor: 0.3
        });

        for (var j = 0; j < points2.length; j++) {
            var pt = points2[j];
            var v = new Vehicle(pt.x, pt.y, 9);
            instructions.push(v);
        }
    }
}

function draw() {

    background(00);



    for (var i = 0; i < instructions.length; i++) {
        var v = instructions[i];
        v.behaviors();
        v.update();
        v.show();

    }

    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}

function mouseClicked() {
    nextT++;
    if (nextT > texts.length - 1) {
        nextT = 0;
    }

    var bounds = font.textBounds(texts[nextT], 0, 0, 192);
    var posx = width / 2 - bounds.w / 2;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(texts[nextT], posx, posy, 192, 20, {
        sampleFactor: 0.3
    });

    if (points.length < vehicles.length) {
        var toSplice = vehicles.length - points.length;
        vehicles.splice(points.length - 1, toSplice);

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    } else if (points.length > vehicles.length) {

        for (var i = vehicles.length; i < points.length; i++) {
            var v = vehicles[i - vehicles.length].clone();

            vehicles.push(v);
        }

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }

    } else {
        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    }
}