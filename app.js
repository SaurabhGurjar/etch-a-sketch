const WIDTH = 480;
let pixelDensity = 16;
let pixels = 16;
let pixelSize, gridSize;
let isDrawing = false;
let penClicked = true;
let eraserClicked = false;
let rgbPenClicked = false;
let hue = 0;
let penColor = '#000000';

const pd = document.querySelector('.show-pd-value');
const canvas = document.querySelector('.canvas');
const pickColor = document.getElementById('pen-color');
const pixelRange = document.querySelector('.user-input');

// Butttons
const pen = document.querySelector('.pen');
const eraser = document.querySelector('.eraser');
const rgbPen = document.querySelector('.rgb-pen');
const clear = document.querySelector('.clear-canvas');

pixelSize = WIDTH / pixelDensity;
gridSize = pixelDensity * pixelDensity;
pd.textContent = `${pixelDensity} X ${pixelDensity}`;


// Prompt user to get total pixels
function getPixels() {
    pixelDensity = pixelRange.value;
    return parseInt(pixelDensity);
}

// Draw grid on canvas
function drawPixels(gridSize, pixelSize) {
    if (canvas.hasChildNodes()) {
        removePixels();
    }

    for (let i = 0; i < gridSize; i++) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', `${i}`);
        newDiv.setAttribute('style', `width: ${pixelSize}px; height: ${pixelSize}px`, 'background-color: white', 'user-select: none');
        canvas.appendChild(newDiv);
    }
    pd.textContent = `${pixelDensity} X ${pixelDensity}`;
}

// This function recursively remove element from the canvas
function removePixels() {
    if (!(canvas.hasChildNodes())) {
        return;
    }
    canvas.removeChild(canvas.childNodes[(canvas.childNodes.length - 1)]);
    removePixels();
}

// Draw on (and Eraser from) canvas
function draw (e) {
    // Not draw if mouse button is not pressed
    if (!isDrawing) return

    if(penClicked) e.target.style.backgroundColor = penColor;
    else if (eraserClicked) e.target.style.backgroundColor = 'white';
    else if (rgbPenClicked) {
        e.target.style.backgroundColor =`hsl(${hue}, 100%, 50%)`;
        hue++
        if (hue >= 360) hue = 0;
    }
}

// Clear canvas
function clearCanvas() {
    let i = 0, pixel;
    while(i <= gridSize) {
        pixel = document.getElementById(`${i}`);
        pixel.style.backgroundColor = 'white';
        i++;
    }
}

// Get input from the user
pixelRange.addEventListener('click', () => {
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
clear.addEventListener('click', clearCanvas);
pickColor.addEventListener('input', () => penColor = pickColor.value);

drawPixels(gridSize, pixelSize);