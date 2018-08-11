// const layers = [
//     {
//         frames: [
//             "https://cdn.windowsreport.com/wp-content/uploads/2017/12/animation-software-kids.png"
//         ],
//         z: 0
//         // rate: 1000
//     }
// ];

const animate = (div, frames, rate) => {
    div.dataset.frame = 0;
    setInterval(() => {
        div.style.backgroundImage = `url(${
            frames[parseInt(div.dataset.frame)]
        })`;
        div.dataset.frame = nextFrame(div.dataset.frame, frames);
    }, rate);
};

const nextFrame = (current, frames) =>
    current + 1 < frames.length ? current + 1 : 0;

const findDistance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

// find overlapping x & y percentage for planet and sun
const getTiltDifference = (rootParallaxLayer, target) => {
    const {
        percentageX,
        percentageY
    } = rootParallaxLayer.vanillaTilt.getValues();
    return findDistance({ x: percentageY, y: percentageY }, target);
};

window.onload = () => {
    const rootParallaxLayer = document.querySelector(".layer1");
    VanillaTilt.init(rootParallaxLayer, {
        max: 10, // 35
        perspective: 1500,
        reset: false,
        speed: 30000,
        reverse: true
    });

    // animate(
    //     document.querySelector(".layer1"),
    //     [
    //         "https://cdn.windowsreport.com/wp-content/uploads/2017/12/animation-software-kids.png",
    //         "http://www.webtechlearning.com/wp-content/uploads/2014/04/Best-Animation.jpg"
    //     ],
    //     1000
    // );
};
