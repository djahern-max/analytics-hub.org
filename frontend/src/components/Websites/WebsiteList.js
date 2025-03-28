// src/components/Websites/WebsitesList.js
import React, { useState, useEffect } from 'react';
import {
    Typography, Button, Box, CircularProgress, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { websiteService } from '../../services/api';

const WebsitesList = () => {
    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWebsites = async () => {
        try {
            setLoading(true);
            const response = await websiteService.getWebsites();
            setWebsites(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching websites:', err);
            setError('Failed to load websites. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebsites();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this website?')) {
            try {
                await websiteService.deleteWebsite(id);
                // Refresh the list
                fetchWebsites();
            } catch (err) {
                console.error('Error deleting website:', err);
                setError('Failed to delete website. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">My Websites</Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/websites/new"
                    startIcon={<Add />}
                >
                    Add New Website
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {websites.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        No websites found
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Analytics Type</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {websites.map((website) => (
                                <TableRow key={website.id}>
                                    <TableCell>{website.name}</TableCell>
                                    <TableCell>
                                        <a href={website.url} target="_blank" rel="noopener noreferrer">
                                            {website.url}
                                        </a>
                                    </TableCell>
                                    <TableCell>{website.analytics_type}</TableCell>
                                    <TableCell>
                                        {new Date(website.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Tooltip title="View Details">
                                                <IconButton
                                                    component={Link}
                                                    to={`/websites/${website.id}`}
                                                    color="primary"
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    component={Link}
                                                    to={`/websites/${website.id}/edit`}
                                                    color="primary"
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(website.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default WebsitesList;