import React, { useState, useCallback } from "react"
import AudioReactRecorder, { RecordState } from "audio-react-recorder"
import PulseLoader from "react-spinners/PulseLoader"
import "./Audio.css"
import axios from "axios"

const Audio = () => {
  // const [isStop, setIsStop] = useState(false);
  const [recordstate, setrecordstate] = useState("NONE")
  // const [blobURL, setblobURL] = useState("");
  const [blobURLResponse, setblobURLResponse] = useState("")
  // const [audioData, setAudioData] = useState(null);
  const [loadingInProgress, setLoadingInProgress] = useState(false)

  // const pause = () => {
  //   setrecordstate(RecordState.PAUSE)
  // }

  const updateLoadingInProgress = useCallback(
    () => setLoadingInProgress(loadingInProgress => !loadingInProgress),
    [setLoadingInProgress]
  )

  const setRecorderStateToStop = useCallback(
    () => {
      setrecordstate(RecordState.STOP)
      setblobURLResponse("")
      // setIsStop(true);
    }, // [setIsStop, setrecordstate, setblobURL],
    [setrecordstate, setblobURLResponse]
  )

  const setRecorderStateToStart = useCallback(
    () => {
      // setIsStop(false);
      setrecordstate(RecordState.START)
      // setblobURL("");
      setblobURLResponse("")
    }, // [setIsStop, setrecordstate, setblobURL, setblobURLResponse],
    [setrecordstate, setblobURLResponse]
  )
  // const showLoadingMessage = () => {
  //   setTimeout(() => {
  //     // Show loading after 5 seconds and call transcribe api after
  //     setblobURLResponse("Loading Data...")

  //     setTimeout(() => {
  //       callTranscribeAPI();
  //     }, 5000)
  //   }, 5000)
  // }

  // const callTranscribeAPI = () => {
  //   axios.get('/api/trascribe_question').then(response => {
  //     console.log(response)
  //     // Update the same Text on screen to show the transcribed Response
  //     const blobResponse = response.data["text"]
  //     setblobURLResponse("Your question was: "+blobResponse)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

  const onStop = audioData => {
    // console.log(audioData);
    // setAudioData(audioData)
    // setblobURL(audioData.url);

    const data = new FormData()
    data.append("file", audioData.blob)
    updateLoadingInProgress()

    axios({
      method: "post",
      url: "/api/transcribe_question",
      data: data,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        setRecorderStateToStop()
        console.log(response)
        // Response from blob api
        const blobResponse = response.data["text"]
        setblobURLResponse("Your question is: " + blobResponse)
        updateLoadingInProgress()

        // This function firsts shows Loading message and calls transcribe API as well
        // start();
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleKeypress = event => {
    if (event.key === "a") {
      // start audio recording
      setRecorderStateToStart()
    }
    if (event.key === "f") {
      // stop audio recording and hide component as well
      setRecorderStateToStop()
    }
    if (event.key === "p") {
      // stop audio recording and hide component as well
      setRecorderStateToStop()
    }
  }

  window.removeEventListener("keypress", handleKeypress)
  window.addEventListener("keypress", handleKeypress)

  return (
    <span>
      <div>
        <div id="outer">
          <div className="inner">
            <button
              id="record"
              style={{ width: "130px" }}
              onClick={setRecorderStateToStart}
            >
              Click to Ask!
            </button>
          </div>
          <div className="inner">
            <button
              id="stop"
              style={{ width: "130px" }}
              onClick={setRecorderStateToStop}
            >
              Fetch response!
            </button>
          </div>
        </div>
        <div style={{ alignItems: "center", marginTop: "5px" }}>
          {blobURLResponse !== "" ? (
            <div>
              <h5>{blobURLResponse}</h5>
            </div>
          ) : (
            <div>
              <PulseLoader color="#36d7b7" loading={loadingInProgress} />
            </div>
          )}
        </div>
        <div style={{ alignItems: "center" }}>
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
  )
}
export default Audio
