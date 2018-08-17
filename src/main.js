// const layers = [
//     {
//         frames: [
//             "https://cdn.windowsreport.com/wp-content/uploads/2017/12/animation-software-kids.png"
//         ],
//         z: 0
//         // rate: 1000
//     }
// ];

function floatBetween(low, high) {
    return Math.random() * (high - low) + low;
}

function intBetweenInclusive(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

function pickRandomlyFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

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

const asteroidSprites = [
    "assets/images/asteroid 1.png",
    "assets/images/asteroid 2.png",
    "assets/images/asteroid 3.png"
];
const asteroidSpinDirections = ["spinCounterClockwise", "spinClockwise"];
const asteroidScale = {
    max: 0.03,
    min: 0.005
};
const dimensions = {
    height: 648,
    width: 1152
};
const spawnAsteroid = () => {
    const x = intBetweenInclusive(0, dimensions.width);
    const y = intBetweenInclusive(0, dimensions.height);
    const asteroid = document.createElement("img");
    asteroid.src = pickRandomlyFromArray(asteroidSprites);
    asteroid.draggable = false;
    asteroid.style.width = `${floatBetween(
        asteroidScale.min,
        asteroidScale.max
    ) * dimensions.width}px`;
    asteroid.style.left = `${x}px`;
    asteroid.style.top = `${y}px`;
    asteroid.classList.add(pickRandomlyFromArray(asteroidSpinDirections));
    asteroid.style.animationDuration = `${intBetweenInclusive(20, 50)}s`;
    asteroid.style.transform = `rotate(${intBetweenInclusive(0, 360)}deg)`;
    document.querySelector(".layer7").appendChild(asteroid);
};

const offset = {
    x: (1600 - dimensions.width) / 2,
    y: (900 - dimensions.height) / 2
};
const minerScale = 0.03;
const spawnMiner = ({ x, y }) => {
    const miner = document.createElement("img");
    miner.src = "assets/images/mining.png";
    miner.draggable = false;
    miner.style.width = `${minerScale * dimensions.width}px`;
    miner.style.left = `${offset.x + x}px`;
    miner.style.top = `${offset.y + y}px`;
    document.querySelector(".layer7").appendChild(miner);
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

    for (let i = 0; i < 10; i++) {
        spawnAsteroid();
    }

    window.onclick = event => {
        console.log(event);
        spawnMiner({
            x: event.x,
            y: event.y
        });
    };

    // animate(
    //     document.querySelector(".layer1"),
    //     [
    //         "https://cdn.windowsreport.com/wp-content/uploads/2017/12/animation-software-kids.png",
    //         "http://www.webtechlearning.com/wp-content/uploads/2014/04/Best-Animation.jpg"
    //     ],
    //     1000
    // );
};
