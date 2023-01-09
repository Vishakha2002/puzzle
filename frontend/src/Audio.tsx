import React, { useState, useRef } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "./Audio.css";
import axios from 'axios';

const Audio = () => {
  const [isStop, setIsStop] = useState(false);
  const [recordstate, setrecordstate] = useState("NONE");
  const [blobURL, setblobURL] = useState("");
  const [audioData, setAudioData] = useState(null);
  
  const start = () => {
    setIsStop(false);
    setrecordstate(RecordState.START);
    setblobURL("");
  };

  const stop = () => {
    setrecordstate(RecordState.STOP);
    setIsStop(true);
  };

  const pause = () => {
    setrecordstate(RecordState.PAUSE);
  }

  function download(content: Blob, fileName: string, contentType: string) {
    // Download to device in downloads folder
    var a = document.createElement("a");
    var file = content
    a.href = URL.createObjectURL(file);
    a.download = Date.now().toString() + ".wav";
    a.click();
  }
  
  const onStop = (audioData: any) => {
    console.log(audioData);
    setAudioData(audioData)
    setblobURL(audioData.url);

    const data = new FormData();
    data.append('file', audioData.blob);

    axios({
      method: "post",
      url: "/api/receive_blob",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).catch((error:any) => {
      console.log(error)
    })
    // download(audioData.blob, "test.wav", audioData.type)
  };

  const handleKeypress = (event: { key: string }) => {
    if (event.key === "a") {
      // start audio recording
      start();
    }
    if (event.key === "f") {
      // stop audio recording and hide component as well
      stop();
    }
    if (event.key === "p") {
      // stop audio recording and hide component as well
      stop();
    }
  };

  window.removeEventListener("keypress", handleKeypress);
  window.addEventListener("keypress", handleKeypress);

  return (
      <span>
        <div>
          <div id="outer">
            <div className="inner">
              <button id="record" style={{width:'130px'}} onClick={start}>
                Click to Ask!
              </button>
            </div>
            <div className="inner">
              <button id="stop" style={{width:'130px'}}onClick={stop}>
                Fetch response!
              </button>
            </div>
          </div>
          {/* <div style={{alignItems:'center', marginTop: '5px'}}>
            {blobURL !== "" ? <audio
            id='audio'
            controls
            src={blobURL}
            ></audio> : <div></div>}
          </div> */}
          <div style={{alignItems:'center'}}>
            <AudioReactRecorder
              state={recordstate}
              onStop={onStop}
              type="audio/wav"
              backgroundColor="rgb(255, 255, 255)"
              foregroundColor="rgb(255,76,75)"
              canvasWidth={450}
              canvasHeight={100}
            />
          </div>
        </div>
      </span>
  );
}
export default Audio;
