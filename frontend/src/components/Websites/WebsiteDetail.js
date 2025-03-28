// src/components/Websites/WebsiteDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Typography, Box, Paper, CircularProgress, Button, Grid,
    Card, CardContent, CardHeader, Divider, TextField, IconButton,
    Tooltip, Alert, Snackbar
} from '@mui/material';
import { Edit, Delete, ContentCopy } from '@mui/icons-material';
import { websiteService } from '../../services/api';

const WebsiteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [website, setWebsite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchWebsite = async () => {
            try {
                setLoading(true);
                const response = await websiteService.getWebsite(id);
                setWebsite(response.data);
            } catch (err) {
                console.error('Error fetching website details:', err);
                setError('Failed to load website details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWebsite();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this website?')) {
            try {
                await websiteService.deleteWebsite(id);
                navigate('/websites');
            } catch (err) {
                console.error('Error deleting website:', err);
                setError('Failed to delete website. Please try again.');
            }
        }
    };

    const getTrackingSnippet = () => {
        if (!website) return '';

        return `
      <!-- Analytics Hub Tracking Code -->
      <script>
        (function() {
          var d = document, g = d.createElement('img'), s = d.getElementsByTagName('script')[0];
          g.src = 'https://analytics-hub.org/api/tracking/pixel.gif?site_id=${website.id}&page=' + encodeURIComponent(window.location.pathname);
          g.style.position = 'absolute';
          g.style.width = '1px';
          g.style.height = '1px';
          g.style.top = '-1px';
          g.style.left = '-1px';
          s.parentNode.insertBefore(g, s);
        })();
      </script>
      `;
    };

    const handleCopySnippet = () => {
        navigator.clipboard.writeText(getTrackingSnippet());
        setCopied(true);
    };

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
                    to="/websites"
                    sx={{ mt: 2 }}
                >
                    Back to Websites
                </Button>
            </Box>
        );
    }

    if (!website) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Website not found</Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/websites"
                    sx={{ mt: 2 }}
                >
                    Back to Websites
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">{website.name}</Typography>
                <Box>
                    <Button
                        variant="outlined"
                        component={Link}
                        to={`/websites/${id}/edit`}
                        startIcon={<Edit />}
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Website Information" />
                        <Divider />
                        <CardContent>
                            <Typography variant="subtitle1">Website URL:</Typography>
                            <Typography variant="body1" gutterBottom>
                                <a href={website.url} target="_blank" rel="noopener noreferrer">
                                    {website.url}
                                </a>
                            </Typography>

                            <Typography variant="subtitle1" sx={{ mt: 2 }}>Analytics Type:</Typography>
                            <Typography variant="body1" gutterBottom>
                                {website.analytics_type === 'custom' ? 'Custom Analytics' :
                                    website.analytics_type === 'google_analytics' ? 'Google Analytics' :
                                        website.analytics_type}
                            </Typography>

                            {website.analytics_type === 'google_analytics' && website.analytics_properties?.tracking_id && (
                                <>
                                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Google Analytics ID:</Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {website.analytics_properties.tracking_id}
                                    </Typography>
                                </>
                            )}

                            <Typography variant="subtitle1" sx={{ mt: 2 }}>Created:</Typography>
                            <Typography variant="body1" gutterBottom>
                                {new Date(website.created_at).toLocaleString()}
                            </Typography>

                            {website.updated_at && (
                                <>
                                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Last Updated:</Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {new Date(website.updated_at).toLocaleString()}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {website.analytics_type === 'custom' && (
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Tracking Code" />
                            <Divider />
                            <CardContent>
                                <Typography variant="body2" gutterBottom>
                                    Add this code to your website to enable tracking:
                                </Typography>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={8}
                                    value={getTrackingSnippet()}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <Tooltip title="Copy to clipboard">
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleCopySnippet}
                                                    sx={{ position: 'absolute', top: 8, right: 8 }}
                                                >
                                                    <ContentCopy />
                                                </IconButton>
                                            </Tooltip>
                                        ),
                                    }}
                                    sx={{ mt: 2 }}
                                />

                                <Alert severity="info" sx={{ mt: 2 }}>
                                    Add this tracking code to your website, just before the closing &lt;/body&gt; tag.
                                </Alert>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>

            <Snackbar
                open={copied}
                autoHideDuration={3000}
                onClose={() => setCopied(false)}
                message="Tracking code copied to clipboard"
            />
        </Box>
    );
};

export default WebsiteDetail;