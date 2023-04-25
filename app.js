const WIDTH = 480;
const MAXPIXELS = 100;
let pixels = 16;
let pixelSize, gridSize;
let isDrawing = false;
let penClicked = false;
let eraserClicked = false;
let rgbPenClicked = false;

const canvas = document.querySelector('.canvas');
// Butttons
const setSize = document.querySelector('.user-input');
const pickColor = document.querySelector('.pen-color');
const pen = document.querySelector('.pen');
const eraser = document.querySelector('.eraser');
const rgbPen = document.querySelector('.rgb-pen');
const clear = document.querySelector('.clear-canvas');

pixelSize = Math.floor(WIDTH / pixels);
gridSize = pixels * pixels;


// Prompt user to get total pixels
function getPixels() {
    let pixel;
    do {
        pixel = prompt('Enter the Number of Pixels(2 for 2 X 2 grid)!', `Value must be below ${MAXPIXELS}`);
    } while (pixel > MAXPIXELS);
    if (pixel === null) {
        pixel = pixels;
    }
    return parseInt(pixel);
}

// Draw grid on canvas
function drawPixels(gridSize, pixelSize) {
    if (canvas.hasChildNodes()) {
        clearCanvas();
    }

    for (let i = 0; i < gridSize; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'pixel';
        newDiv.setAttribute('id', `${i + 1}`);
        newDiv.setAttribute('style', `width: ${pixelSize}px; height: ${pixelSize}px`);
        canvas.appendChild(newDiv);
    }
}

// This function recursively remove element from the canvas
function clearCanvas() {
    if (!(canvas.hasChildNodes())) {
        return;
    }
    canvas.removeChild(canvas.childNodes[(canvas.childNodes.length - 1)]);
    clearCanvas();
}

// Draw on (and Eraser from) canvas
function draw (e) {
    if (!isDrawing) return

    if(penClicked) e.target.style.backgroundColor = 'black';
    else if (eraserClicked) e.target.style.backgroundColor = 'white';
}



drawPixels(gridSize, pixelSize);
draw();

// Get input from the user
setSize.addEventListener('click', () => {
    pixels = getPixels();
    pixelSize = (WIDTH / pixels);
    gridSize = pixels * pixels;
    drawPixels(gridSize, pixelSize);
});

// Draw when mouse click or mouse click+drag
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    draw(e);
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', (e) => draw(e));

// Tools controls
pen.addEventListener('click', () => penClicked = true);
eraser.addEventListener('click', () => {
    eraserClicked = true;
    penClicked = false;
    rgbPenClicked = false;
});
rgbPen.addEventListener('click', () => {
    rgbPenClicked = true;
    penClicked = false;
    eraserClicked = false;
});
