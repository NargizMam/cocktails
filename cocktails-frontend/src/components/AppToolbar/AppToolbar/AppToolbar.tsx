import {AppBar, Grid, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";

const Link = styled(NavLink)({
    color: "darkgray",
    textDecoration: 'none',
    '&:hover': {
        color: 'dark'
    },
});
const AppToolbar = () => {

    return (
        <AppBar position="sticky" sx={{mb: 2, backgroundColor: '#EEEEEE'}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <LocalBarIcon sx={{color: "darkgray"}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/">Cocktails</Link>
                    </Typography>
                    {user ? (
                        <UserMenu user={user}/>
                    ) : <AnonymousMenu/>}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
