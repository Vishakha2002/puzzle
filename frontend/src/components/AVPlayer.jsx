import React, { useEffect, useState, useCallback } from "react"

import ReactPlayer from "react-player"
import Audio from "./Audio"

const AVPlayer = args => {
  const [isPlaying, setIsPlaying] = useState(args.playing) // handling state of play/pause of player
  const playerRef = React.useRef(null)
  const divRef = React.useRef(null)

  // Handle events
  useEffect(() => {
    divRef.current?.focus()

    window.removeEventListener("keypress", handleKeypress)
    window.addEventListener("keypress", handleKeypress)
    console.log(args)
  }, [])

  const onKeyPressHandler = useCallback(
    () => setIsPlaying(isPlaying => !isPlaying),
    [setIsPlaying]
  )

  const handleKeypress = event => {
    if (event.key === "p") {
      onKeyPressHandler()
    }
    if (event.key === "a") {
      // Video needs to pause and frame captured when question is being asked
      setIsPlaying(false)
    }
  }

  const onVideoPlay = () => {
    console.log("Inside onVideoPlay and value of isPlaying is")
    console.log(isPlaying)
  }

  const onVideoPause = () => {
    console.log("Inside onVideoPause  and value of isPlaying is")
    console.log(isPlaying)
  }

  return (
    <div ref={divRef} id="container" style={{ height: "400px" }}>
      <ReactPlayer
        ref={playerRef}
        url={args.url}
        onPlay={onVideoPlay}
        onPause={onVideoPause}
        width={args.width || undefined}
        height={args.height || undefined}
        playing={isPlaying || false}
        loop={args.loop || undefined}
        controls={args.controls || undefined}
        light={args.light || undefined}
        volume={args.volume}
        muted={args.muted || undefined}
        playbackRate={args.playbackRate}
        progressInterval={args.progressInterval}
        playsinline={args.playInline || undefined}
        config={args.config || undefined}
      />
      <br></br>
      <Audio />
    </div>
  )
}

export default AVPlayer
