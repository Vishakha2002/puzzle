import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import AVPlayer from './AVPlayer';

function App() {
  const [message, setMessage] = useState({resultStatus: 0, message: ""})
  const [status, setStatus] = useState({})
  const [testMessage, setTestMessage] = useState({resultStatus: "", message: ""})
  const events = [
    "onStart", "onPlay", "onProgress", "onDuration", "onPause",
    "onBuffer", "onBufferEnd", "onSeek", "onEnded", "onError"
  ]
  const [videoURL, setVideoURL] = useState("")
  const [videoURLs, setVideoURLs] = useState([])
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

    axios.get('/api/yturls?type=online').then(response => {
      let data = response.data
      console.log(data)
      let videoURLArray = data['url'][0]
      console.log(data)
      setVideoURLs(videoURLArray);
      setVideoURL(videoURLArray[0])
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setVideoURL(e.target.value)
  };
  
  // const loadLocalVideo = () => {
  //   setVideoURL('videos/dummy.mp4')
  // };

  return (
    <div className="App">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20px', marginBottom: '25px', marginTop: '25px'}}>{status === 200 ? 
          <h3>{message.message}</h3>
          :
          <h3>LOADING</h3>}</div>
          <div id="outer">
            <div className="inner">
            <h5>Select a Video from List of Urls or Use Load Video button to play a local video</h5>
            </div>
            {/* <div className="inner">
              <button style={{width:'130px'}} onClick={loadLocalVideo}>
                Local Video
              </button>
            </div> */}
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
