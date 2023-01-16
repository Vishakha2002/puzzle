import React, { useEffect, useState, useCallback } from "react";

import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import Audio from './Audio';
import "audio-react-recorder/dist/index.css";

export interface AVPlayerProps {
  url?: string
  playing?: boolean
  loop?: boolean
  controls?: boolean
  volume?: number
  muted?: boolean
  playbackRate?: number
  width?: string | number
  height?: number
  progressInterval?: number
  playsinline?: boolean
  previewTabIndex?: number | null
  pip?: boolean
  stopOnUnmount?: boolean
  light?: boolean
  onReady?: (player: ReactPlayer) => void
  onStart?: () => void
  onPlay?: () => void
  onPause?: () => void
  onBuffer?: () => void
  onBufferEnd?: () => void
  onEnded?: () => void
  onClickPreview?: (event: any) => void
  onEnablePIP?: () => void
  onDisablePIP?: () => void
  onError?: (
    error: any,
    data?: any,
    hlsInstance?: any,
    hlsGlobal?: any
  ) => void
  onDuration?: (duration: number) => void
  onSeek?: (seconds: number) => void
  onProgress?: (state: OnProgressProps) => void
  [otherProps: string]: any
}


// // it might be a project-level reusable hook
// const usePlayer = (initialState: boolean) => {
//   const [isPlaying, setIsPlaying] = useState(initialState);
//   const isPlayingRef = React.useRef(isPlaying);

//   // put [isToggledRef, setIsToggled] into the useCallback's dependencies array
//   // these values never change so the calllback is not going to be ever re-created
//   const toggle = React.useCallback(
//     () => setIsPlaying(!isPlayingRef.current),
//     [isPlayingRef, setIsPlaying],
//   );

//   // keep the value in isToggledRef actual
//   // when isToggled changes, isToggledRef is updated accordingly
//   useEffect(
//     () => {
//       isPlayingRef.current = isPlaying;
//     },
//     [isPlaying],
//   );

//   return [isPlaying, toggle];
// }


const AVPlayer = (args: AVPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(args.playing); // handling state of play/pause of player
  // const [isPlaying, setIsPlaying] = usePlayer(false)
  const playerRef = React.useRef<ReactPlayer>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  // Handle events
  useEffect(() => {
    divRef.current?.focus();

    window.removeEventListener("keypress", handleKeypress);
    window.addEventListener("keypress", handleKeypress);
    console.log(args)
  }, []);

  // const onKeyPressHandler = () => {
  //   console.log("Vishakha isplaying before mutation")
  //   console.log(isPlaying)
  //   setIsPlaying(!isPlaying);
  //   console.log("Vishakha isplaying after mutation")
  //   console.log(isPlaying)
  // };
  const onKeyPressHandler = useCallback(
    () => setIsPlaying(isPlaying => !isPlaying),
    [setIsPlaying],
  );


  const handleKeypress = (event: { key: string }) => {
    // console.log(isPlaying)
    if (event.key === "p") {
      // Video Play/pause toggle using p letter on keyboard
      // console.log("Vishakha Key p is pressed")
      onKeyPressHandler();
      // console.log("Vishakha after p is pressed value is")
      // console.log(isPlaying)

    }
    if (event.key === "a") {
      // Video needs to pause and frame captured when question is being asked
      setIsPlaying(false);
    }
  };

  const onVideoPlay = () => {
    console.log("Vishakha inside onVideoPlay and value of isPlaying is")
    console.log(isPlaying)
  };

  const onVideoPause = () => {
    console.log("Vishakha inside onVideoPause  and value of isPlaying is")
    console.log(isPlaying)
  };

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
  );
};

export default AVPlayer;
