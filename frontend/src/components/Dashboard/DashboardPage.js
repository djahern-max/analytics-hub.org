// src/components/Dashboard/DashboardPage.js
import React, { useState, useEffect } from 'react';
import {
    Typography, Grid, Paper, Box, CircularProgress,
    Button, Card, CardContent, CardHeader
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setLoading(true);
                const response = await dashboardService.getSummary();
                setSummary(response.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography color="error" variant="h6">{error}</Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/websites/new"
                    startIcon={<Add />}
                    sx={{ mt: 2 }}
                >
                    Add New Website
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Analytics Dashboard</Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/websites/new"
                    startIcon={<Add />}
                >
                    Add New Website
                </Button>
            </Box>

            {summary?.total_websites === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Welcome to Analytics Hub!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        You haven't added any websites yet. Get started by adding your first website.
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/websites/new"
                        startIcon={<Add />}
                    >
                        Add New Website
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Websites Overview
                            </Typography>
                            <Typography variant="body1">
                                Total Websites: {summary?.total_websites || 0}
                            </Typography>
                        </Paper>
                    </Grid>

                    {summary?.websites_data.map((website) => (
                        <Grid item xs={12} md={6} key={website.id}>
                            <Card>
                                <CardHeader
                                    title={website.name}
                                    subheader={website.url}
                                    action={
                                        <Button
                                            size="small"
                                            component={Link}
                                            to={`/websites/${website.id}`}
                                        >
                                            Details
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    {website.analytics_type === 'custom' ? (
                                        <>
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2">
                                                    Total Visits: {website.total_visits || 0}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Unique Visitors: {website.unique_visitors || 0}
                                                </Typography>
                                            </Box>

                                            {website.top_pages && website.top_pages.length > 0 && (
                                                <Box>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Top Pages
                                                    </Typography>
                                                    {website.top_pages.map((page, index) => (
                                                        <Typography key={index} variant="body2" noWrap>
                                                            {index + 1}. {page.page || '/'} ({page.count} visits)
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            )}
                                        </>
                                    ) : (
                                        <Typography>
                                            {website.message || 'External analytics integration'}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default DashboardPage;