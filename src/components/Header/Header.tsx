import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import T_Logo  from './../../assets/images/T-systems_small.png'

const Header: React.FC = () => {
  return (
    <AppBar position="static" style={{backgroundColor: '#E20074', marginBottom:'20px'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            T Products
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Avatar alt="User Avatar" src={T_Logo} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
