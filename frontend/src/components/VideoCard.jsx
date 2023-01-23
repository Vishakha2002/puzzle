import {useEffect, useState} from 'react'
import axios from 'axios'

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const VideoCard = (video) => {
    const [videoMetadata, setvideoMetadata] = useState({});
    const [video_url] = useState(video.video)

    useEffect(() => {
        setvideoMetadata({});

        axios.get('/api/get_yt_details/', {
        params: {
            url: video
        }
        })
        .then(response => {
            console.log(response)
            setvideoMetadata(response.data);
        }).catch(error => {
        console.log(error)
        })

    }, []);

    if (videoMetadata === {}) return <Loader />

    return (
        <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
            <Link to={`/video/${JSON.stringify(video_url)}`}>
            <CardMedia image={videoMetadata.thumbnail_url} sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} />
            <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                    {videoMetadata.video_title}
                </Typography>
            </CardContent>
            </Link>
        </Card>
      );
}

export default VideoCard;