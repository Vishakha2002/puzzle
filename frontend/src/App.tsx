import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import AVPlayer from './AVPlayer';

function App() {
  const [message, setMessage] = useState({resultStatus: 0, message: ""})
  const [status, setStatus] = useState({})

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setStatus(response.status)
      setMessage(response.data)
      console.log(message)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <div className="App">
        <div>{status === 200 ? 
          <h3>{message.message}</h3>
          :
          <h3>LOADING</h3>}</div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <AVPlayer url="https://www.youtube.com/watch?v=88kd9tVwkH8" />
          </div>
    </div>
  );
}

export default App;
