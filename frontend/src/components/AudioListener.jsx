import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./Audio.css"

const AudioListener = () => {
 const [message, setMessage] = useState('');
 const commands = [] // can be used to return trained responses if we want, otherwise kept blank
 const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition({ commands });

 const listenContinuously = () => {
  SpeechRecognition.startListening({
    continuous: true,
    language: 'en-GB',
  });
};

 const handleKeypress = event => {
    if (event.key === "a") {
      // start audio recording
      resetTranscript()
      listenContinuously()
    }
    if (event.key === "s") {
      // stop audio recording
      SpeechRecognition.stopListening()
    }
    if (event.key === "p") {
      // stop audio recording and hide component as well
      SpeechRecognition.stopListening()
    }
  }

  window.removeEventListener("keypress", handleKeypress)
  window.addEventListener("keypress", handleKeypress)

 useEffect(() => {
   if (finalTranscript !== '') {
        // Make API Call to backend here with user Query using finalTranscript
        console.log('User Query->', finalTranscript);

        // Uncomment this code for API call
        // axios.post('/api/trigger_model', {
        //   question: finalTranscript}, {
        //   headers: "Content-Type: application/json"}
        // ).then(response => {
        //   updateModelLoadingInProgress()
        //   console.log(response)
        //   setModelResponse("Your answer is: " + response.data["answer"])
        // }).catch(error => {
        //   console.log(error)
        // })

        // Resetting User Query(finalTranscript) after API call
        resetTranscript()
   }
 }, [interimTranscript, finalTranscript]);
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }
 
 return (
    <div id="outer">
     <div className="inner">
       <div>
          <button type="button" onClick={listenContinuously}>Ask</button>
          <button type="button" onClick={resetTranscript}>Reset</button>
       </div>
     </div>
     <div className="inner">
       <span className='spanColor'>{transcript}</span>
     </div>
   </div>
 );
};

export default AudioListener;