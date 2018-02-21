import { distanceBetween, getDocumentElementSize, getRandomNumber } from './utils';

export default class Particle {
    constructor(initialX, initialY) {
        this.el = document.createElement('div');
        this.el.classList.add('particle');
        this.setTransform(initialX, initialY);
        this.el.addEventListener('transitionend', this.moveRandomly.bind(this), false);

        document.body.appendChild(this.el);
        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.setSpeed();
        this.moveRandomly();
    }

    onWindowResize() {
        this.setSpeed();
        this.moveRandomly();
    }

    getPosition() {
        const { left:x, top:y } = this.el.getBoundingClientRect();
        return { x, y }
    }

    getElementSize() {
        return {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight,
        }
    }

    setSpeed() {
        const { width, height } = getDocumentElementSize();
        this.speed = (1 / Math.pow(width, 2) + 1 / Math.pow(height, 2)) * 10000000;
    }

    getRandomPosition() {
        const { width: elWidth, height: elHeight } = this.getElementSize();
        const { width, height } = getDocumentElementSize();
        const toX = width - elWidth;
        const toY = height - elHeight;
        const x = getRandomNumber(0, toX);
        const y = getRandomNumber(0, toY);
        return {
            x,
            y,
        }
    }

    getDuration(target) {
        const distance = distanceBetween(
            this.getPosition(),
            target,
        );

        // pixels per second
        return distance / this.speed;
    }

    setStyle(rule, value) {
        this.el.style[rule] = value;
    }

    setTransform(x, y) {
        this.setStyle('transform', `translate(${x}px, ${y}px)`)
    }

    setTransition(duration) {
        this.setStyle('transition', `transform ${duration}s`);
    }

    moveAt(target, duration) {
        const { x, y } = target;
        this.setTransition(duration);
        this.setTransform(x, y);
    }

    moveRandomly() {
        const target = this.getRandomPosition();
        const duration = this.getDuration(target);
        this.moveAt(target, duration);
    }
}
