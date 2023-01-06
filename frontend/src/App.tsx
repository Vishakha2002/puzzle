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
  let options = {
    "events": events,
    "progress_interval": 1000
  }
  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/hello').then(response => {
      console.log("SUCCESS", response)
      setStatus(response.status)
      setMessage(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const testApi = () => {
    axios.get('http://127.0.0.1:5000/test').then(response => {
      console.log("SUCCESS", response)
      setTestMessage(response.data)
    }).catch(error => {
      console.log(error)
    })
  };

  return (
    <div className="App">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20px', marginBottom: '25px', marginTop: '25px'}}>{status === 200 ? 
          <h3>{message.message}</h3>
          :
          <h3>LOADING</h3>}</div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20px', marginBottom: '25px', marginTop: '25px'}}>
            <button onClick={testApi}>Test</button>
            {testMessage.resultStatus === "SUCCESS" ?  <h5 style={{marginLeft: '5px'}}>{testMessage.message}</h5> : <h5 style={{marginLeft: '5px'}}>Click Test Button to Check Connection</h5>}
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '25px'}}>
            <AVPlayer url="https://www.youtube.com/watch?v=88kd9tVwkH8" playing={false} {...options}/>
          </div>
    </div>
  );
}

export default App;
