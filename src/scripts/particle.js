import { animate, distanceBetweeen } from './utils';

export default class Particle {
    constructor(initialX, initialY) {
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.transition = 'all 0.1s ease 0s';
        this.el.style['border-radius'] = '50%';

        document.body.appendChild(this.el);

        this.setPosition(initialX, initialY);
        this.setRandomSize();
        this.setRandomColor();
        this.move();
    }

    getPositionX() {
        return this.getPixels('left');
    }

    getPositionY() {
        return this.getPixels('top');
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

    getPixels(property) {
        const value = this.el.style[property];
        return parseInt(value);
    }

    setPixels(property, value) {
        this.el.style[property] = [value, 'px'].join('');
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

    setPosition(x, y) {
        this.setPixels('left', x);
        this.setPixels('top', y);
    }

    setRandomSize() {
        const side = this.getRandomNumber(20, 70);
        this.setPixels('width', side);
        this.setPixels('height', side);
    }

    calcNextCoords() {
        const { width: toX, height: toY } = this.getDocumentSize();
        const fromX = this.getPositionX() * -1;
        const fromY = this.getPositionY() * -1;
        const x = this.getRandomNumber(fromX, toX);
        const y = this.getRandomNumber(fromY, toY);
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

    move() {
        // calcNextCoords - Получаем случайную точку к которой будем двигаться
        // withRebound - Если точка лежит за границей окна, сдвигаем точку до границы
        const { x:targetX, y:targetY } = this.withRebound(this.calcNextCoords());
        const curX = this.getPositionX();
        const curY = this.getPositionY();
        // Получаем расстояние между верхним левым краем точки и целевой точки
        const distance = distanceBetweeen(
            { x: targetX, y: targetY },
            { x: curX, y: curY },
        );

        animate({
            duration: distance  / 200 * 1000, // Задаем скорость
            timing: progress => progress,
            draw: progress => {
                // Двигаем точку в зависимости от степени завершенности анимации
                const nextX = curX + (targetX - curX) * progress;
                const nextY = curY + (targetY - curY) * progress;
                this.setPosition(nextX, nextY);
                // Если закончили движение, начинаем новое
                if (progress === 1) {
                    this.move();
                }
            },
        });
    }
}
