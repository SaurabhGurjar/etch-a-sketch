const canvas = document.querySelector('.canvas');
const pixelDensity = document.querySelector('.user-input');


let pixels;

function getPixels() {
    do {
        pixels = prompt('Enter the Number of Pixels!', 'Value must be below 100');
    } while (pixels > 100);
    pixels = parseInt(pixels);
    let gridSize = pixels * pixels;

    changePixelDensity(gridSize);
}

pixelDensity.addEventListener('click', getPixels);


function changePixelDensity(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'pixel';
        newDiv.setAttribute('id', `${i + 1}`);
        newDiv.textContent = `${i + 1}`;
        canvas.appendChild(newDiv);
    }    
}

