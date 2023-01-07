import React, { useState, useRef } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "./Audio.css";

const Audio = () => {
  const [isStop, setIsStop] = useState(false);
  const [recordstate, setrecordstate] = useState("NONE");
  const [blobURL, setblobURL] = useState("");
  const [audioData, setAudioData] = useState(null);

  const start = () => {
    setIsStop(false);

    // console.log(recordstate);
    // console.log("start");
    setrecordstate(RecordState.START);
    setblobURL("");
  };

  const stop = () => {
    // console.log("stop");
    setrecordstate(RecordState.STOP);
    setIsStop(true);
  };

  const pause = () => {
    setrecordstate(RecordState.PAUSE);
  }

  const onStop = (audioData: any) => {
    console.log(audioData);
    setblobURL(audioData.url);
  };

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
