import Particle from './particle'

const particles = [];

document.addEventListener('click', event => {
    const initialX = event.clientX;
    const initialY = event.clientY;

    particles.push(new Particle(initialX, initialY))
});
