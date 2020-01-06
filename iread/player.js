console.log('hello !');

const imgBlock = document.getElementById("imgBlock");
const audioBlock = document.getElementById("audioBlock");

const playFlag = false;
// const audio = document.getElementById("testAudio");
const audio = document.createElement("audio");
const source = document.createElement("source");
const audioErrDes = document.createElement("span");

source.setAttribute("src", "./02.mp3")
source.setAttribute("type", "audio/mp3");
audio.appendChild(source);
audioErrDes.innerText = "瀏覽器不支援，播放器無法正常啟用";
audio.appendChild(audioErrDes);

audio.setAttribute("controls", "");
audio.load();
audioBlock.appendChild(audio);

// const imgs = [
//     {
//         startTime: 0,
//         src: "./01-1.jpg"
//     }, 
//     {
//         startTime: 23,
//         src: "./01-2.jpg"
//     }, 
//     {
//         startTime: 34,
//         src: "./01-3.jpg"
//     }
// ];

const imgs = [
    {
        startTime: 0,
        src: "./02-1.png"
    }, 
    {
        startTime: 14.3,
        src: "./02-2.png"
    }
];

let img = document.createElement("img");
let imgCurrIdx = 0;
img.src = imgs[imgCurrIdx].src;
imgBlock.appendChild(img);

let radios = document.getElementsByName("switch");
radios[0].setAttribute("checked", "");

let intervalId = 0;
let deprecateIntervalId = 0;

function bindAudio() {
    audio.addEventListener("play", (event) => {
        console.log("play()");
        let currentTime = audio.currentTime;
        for (let i=0; i<imgs.length; i++) {
            if (i+1 >= imgs.length) {
                img.src = imgs[imgs.length-1].src;
                imgCurrIdx = imgs.length-1;
                break;
            }
            if (currentTime < imgs[i+1].startTime) {
                img.src = imgs[i].src;
                imgCurrIdx = i;
                break;
            }
        }
    });

    audio.addEventListener("playing", (event) => {
        console.log("playing()");

    });

    audio.addEventListener("timeupdate", (event) => {
        console.log("timeupdate()");
        if (imgCurrIdx+1 >= imgs.length)
            return;
        if (audio.currentTime >= imgs[imgCurrIdx+1].startTime) {
            imgCurrIdx++;
            if (getSwitch() === "auto")
                img.src = imgs[imgCurrIdx].src;
            if (getSwitch() === "pause")
                audio.pause();
        }
    })
}

function bindKey() {
    document.onkeydown = event => {
        let keyCode = event.keyCode;
        if (keyCode === 32) {
            if (audio.paused === true) {
                if (audio.canPlayType("audio/mp3") !== '')
                    audio.play();
            } else
                audio.pause();
        }
    }
}

function getSwitch() {
    for (let i=0; i < radios.length; i++) {
        if (radios[i].checked)
            return radios[i].value;
    }
}

function main() {
    bindKey();
    bindAudio();
}

main();

