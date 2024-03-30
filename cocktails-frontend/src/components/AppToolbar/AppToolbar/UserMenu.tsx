import React, {useState} from 'react';
import {User} from '../../../types';
import {Button, Menu, MenuItem} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useAppDispatch} from '../../../app/hooks.ts';
import {logout} from '../../../features/users/usersThunks.ts';
import {apiURL} from "../../../constants.ts";
import {getCocktailsList} from "../../../features/cocktails/cocktailsThunk.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    let avatar  = apiURL + '/avatars/' + user.avatar;
    if (user.avatar.includes('fixtures')) {
        avatar = apiURL + '/' + user.avatar;
    }

  if(user.googleID){
      avatar = user.avatar;
  }
  const logOuted = async () => {
    await dispatch(logout());
    dispatch(getCocktailsList());
    navigate('/');
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleClick} sx={{ p: 0, mr: 5 }}>
              Hello, {user.displayName}!
              {avatar && (<Avatar alt={user.displayName} src={avatar} />)}
          </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem component={NavLink} to="/new-cocktail">Add new cocktail</MenuItem>
            <MenuItem component={NavLink} to={"/my-cocktails"}>Мои коктейли</MenuItem>
        </Menu>
        <Button onClick={logOuted}>Logout<ExitToAppIcon/>
          </Button>
      </Box>
    </>
  );
};

export default UserMenu;