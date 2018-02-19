export const distanceBetween = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

export const getDocumentElementSize = () =>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
});

export const getRandomNumber = (from, to) => parseInt((Math.random() * (to - from)) + from);