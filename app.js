const  PIXELS = 256;

const canvas = document.querySelector('.canvas');

for (let i = 0; i < PIXELS; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = 'pixel';
    newDiv.setAttribute('id', `${i + 1}`);
    newDiv.textContent = `${i + 1}`;
    canvas.appendChild(newDiv);
}
