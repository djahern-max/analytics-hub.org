// src/components/Layout/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../config';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                    {config.appTitle}
                </Typography>

                {user ? (
                    <>
                        <Button color="inherit" component={RouterLink} to="/dashboard">
                            Dashboard
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/websites">
                            My Websites
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="subtitle1" sx={{ mr: 2 }}>
                            {user.email}
                        </Typography>
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;