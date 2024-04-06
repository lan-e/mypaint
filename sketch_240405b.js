let brushSize = 10;
let drawingLine = true;
let drawingCircle = false;
let drawingRectangle = false;
let startX, startY, endX, endY;
let pen, circle, rectangle, trash, img, strokePicker, slider, colorPicker, sliderCount, clearButton, errorMsg;

function setup() {
  createCanvas(800, 600);
  
  // fill color picker
  let fillTxt = createDiv('Stroke:');
  fillTxt.position(10, height + 15);
  strokePicker = createColorPicker('#fc8c03');
  strokePicker.position(60, height + 10);
  
  // stroke color picker
  let strokeTxt = createDiv('Fill:');
  strokeTxt.position(10, height + 55);
  colorPicker = createColorPicker('#5e4b33');
  colorPicker.position(60, height + 50);
  
  // stroke slider 
  slider = createSlider(0, 10, 1);
  slider.position(150, height + 15);
  slider.size(100);
  sliderCount = createDiv('');
  sliderCount.position(270, height + 18);
  
  // save msg
  saveMsg = createDiv('Press "s" to save your creation!');
  saveMsg.position(300, height + 140);
  
  // import img 
  let input = createFileInput(handleImage);
  input.position(550, height + 15);
  
  // pen icon
  pen = createImg('assets/pen.svg');
  pen.position(10, 10);
  pen.size(40, 40);
  pen.mouseClicked(function() {
    drawingRectangle = false;
    drawingCircle = false;
    drawingLine = true;
  });
  
  // circle icon
  circle = createImg('assets/circle.svg');
  circle.position(70, 10);
  circle.size(40, 40);
  circle.mouseClicked(function() {
    drawingRectangle = false;
    drawingCircle = true;
    drawingLine = false;
  });
  
  // rectangle icon
  rectangle = createImg('assets/rectangle.svg');
  rectangle.position(130, 10);
  rectangle.size(40, 40);
  rectangle.mouseClicked(function() {
    drawingRectangle = true;
    drawingCircle = false;
    drawingLine = false;
  });
  
  // trash icon
  trash = createImg('assets/trash.svg');
  trash.position(190, 10);
  trash.size(40, 40);
  
  trash.mousePressed(clearCanvas);
  
  // error msg when stroke is 0
  errorMsg = createDiv('');
  errorMsg.position(width / 2, height / 2);
  errorMsg.style('color', 'red');
  errorMsg.hide();
}

function draw() {
  // Display the uploaded image
  if (img) {
    image(img, 0, 0, width, height);
  }
  
  sliderCount.html(slider.value());
  
  noStroke();
  fill(230);
  rect(0, 0, 250, 60);
  
  if (mouseIsPressed && drawingLine) {
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
  
  if (drawingRectangle) {
    errorMsg.hide();
    noFill();
    noStroke();
    rect(startX, startY, endX - startX, endY - startY);
  }
  
  if (drawingCircle) {
    errorMsg.hide();
    noFill();
    noStroke();
    ellipse(startX, startY, endX - startX, endY - startY);
  }
}

// clear the canvas
function clearCanvas() {
  background(255);
}

// start drawing
function mousePressed() {
  if (mouseButton === LEFT) {
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

// upload img
function handleImage(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('myCreation', 'jpg');
  }
}
