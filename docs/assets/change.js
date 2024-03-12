const branch="main";
const originalDropImg = document.getElementById('original-drop-img');
const newImgSrc = `https://github.com/ctrl-alt-d/roundviz/blob/${branch}/docs/assets/hamster.png?raw=true`;
const music = `https://github.com/ctrl-alt-d/roundviz/blob/${branch}/docs/assets/sadhamster.mp3?raw=true`;
const newImg = new Image();
newImg.onload = function() {
    // start play music
    const audio = new Audio(music);
    audio.play();
    originalDropImg.style.transition = 'opacity 10s';
    originalDropImg.style.opacity = '0';
    setTimeout(() => {
        originalDropImg.src = newImgSrc;
        originalDropImg.style.maxHeight = 'none';
        originalDropImg.style.opacity = '1';
    }, 12000);
};
newImg.src = newImgSrc;