import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';

const drawerWidth = 240;
const navItems = ['Home'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
    window.location.reload(); 
  };

  const handleProfile = ()=>{
    navigate('/profile');
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BLOGSITE
      </Typography>
      <Divider />
      <List>
        {/* Always show "Home" */}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Home" onClick={() => navigate('/')} />
          </ListItemButton>
        </ListItem>
        {isLoggedIn && (
          <>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Create Blog" onClick={() => navigate('/create-blog')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Profile" onClick={handleProfile} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Logout" onClick={handleLogout} />
          </ListItemButton>
        </ListItem>
        </>
)}

        {/* Add "Login" and "Register" if the user is not logged in */}
        {!isLoggedIn && (
          <>
          <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleRegisterOpen}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLoginOpen}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            
          </>
        )}
        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BLOGSITE
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

          <Button sx={{ color: '#fff' }} onClick={handleHomeClick}>
              Home
            </Button>
            

            {/* Show buttons conditionally based on login state */}
            {!isLoggedIn && (
              <>
                <Button sx={{ color: '#fff' }} onClick={handleLoginOpen}>
                  Login
                </Button>
                <Button sx={{ color: '#fff' }} onClick={handleRegisterOpen}>
                  Register
                </Button>
              </>
            )}

             {/* Show Logout if logged in */}
             {isLoggedIn && (
              <>
              <Button sx={{ color: '#fff' }} onClick={() => navigate('/create-blog')}>
              Create Blog
            </Button>
            <Button sx={{ color: '#fff' }} onClick={handleProfile}>
                Profile
              </Button>
            <Button sx={{ color: '#fff' }} onClick={handleLogout}>
                Logout
              </Button>
            </>
            )}

            
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onClose={handleLoginClose} />

      {/* Register Dialog */}
      <RegisterDialog open={registerOpen} onClose={handleRegisterClose} />
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
