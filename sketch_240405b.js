let brushSize = 10;
let drawingLine = true;
let drawingCircle = false;
let drawingRectangle = false;
let isOverlayOpen = true;
let startX, startY, endX, endY;
let pen, circle, rectangle, bucket, trash, input, download, importImg, img, strokePicker, slider, colorPicker, sliderCount, clearButton, errorMsg;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 180);
  
  info.position(windowWidth - 110, 5);
  trash.position(windowWidth - 50, 5);
  save.position(windowWidth - 40, windowHeight - 70);
  input.position(10, windowHeight - 70);
  errorMsg.position(windowWidth / 2, windowHeight/2);
}

function setup() {
  createCanvas(windowWidth, windowHeight - 180);
  
  // tools background
  let backgroundRect = createDiv('');
  backgroundRect.position(0, 0);
  backgroundRect.class("toolsBg");
  
  // stroke slider 
  slider = createSlider(0, 10, 1);
  slider.position(2, 70);
  slider.size(100);
  slider.class("slider");
  sliderCount = createDiv('');
  sliderCount.position(110, 70);
  
  // strokecolor picker
  let strokeTxt = createDiv('Stroke:');
  strokeTxt.position(145, 70);
  strokePicker = createColorPicker('#fc8c03');
  strokePicker.position(195, 64);
  
  // fill color picker
  let fillTxt = createDiv('Fill:');
  fillTxt.position(275, 70);
  colorPicker = createColorPicker('#04AA6D');
  colorPicker.position(298, 64);
  
  // pen icon
  pen = createImg('assets/pen.svg');
  pen.position(18, 10);
  pen.size(30, 30);
  pen.mouseClicked(drawLine);
  
  // circle icon
  circle = createImg('assets/circle.svg');
  circle.position(70, 10);
  circle.size(30, 30);
  circle.mouseClicked(drawCircle);
  
  // rectangle icon
  rectangle = createImg('assets/rectangle.svg');
  rectangle.position(130, 10);
  rectangle.size(30, 30);
  rectangle.mouseClicked(drawRectangle);
  
  // bucket icon
  bucket = createImg('assets/bucket.svg');
  bucket.position(190, 10);
  bucket.size(30, 30);
  bucket.mousePressed(fillCanvas);
  
  // info icon
  info = createImg('assets/info.svg');
  info.position(windowWidth - 110, 10);
  info.size(30, 30);
  info.mousePressed(toggleInfo);
  
  // trash icon
  trash = createImg('assets/trash.svg');
  trash.position(windowWidth - 50, 10);
  trash.size(30, 30);
  trash.mousePressed(clearCanvas);
  
  // import img 
  input = createFileInput(handleImage);
  input.position(10, windowHeight - 70);
  
  // save icon
  save = createImg('assets/download.svg');
  save.position(windowWidth - 40, windowHeight - 70);
  save.size(30, 30);
  save.mousePressed(saveCreation);
  
  // error msg when stroke is 0
  errorMsg = createDiv('');
  errorMsg.position(windowWidth / 2, windowHeight/2);
  errorMsg.style('color', 'red');
  errorMsg.hide();
}

function draw() {
  sliderCount.html(slider.value() + 'px');
  
  noStroke();
  fill(230);
  
  if (!isOverlayOpen && mouseIsPressed && drawingLine) {
    strokeWeight(slider.value());
    stroke(strokePicker.color());
    if (slider.value() === 0) {
      errorMsg.html('Stroke is 0.');
      errorMsg.show();
    } else {
      errorMsg.hide();
    }
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  
  if (!isOverlayOpen && drawingRectangle) {
    errorMsg.hide();
    noFill();
    noStroke();
    rect(startX, startY, endX - startX, endY - startY);
  }
  
  if (!isOverlayOpen && drawingCircle) {
    errorMsg.hide();
    noFill();
    noStroke();
    ellipse(startX, startY, endX - startX, endY - startY);
  }
  // display the uploaded image
  if (img) {
    image(img, 0, 0, width, height);
  }
  
}

// start drawing
function mousePressed() {
  if (!isOverlayOpen && mouseButton === LEFT) {
    if (drawingRectangle || drawingCircle) {
      startX = mouseX;
      startY = mouseY;
    }
  }
}

// finish drawing
function mouseReleased() {
  if (mouseButton === LEFT) {
    // Set stroke color and weight only when the mouse is released
    stroke(strokePicker.color());
    strokeWeight(slider.value());
    
    if (drawingRectangle) {
      endX = mouseX;
      endY = mouseY;
      // Draw the rectangle
      fill(colorPicker.color());
      rect(startX, startY, endX - startX, endY - startY);
    } else if (drawingCircle) {
      endX = mouseX;
      endY = mouseY;
      // Draw the circle
      fill(colorPicker.color());
      ellipse(startX, startY, endX - startX, endY - startY);
    }
  }
}

function keyPressed(){
  if(key.toLowerCase() === "f"){
    fillCanvas();
  }
  else if(key.toLowerCase() === "p"){
    drawLine();
  }
  else if(key.toLowerCase() === "c"){
    drawCircle();
  }
  else if(key.toLowerCase() === "r"){
    drawRectangle();
  }
  else if(key.toLowerCase() === "d"){
    clearCanvas();
  }
  else if(key.toLowerCase() === "s"){
    saveCreation();
  }
}

function drawLine() {
  drawingRectangle = false;
  drawingCircle = false;
  drawingLine = true;
}

function drawCircle() {
  drawingRectangle = false;
  drawingCircle = true;
  drawingLine = false;
}

function drawRectangle() {
  drawingRectangle = true;
  drawingCircle = false;
  drawingLine = false;
}

function clearCanvas() {
  img = null;
  background(255);
}

function fillCanvas() {
  background(colorPicker.color());
}

function saveCreation() {
  saveCanvas('myCreation', 'jpg');
}

function handleImage(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  }
}

function toggleInfo() {
  document.querySelector(".overlay").classList.toggle("toggleInfo");
  document.querySelector(".welcomeMsg").classList.toggle("toggleInfo");
  
  isOverlayOpen = !isOverlayOpen;
}
