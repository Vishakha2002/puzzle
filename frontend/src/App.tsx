import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios'
import AVPlayer from './AVPlayer';

function App() {
  let video_type = "online"
  const [message, setMessage] = useState({resultStatus: 0, message: ""})
  const [status, setStatus] = useState({})
  // const [testMessage, setTestMessage] = useState({resultStatus: "", message: ""})
  const events = [
    "onStart", "onPlay", "onProgress", "onDuration", "onPause",
    "onBuffer", "onBufferEnd", "onSeek", "onEnded", "onError"
  ]
  const [videoURL, setVideoURL] = useState("")
  const [videoURLs, setVideoURLs] = useState([])
  const [useLocalVideo, setUseLocalVideo] = useState(false)
  let options = {
    "events": events,
    "progress_interval": 1000
  }

  useEffect(()=>{
    axios.get('/api/hello').then(response => {
      console.log("SUCCESS", response)
      setStatus(response.status)
      setMessage(response.data)
    }).catch(error => {
      console.log(error)
    })
    if (useLocalVideo){
      video_type = "local"
    }

    axios.get('/api/yturls', {
      params: {
        type: video_type
      }
    })
    .then(response => {
      let data = response.data
      // console.log(data)
      let videoURLArray = data['url'][0]
      // console.log(data)
      setVideoURLs(videoURLArray);
      setVideoURL(videoURLArray[0])
    }).catch(error => {
      console.log(error)
    })
  }, [useLocalVideo])

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setVideoURL(e.target.value);
    axios.get('/api/trigger_preprocessing', {
      params: {
        yt_url: e.target.value
      }
    }).then(response => {
      console.log("Successfully triggered video pre-processing", response)
    }).catch(error => {
      console.log(error)
    })
  };

  const handleUseLocalVideonChange = useCallback(
    () => setUseLocalVideo(useLocalVideo => !useLocalVideo),
    [setUseLocalVideo],
  );

  return (
    <div className="App">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20px', marginBottom: '25px', marginTop: '25px'}}>{status === 200 ? 
          <h3>{message.message}</h3>
          :
          <h3>LOADING</h3>}</div>
          <div id="outer">
            {/* <div className="inner">
              <label>
                <input
                  type="checkbox"
                  checked={useLocalVideo}
                  onChange={handleUseLocalVideonChange}
                />
                <span>Check to use Downloaded videos instead of Youtube Urls</span>
              </label>
            </div> */}
            {/* <p>Is "My Value" checked? {useLocalVideo.toString()}</p> */}
          </div>
          <div>
            <select
              defaultValue={videoURL}
              onChange={handleChange}>
              {videoURLs.map((user) => {
                return <option>{user}</option>;
              })}
            </select>
            </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '25px'}}>
            <AVPlayer url={videoURL} playing={false} {...options} controls = {true}/>
          </div>
    </div>
  );
}

export default App;
