import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return <Stack
    direction="row"
    alignItems={"center"}
    sx={{ position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between' }}
    spacing={2}>
        <Link to="/" style={{ display:'flex', alignItems: 'center' }}>
            <img src={process.env.PUBLIC_URL+ "./puzzle.png"} alt="logo" style={{ height: '50px', width: '60px' }} />
        </Link>
  </Stack>;
}

export default Navbar