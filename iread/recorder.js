// function 

function tryRecorder() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // 取得麥克風裝置
        const deviceId = navigator.mediaDevices.enumerateDevices()
            .then(devices => devices.find(deviceInfo => deviceInfo.kind === 'audioinput'))
            .then(deviceInfo => console.log('deviceInfo: ', deviceInfo))
            .catch(e => console.error(e))

        // https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
        const contraints = {
            audio: {
                deviceId,
                sampleRate: 4410,
                sampleSize: 16,
            }
        }

        // if (!deviceId) return;

        // 取得麥克風資料
        navigator.mediaDevices.getUserMedia(contraints)
            .then(stream => {
                const options = { mimeType: 'audio/webm' };
                const recordedChunks = [];
                const recorder = new MediaRecorder(stream, options);

                recorder.ondataavailable = e => {
                    console.log("ondataavailable()");
                    if (e.data.size > 0) recordedChunks.push(e.data);
                    // 針對每個 chunk 的處理 ...
                    let record = recordedChunks[recordedChunks.length - 1];
                    console.log('record: ', record);
                    if (recordedChunks.length > 2) {
                        if (recorder.state === "recording") {
                            recorder.stop();
                        }
                    }
                };

                recorder.onstop = () => {
                    // 針對錄製檔案的處理 ...
                    console.log("onstop()");
                };

                recorder.start(3000);
            });
    }
}

let recorder = undefined;
let isRecording = false;
// let recordBtn = document.getElementById("recordBtn");
let recordBtn = document.createElement("button");
recordBtn.setAttribute("id", "recordBtn");
recordBtn.setAttribute("onclick", "pressRecord()");
recordBtn.innerHTML = "●";
// document.getElementById("recorderAudioBlock").append(recordBtn);
document.getElementById("recorderAudioBlock").prepend(recordBtn);

function pressRecord() {
    isRecording = !isRecording;
    if (isRecording === true)
        processStartRecording();
    else
        processStopRecording();
}

function processStartRecording() {
    console.log("processStartRecording()");
    let recordBtn = document.getElementById("recordBtn");
    recordBtn.innerHTML = "■";
    startRecording();
}

function processStopRecording() {
    console.log("processStopRecording()");
    let recordBtn = document.getElementById("recordBtn");
    recordBtn.innerHTML = "●";
    stopRecording();
}

function startRecording() {
    HZRecorder.get(function (rec) {
        recorder = rec;
        recorder.start();
    }, {
        sampleBits: 16,
        sampleRate: 16000
    });
}

function stopRecording() {
    recorder.stop();
    var blob = recorder.getBlob();
    var url = URL.createObjectURL(blob);
    // var div = document.createElement('div');
    // var au = document.createElement('audio');
    // var hf = document.createElement('a');
    // au.controls = true;
    // au.src = url;
    // hf.href = url;
    // hf.download = new Date().toISOString() + '.wav';
    // hf.innerHTML = hf.download;
    // div.appendChild(au);
    // div.appendChild(hf);
    // recordingslist.appendChild(div);
    let recorderAudio = document.getElementById("recorderAudio");
    let recorderAudioSource = document.getElementById("recorderAudioSource");
    recorderAudioSource.src = url;
    recorderAudio.load();
}
function playRecording() {
    recorder.play(audio);
}
function uploadAudio() {
    recorder.upload("Handler1.ashx", function (state, e) {
        switch (state) {
            case 'uploading':
                //var percentComplete = Math.round(e.loaded * 100 / e.total)   '%';
                break;
            case 'ok':
                //alert(e.target.responseText);
                alert("上傳成功");
                break;
            case 'error':
                alert("上傳失敗");
                break;
            case 'cancel':
                alert("上傳被取消");
                break;
        }
    });
}

// startRecording();