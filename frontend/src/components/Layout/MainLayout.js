// src/components/Layout/MainLayout.js
import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                {children}
            </Container>
        </Box>
    );
};

export default MainLayout;