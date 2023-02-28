import React, { useState, useEffect } from 'react'
import { Stack, Box } from "@mui/material";
import { Loader, VideoCard, VideoCardLocal } from "./";

const Videos = ({ videos, direction, feedType}) => {
  const [isOnline, setIsOnline] = useState(true);

  console.log(feedType)

  useEffect(() => {
    if(feedType === "online"){
      setIsOnline(true)
    } else{
      setIsOnline(false)
    }
  }, []);

  if(!videos?.length) return <Loader />;
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {isOnline ? <VideoCard video={item} videoFeedType={feedType}/> : <VideoCardLocal video={item}/>}
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;