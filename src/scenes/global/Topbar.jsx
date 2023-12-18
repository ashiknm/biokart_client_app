import {React, useState, useContext } from "react";
import { useTheme, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

import biokartlogo_black from "../../assets/biokart_logo_black.png";
import biokartlogo_white from "../../assets/biokartlogo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { ColorModeContext, tokens } from "../../theme";


import useLogout from "../../hooks/useLogout";



function Topbar({ fullname }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const logout = useLogout();
  const navigate = useNavigate();


  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const SignOut = async () =>{
    await logout();
    navigate("/login");
  }




  return (
    <Box  style = {{backgroundColor : colors.primary[400]}} >
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <img onClick={()=>navigate("/dashboard")} alt='logo' src = {(theme.palette.mode === "dark") ?biokartlogo_white:biokartlogo_black} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} height='40' width = '60' />
        <Typography
          className="ms-2"
          variant="h4"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: colors.grey[100],
            textDecoration: 'none',
          }}

          onClick={()=>navigate("/dashboard")}

        >
          BIOKART
        </Typography>

        <Box className = 'flex justify-end' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >

<Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
              <Link to="/settings/profile">
                  profile
              </Link>
            </Button>
                    <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
              <Link to="/settings/creditsSettings">
                  settings
              </Link>
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
              <Link to="/settings/help">
               help
             </Link>
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
              <Link to="/settings/notificationSettings">
               notifications
             </Link>
            </Button>

            <Button
              onClick={SignOut}
              sx={{ my: 2, color: '#8057D7', display: 'block' }}
              
            >
              logout
            </Button>
            {/* {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))} */}
          </Menu>
        </Box>
        {/* <img src = {biokartlogo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} height='40' width = '60' /> */}
        {/* <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          BIOKART2
        </Typography> */}
        <Box className = 'flex justify-end' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <IconButton className="me-5"
              onClick={()=>navigate('/settings/profile')}
              // sx={{ my: 2, color: 'black', display: 'block' }}
            >
               {fullname}
              
            </IconButton>

            <IconButton
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
              
            </IconButton>
        <IconButton
              onClick={()=>navigate('/settings/creditsSettings')}
              // sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
               <SettingsIcon  />
            </IconButton>

            <IconButton
              onClick={()=>navigate('/settings/help')}
              // sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
            <ContactSupportIcon />
            </IconButton>

            <IconButton
               onClick={()=>navigate('/settings/notificationSettings')}
              // sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
              <CircleNotificationsIcon />
            </IconButton>

            <IconButton
              onClick={SignOut}
              // sx={{ my: 2, color: '#8057D7', display: 'block' }}
            >
              <LogoutIcon />
            </IconButton>
        </Box>

        {/* <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box> */}
      </Toolbar>
    </Container>
  </Box>
    // <div classNameName="nav justify-between pt-3">
    //   <Link to="/">
    //     <a classNameName="navbar-brand flex justify-content-center align-items-center ms-2">
    //       <img src={biokartlogo} alt="Bootstrap" width="60" height="40" />
    //       <h4 classNameName="h4 ps-2" style={{ color: "#8057D7" }}>
    //         Biokart
    //       </h4>
    //     </a>
    //   </Link>

    //   <ul classNameName=" nav justify-content-end">
    //     <li classNameName="nav-item">
    //       <a classNameName="nav-link active" aria-current="page" href="#">
    //         John Doe
    //       </a>
    //     </li>
    //     <li classNameName="nav-item">
    //       <a classNameName="nav-link" aria-current="page">
    //         <Link to="/settings">
    //           <SettingsIcon />
    //         </Link>{" "}
    //       </a>
    //     </li>
    //     <li classNameName="nav-item">
    //       <a classNameName="nav-link" aria-current="page">
    //         <Link to="/settings/help">
    //           <ContactSupportIcon />
    //         </Link>
    //       </a>
    //     </li>
    //     <li classNameName="nav-item">
    //       <a classNameName="nav-link" aria-current="page">
    //         <Link to="/settings/notificationSettings">
    //           <CircleNotificationsIcon />
    //         </Link>
    //       </a>
    //     </li>
    //     <li classNameName="nav-item">
    //       <a classNameName="nav-link" aria-current="page">
    //         <Link to="/login">
    //           <LogoutIcon />
    //         </Link>
    //       </a>
    //     </li>
    //   </ul>
    // </div>
   
  );
}

export default Topbar;
