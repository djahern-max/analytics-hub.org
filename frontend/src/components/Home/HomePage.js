// src/components/Home/HomePage.js
import React from 'react';
import {
    Typography, Box, Button, Grid, Card, CardContent,
    CardActions, Container, Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <Box>
            <Paper
                sx={{
                    py: 6,
                    px: 4,
                    mb: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white'
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom>
                        Analytics Hub
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom>
                        Manage analytics across all your websites from one central dashboard
                    </Typography>

                    {!user && (
                        <Box sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/register"
                                color="secondary"
                                size="large"
                                sx={{ mx: 1 }}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/login"
                                color="inherit"
                                size="large"
                                sx={{ mx: 1 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    )}

                    {user && (
                        <Button
                            variant="contained"
                            component={Link}
                            to="/dashboard"
                            color="secondary"
                            size="large"
                            sx={{ mt: 4 }}
                        >
                            Go to Dashboard
                        </Button>
                    )}
                </Container>
            </Paper>

            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
                    Key Features
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    Centralized Dashboard
                                </Typography>
                                <Typography variant="body1">
                                    Monitor analytics from all your websites in one place. Get a unified view of your web traffic and user engagement.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={user ? "/dashboard" : "/register"}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    Multiple Analytics Providers
                                </Typography>
                                <Typography variant="body1">
                                    Connect with Google Analytics or use our lightweight tracking solution. Mix and match based on your needs.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={user ? "/websites" : "/register"}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    Simple Integration
                                </Typography>
                                <Typography variant="body1">
                                    Easy-to-use code snippets for tracking. Just copy and paste the code into your website and you're all set.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={user ? "/websites/new" : "/register"}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;