let recorderAudio = (function() {
    const audioBlock = document.getElementById("recorderAudioBlock");

    const audio = document.createElement("audio");
    const source = document.createElement("source");
    const audioErrDes = document.createElement("span");

    // source.setAttribute("src", "./02.wav")
    source.setAttribute("type", "audio/wav");
    source.setAttribute("id", "recorderAudioSource")
    audio.appendChild(source);
    audioErrDes.innerText = "瀏覽器不支援，播放器無法正常啟用";
    audio.appendChild(audioErrDes);

    audio.setAttribute("id", "recorderAudio")
    audio.setAttribute("controls", "");
    audio.load();
    audioBlock.appendChild(audio);

    return audio;
})();