import React, { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

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

const AVPlayer = (args: AVPlayerProps) => {
  const [playerEvents, setPlayerEvents] = useState({});
  const [isPlaying, setIsPlaying] = useState(false); // handling state of play/pause of player
  const playerRef = React.useRef<ReactPlayer>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  // Handle events
  // useEffect(() => {
  //   divRef.current?.focus();
  //   let events: any = {};

  //   window.removeEventListener("keypress", handleKeypress);
  //   window.addEventListener("keypress", handleKeypress);
  //   console.log(args)
  //   // args.events.forEach((name: string) => {
  //   //   events[name] = (data?: any) => {
  //   //     Streamlit.setComponentValue({
  //   //       name: name,
  //   //       data: data,
  //   //     });
  //   //   };
  //   // });

  //   setPlayerEvents(events);
  // }, [args.events]);

  const onKeyPressHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const handleKeypress = (event: { key: string }) => {
    if (event.key === "p") {
      // Video Play/pause toggle using p letter on keyboard
      onKeyPressHandler();
    }
    if (event.key === "a") {
      // Video needs to pause and frame captured when question is being asked
      setIsPlaying(false);
    }
  };

  return (
    <div ref={divRef} id="container" style={{ height: "400px" }}>
        <ReactPlayer
          ref={playerRef}
          url={args.url}
          width={args.width || undefined}
          height={args.height || undefined}
          playing={isPlaying || undefined}
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
      {/* <StAudioRec /> */}
    </div>
  );
};

export default AVPlayer;
