// import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { Feed, AVPlayer, Placeholder, Navbar, AVPlayerLocal } from './components';


const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: "#000"}}>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Feed />} />
                    <Route path="/avplayer/:id" exact element={<AVPlayer />} />
                    <Route path="/avplayerlocal/:id" exact element={<AVPlayerLocal />} />
                    <Route path="/placeholder" exact element={<Placeholder />} />
                </Routes>
            </Box>
        </BrowserRouter>
    )
};

export default App