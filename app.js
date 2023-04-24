const WIDTH = 480;
const MAXPIXELS = 100;

const canvas = document.querySelector('.canvas');
const setSize = document.querySelector('.user-input');


// Get the Number of pixels from the user
function getPixels() {
    let pixelSize, pixels, gridSize;
    do {
        pixels = prompt('Enter the Number of Pixels(2 for 2 X 2 grid)!', `Value must be below ${MAXPIXELS}`);
    } while (pixels > MAXPIXELS);
    pixels = parseInt(pixels);

    pixelSize = Math.floor(WIDTH / pixels);
    gridSize = pixels * pixels;

    if (canvas.hasChildNodes()) {
        clearCanvas();
    }

    changePixelDensity(gridSize, pixelSize);
}


// Create grid on canvas
function changePixelDensity(gridSize, pixelSize) {
    for (let i = 0; i < gridSize; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'pixel';
        newDiv.setAttribute('id', `${i + 1}`);
        newDiv.textContent = `${i + 1}`;
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

setSize.addEventListener('click', getPixels);