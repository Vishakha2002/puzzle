import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return <Stack
    direction="row"
    alignItems={"center"}
    sx={{ position: 'sticky', background: '#000', top: 0, justifyContent: 'space-around' }}
    spacing={2}>
        <Link to="/" style={{ display:'flex', alignItems: 'center' }}>
            <img src={process.env.PUBLIC_URL+ "./puzzle.png"} alt="logo" style={{ height: '50px', width: '60px' }} />
            <div class="header-nav">Puzzle - A Video QA & Video Description App</div>
        </Link>
        {/* <Box component="span" sx={{ p: 2, backgroundColor: 'white', overflowY: "auto", height: { sx: "auto", md: "95%" },}}>yo</Box> */}
  </Stack>;
}

export default Navbar