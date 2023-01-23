// import "./App.css"
import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import AVPlayer from "./AVPlayer"
import { useParams } from "react-router-dom"
import { Typography, Box, Stack } from "@mui/material";

const VideoQA = () => {

  const { id } = useParams();
  console.log(id)

  return (
    <Box minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row" }}>
        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
        {id}
        </Typography>
        </Stack>
    </Box>
  )
}

export default VideoQA