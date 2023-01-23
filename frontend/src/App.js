// import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { Feed, VideoQA } from './components';
// import Feed from './components/Feed';
// import VideoQA from './components/VideoQA';

const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: "#000"}}>
                {/* <Navbar /> */}
                <Routes>
                    <Route path="/" exact element={<Feed />} />
                    <Route path="/video/:id" exact element={<VideoQA />} />
                </Routes>
            </Box>
        </BrowserRouter>
    )
};

export default App