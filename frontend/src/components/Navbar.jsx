import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return <Stack
    direction="row"
    alignItems={"center"}
    sx={{ position: 'sticky', background: '#000', top: 0, justifyContent: 'space-around' }}
    spacing={2}>
        <Link to="/" style={{ display:'flex', alignItems: 'center' }}>
            <img src={"puzzle.png"} alt="logo" style={{ height: '50px', width: '60px' }} />
            <div class="header-nav">Puzzle - A Video QA & Video Description App</div>
        </Link>
  </Stack>;
}

export default Navbar