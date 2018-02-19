export const animate = ({ draw, duration, timing }) => {
    const start = performance.now();

    const frame = time => {
        let fraction = (time - start) / duration;

        if (fraction > 1) {
            fraction = 1;
        }

        const progress = timing(fraction);

        draw(progress);

        if (fraction < 1) {
            requestAnimationFrame(frame);
        }
    };

    requestAnimationFrame(frame);
};

export const distanceBetweeen = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
