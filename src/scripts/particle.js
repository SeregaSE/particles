export default class Particle {
    constructor(initialX, initialY) {
        this.speed = this.getRandomNumber(10, 20);

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.transition = 'all 0.1s ease 0s';
        this.el.style['border-radius'] = '50%';

        document.body.appendChild(this.el);

        this.setPosition(initialX, initialY);
        this.setRandomSize();
        this.setRandomColor();
        this.startBrownianMotion();
    }

    getRandomNumber(from, to) {
        const rnd = Math.random();
        return parseInt((rnd * (to - from)) + from);
    }

    setRandomColor() {
        const rnd = Math.random();
        const hex = 0x1000000 + rnd * 0xffffff;
        const color = hex.toString(16).substr(1, 6);
        this.el.style.background = ['#', color].join('');
    }

    getPixels(property) {
        const value = this.el.style[property];
        return parseInt(value);
    }

    setPixels(property, value) {
        this.el.style[property] = [value, 'px'].join('');
    }

    setRandomSize() {
        const side = this.getRandomNumber(20, 70);
        this.setPixels('width', side);
        this.setPixels('height', side);
    }

    getDocumentSize() {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
    }

    getElementSize() {
        return {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight,
        }
    }

    getPositionX() {
        return this.getPixels('left');
    }

    getPositionY() {
        return this.getPixels('top');
    }

    calcNextCoords() {
        const to = parseInt(this.speed / 2);
        const from = to * -1;
        const curX = this.getPositionX();
        const curY = this.getPositionY();
        const x = curX + this.getRandomNumber(from, to);
        const y = curY + this.getRandomNumber(from, to);
        return { x, y };
    }

    withRebound({ x, y }) {
        const { width: elWidth, height: elHeight } = this.getElementSize();
        const { width, height } = this.getDocumentSize();
        const maxWidth = width - elWidth;
        const maxHeight = height - elHeight;
        let nextX = x;
        let nextY = y;

        if (x <= 0) {
            nextX = 0;
        }

        if (x >= maxWidth) {
            nextX = maxWidth;
        }

        if (y <= 0) {
            nextY = 0;
        }

        if (y >= maxHeight) {
            nextY = maxHeight;
        }

        return {
            x: nextX,
            y: nextY,
        }
    }

    setPosition(x, y) {
        this.setPixels('left', x);
        this.setPixels('top', y);
    }

    moveRandomly() {
        const { x:nextX, y:nextY } = this.withRebound(this.calcNextCoords());
        this.setPosition(nextX, nextY);
    }

    startBrownianMotion() {
        const timeout = 100;
        const interval = setInterval(this.moveRandomly.bind(this), timeout);
    }
}
