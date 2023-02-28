import {useEffect, useState} from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
// import Loader from './Loader';
import { useNavigate } from "react-router-dom"

const VideoCardLocal = ({video}) => {
    console.log(video)
    const [videoMetadata, setvideoMetadata] = useState({});
    const [video_url] = useState(video)
    const navigate = useNavigate();

    function onVideoCardClick(id) {
        console.log(video_url)
        var video_id = video_url.split('/')[1];
        console.log(video_id)
        navigate('/avplayerlocal/' + video_id);
    }

    return (
        <Card onClick={onVideoCardClick} sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
            <CardMedia image={"puzzle.png"} sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} />
            <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                    local Video
                </Typography>
            </CardContent>
        </Card>
      );
}

export default VideoCardLocal;