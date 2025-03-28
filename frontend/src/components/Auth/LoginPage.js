// src/components/Auth/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container, Box, Avatar, Typography, TextField, Button,
    Grid, Link, Divider, Paper
} from '@mui/material';
import { LockOutlined, GitHub, Google } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!email || !password) {
            setFormError('Please fill in all fields');
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    const handleGithubLogin = async () => {
        try {
            const response = await authService.getGithubLoginUrl();
            window.location.href = response.data.authorization_url;
        } catch (err) {
            setFormError('Failed to connect to GitHub');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await authService.getGoogleLoginUrl();
            window.location.href = response.data.authorization_url;
        } catch (err) {
            setFormError('Failed to connect to Google');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {(error || formError) && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error || formError}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Divider sx={{ my: 2 }}>OR</Divider>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<GitHub />}
                                    onClick={handleGithubLogin}
                                    sx={{ mt: 1, mb: 1 }}
                                >
                                    GitHub
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Google />}
                                    onClick={handleGoogleLogin}
                                    sx={{ mt: 1, mb: 1 }}
                                >
                                    Google
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;