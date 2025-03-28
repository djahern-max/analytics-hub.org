// src/components/Auth/OAuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { fetchUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        const handleAuth = async () => {
            if (token) {
                localStorage.setItem('token', token);
                await fetchUser();
                navigate('/dashboard');
            } else {
                navigate('/login', {
                    state: {
                        error: error || 'Authentication failed. Please try again.'
                    }
                });
            }
        };

        handleAuth();
    }, [searchParams, fetchUser, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh'
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Processing authentication...
            </Typography>
        </Box>
    );
};

export default OAuthCallback;