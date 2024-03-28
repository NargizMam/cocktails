import {AppBar, Grid, Toolbar, Typography, styled} from '@mui/material';
import {NavLink} from 'react-router-dom';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";

const Link = styled(NavLink)({
    color: "darkgray",
    textDecoration: 'none',
    '&:hover': {
        color: 'dark'
    },
});
const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: '#EEEEEE',
            display: {xs: 'flex'},
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
        }}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <LocalBarIcon sx={{color: "darkgray"}}/>
                    <Typography
                        variant="h5"
                        noWrap
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
