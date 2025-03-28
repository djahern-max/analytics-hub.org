import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" paragraph>
                    The page you are looking for doesn't exist or has been moved.
                </Typography>
                <Box mt={4}>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Return to Home
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default NotFoundPage;