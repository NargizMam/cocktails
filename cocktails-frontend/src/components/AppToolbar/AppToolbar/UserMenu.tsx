import React, {useState} from 'react';
import {User} from '../../../types';
import {Button, Menu, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // let avatar = null;
  // if (user.image) {
  //   avatar = apiURL + '/' + user.image;
  // }
  const logOuted = async () => {
    console.log('logout')
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
          <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
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
              <MenuItem onClick={handleClose}>
                <Typography textAlign="center">Все коктейли</Typography>
              </MenuItem>
        </Menu>
        <Button onClick={logOuted}>Logout</Button>
      </Box>
    </>
  );
};

export default UserMenu;