import React, { useState, useRef } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "./Audio.css";
import axios from 'axios';

const Audio = () => {
  const [isStop, setIsStop] = useState(false);
  const [recordstate, setrecordstate] = useState("NONE");
  const [blobURL, setblobURL] = useState("");
  const [blobURLResponse, setblobURLResponse] = useState("");
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

  const transcribe = () => {
    axios.get('/api/trascribe')
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  const showLoadingMessage = () => {
    setTimeout(() => {
      // Show loading after 5 seconds and call transcribe api after
      setblobURLResponse("Loading Data...")

      setTimeout(() => {
        callTranscribeAPI();
      }, 5000)
    }, 5000)
  }

  const callTranscribeAPI = () => {
    axios.get('/api/trascribe_question').then(response => {
      console.log(response)
      // Update the same Text on screen to show the transcribed Response
      const blobResponse = response.data["text"]
      setblobURLResponse(blobResponse)
    }).catch(error => {
      console.log(error)
    })
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
    })
    .then((response) => {
      console.log(response)
      // Response from blob api
      const blobResponse = response.data["text"]
      setblobURLResponse(blobResponse)

      // This function firsts shows Loading message and calls transcribe API as well
      showLoadingMessage();
    })
    .catch((error:any) => {
      console.log(error)
    })
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
          <div style={{alignItems:'center', marginTop: '5px'}}>
            {blobURLResponse !== "" ? 
            <div>
              <h5>{blobURLResponse}</h5>
            </div>
            : <div></div>}
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
