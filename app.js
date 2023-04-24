const canvas = document.querySelector('.canvas');
const pixelDensity = document.querySelector('.user-input');


let pixels;

function getPixels() {
    do {
        pixels = prompt('Enter the Number of Pixels!', 'Value must be below 100');
    } while (pixels > 100);
    pixels = parseInt(pixels);
}

