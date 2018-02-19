import Particle from './particle'

const particles = [];

// 100 particles - 40 fps 8mb GPU / 20-80mb ram, 500 - 23fps 12mb GPU / 150-250 ram, 1000 12fps 12mb GPU / 757 ram
for(let i = 0; i < 2000; i++) {
    particles.push(new Particle(100, 100))
}

document.addEventListener('click', event => {
    const initialX = event.clientX;
    const initialY = event.clientY;

    particles.push(new Particle(initialX, initialY))
});
