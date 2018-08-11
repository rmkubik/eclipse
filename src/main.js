window.onload = () => {
    console.log("loaded");
    VanillaTilt.init(document.querySelector(".parent"), {
        max: 35,
        speed: 400
    });
};
