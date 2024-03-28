import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';



const AnonymousMenu = () => {
  return (
    <>
      <Grid item>
        <Button component={NavLink}  to='/register' >Sign up</Button>
        <Button component={NavLink} to='/login'>Log in</Button>
      </Grid>
    </>
  );
};

export default AnonymousMenu;