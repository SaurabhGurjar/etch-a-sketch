const WIDTH = 500;
let pixelDensity = 16;
let pixels = 16;
let pixelSize, gridSize;
let isDrawing = false;
let penClicked = true;
let eraserClicked = false;
let rgbPenClicked = false;
let hue = 0;
let penColor = '#000000';
let leftHue = 0;
let rightHue = 180;
let leftColor, rightColor, swapColor;

const pd = document.querySelector('.show-pd-value');
const canvas = document.querySelector('.canvas');
const pickColor = document.getElementById('pen-color');
const pixelRange = document.querySelector('.user-input');
const divider = document.querySelector('.divider');
const footerText = document.querySelector('.footer-text');

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
        newDiv.setAttribute('style', `width: ${pixelSize}px; height: ${pixelSize}px`, 'background-color: ', 'user-select: none');
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
function draw(e) {
    // Not draw if mouse button is not pressed continously
    if (!isDrawing) return
    let targetDiv = e.target;
    if (penClicked) targetDiv.style.backgroundColor = penColor;
    else if (rgbPenClicked) {
        targetDiv.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        hue++
        if (hue >= 360) hue = 0;
    }
    else if (eraserClicked) targetDiv.style.backgroundColor = '';
}

// Clear canvas
function clearCanvas() {
    let i = 0, pixel;
    while (i <= gridSize) {
        pixel = document.getElementById(`${i}`);
        if (!(pixel === null)) pixel.style.backgroundColor = '';
        i++;
    }
}

// Change footer:- divider color and text color
function changeColor() {
        leftColor = `hsl(${leftHue}, 100%, 50%)`;
        rightColor = `hsl(${rightHue}, 100%, 50%)`;
        divider.style.background = "linear-gradient(to right, " + leftColor + ", " + rightColor + ")";
        footerText.setAttribute('style', `background: linear-gradient(to right, ${leftColor}, ${rightColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent`);
        if (leftHue >= 90) {
            leftHue = 0;
        } else if (rightHue >= 360) {
            rightHue = 270;
        }
        leftHue++; 
        rightHue++;
        
        setTimeout(() => {changeColor();}, 20);
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

// Tools controls
pen.addEventListener('click', () => {
    penClicked = true;
    eraser.classList.remove('active');
    rgbPen.classList.remove('active');
    pen.classList.add('active');
});
eraser.addEventListener('click', () => {
    eraserClicked = true;
    penClicked = false;
    rgbPenClicked = false;
    pen.classList.remove('active');
    rgbPen.classList.remove('active');
    eraser.classList.add('active');
});
rgbPen.addEventListener('click', () => {
    rgbPenClicked = true;
    penClicked = false;
    eraserClicked = false;
    eraser.classList.remove('active');
    pen.classList.remove('active');
    rgbPen.classList.add('active');

});

clear.addEventListener('click', clearCanvas);
pickColor.addEventListener('input', () => penColor = pickColor.value);
document.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', (e) => draw(e));


drawPixels(gridSize, pixelSize);
changeColor();