/* eslint-disable no-undef, no-unused-vars */
var rows = 8;
var cols = 8;
var img = [];
var scram = false;
var sovle = false;
var sta = "";
var ci = 1;
var swaps = 0;
var colors = {
  shoe1: "#DA1997",
  shoe2: "#E61C9F",
  body: "#FFB8FA",
  arm1: "#FE76F3",
  arm2: "#FF33F0",
  eyes1: "#000000",
  eyes2: "#2B308E",
  grass: "#15ED00",
  backround: "#00FFFB"
};

var imake = () => {
  for (var ii = 0; ii < cols; ii++) {
    for (var i = 0; i < rows; i++) {
      img.push({
        x: i,
        y: ii,
        color: colors.backround,
        px: i,
        py: ii,
        pos: i + ii * rows
      });
    }
  }
};

var ichange = (i, x, y, color) => {
  img[i].x = x;
  img[i].y = y;
  img[i].color = color;
};

var findi = (x, y) => {
  for (var i = 0; i < img.length; i++) {
    if (img[i].x === x && img[i].y === y) {
      return i;
    }
  }
};

var ichangepos = (x, y, color) => {
  var i = findi(x, y);
  img[i].color = color;
};

var iposline = (c1, c2, st, m, color) => {
  console.log("fun");
  if (m === "h") {
    var t = c2 - c1;
    console.log("h");
    for (var i = 0; i <= t; i++) {
      ichangepos(c1 + i, st, color);
      console.log(i);
    }
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Put setup code here
}

imake();

//ichangepos(7, 6, "#FF00BF");

iposline(2, 5, 1, "h", colors.body);
iposline(1, 6, 2, "h", colors.body);

iposline(1, 6, 3, "h", colors.body);

iposline(1, 6, 4, "h", colors.body);

iposline(0, 2, 5, "h", colors.arm1);

iposline(2, 5, 5, "h", colors.body);

iposline(2, 5, 6, "h", colors.body);

iposline(0, 7, 7, "h", colors.grass);

iposline(2, 3, 7, "h", colors.shoe2);

console.log("pass");

ichangepos(3, 3, colors.eyes1);
ichangepos(5, 3, colors.eyes1);

ichangepos(3, 4, colors.eyes2);
ichangepos(5, 4, colors.eyes2);
ichangepos(0, 4, colors.arm1);
ichangepos(7, 4, colors.arm1);

ichangepos(2, 5, colors.arm2);
ichangepos(6, 5, colors.arm2);
ichangepos(6, 5, colors.arm1);
ichangepos(7, 5, colors.arm1);

ichangepos(1, 3, colors.arm1);
ichangepos(2, 6, colors.arm1);
ichangepos(3, 6, colors.arm1);

ichangepos(1, 6, colors.shoe1);
ichangepos(6, 6, colors.shoe1);

ichangepos(1, 7, colors.shoe1);
ichangepos(5, 7, colors.shoe1);
ichangepos(6, 7, colors.shoe2);

function swap(i1, i2) {
  var xx = img[i1].x;
  var xy = img[i1].y;
  var xpos = img[i1].pos;

  img[i1].x = img[i2].x;
  img[i1].y = img[i2].y;
  img[i1].pos = img[i2].pos;

  img[i2].x = xx;
  img[i2].y = xy;
  img[i2].pos = xpos;
}

function scramble() {
  for (var i = 0; i < img.length; i++) {
    var xi = Math.floor(Math.random() * img.length);
    swap(i, xi);
  }
}

document.getElementById("app").innerHTML =
  '<button onclick="scramble()">Click me</button>';

function mix() {
  scram = !scram;
}

function step() {
  if (ci >= img.length - 1) {
    if (swaps === 0) {
      slover();
    }
    ci = 1;
    swaps = 0;
  } else {
    ci = ci + 1;
  }
  sta = "pos ci:" + img[ci].pos + "pos -:" + img[ci - 1].pos;
  if (img[ci].pos < img[ci - 1].pos) {
    swap(ci, ci - 1);
    sta = sta + "<br>swap";
    swaps = swaps + 1;
  }
}

function slover() {
  sovle = !sovle;
}

function draw() {
  // Put drawings here
  var cio = ci;
  //document.getElementById("app").innerHTML = cio;
  //document.getElementById("sta").innerHTML = sta;
  if (scram) {
    scramble();
  }
  if (sovle) {
    step();
  }
  for (var i = 0; i < img.length; i++) {
    fill(img[i].color);
    rect(img[i].x * 50, img[i].y * 50, 50, 50);
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
