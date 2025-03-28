// src/components/Websites/WebsiteForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Typography, Box, Paper, TextField, Button,
    FormControl, InputLabel, Select, MenuItem,
    CircularProgress, FormHelperText, Grid
} from '@mui/material';
import { websiteService } from '../../services/api';

const WebsiteForm = ({ isEditing = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        url: '',
        analytics_type: 'custom',
        analytics_properties: {}
    });

    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchWebsite = async () => {
            if (isEditing && id) {
                try {
                    setLoading(true);
                    const response = await websiteService.getWebsite(id);
                    setFormData(response.data);
                    setError(null);
                } catch (err) {
                    console.error('Error fetching website:', err);
                    setError('Failed to load website data. Please try again.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchWebsite();
    }, [isEditing, id]);

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.url.trim()) {
            errors.url = 'URL is required';
        } else if (!/^https?:\/\/.+/.test(formData.url)) {
            errors.url = 'URL must start with http:// or https://';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when changed
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            if (isEditing) {
                await websiteService.updateWebsite(id, formData);
            } else {
                await websiteService.createWebsite(formData);
            }
            navigate('/websites');
        } catch (err) {
            console.error('Error saving website:', err);
            setError(err.response?.data?.detail || 'Failed to save website. Please try again.');
        } finally {
            setSubmitting(false);
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
            <Typography variant="h4" sx={{ mb: 4 }}>
                {isEditing ? 'Edit Website' : 'Add New Website'}
            </Typography>

            <Paper sx={{ p: 3 }}>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Website Name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="url"
                                label="Website URL"
                                value={formData.url}
                                onChange={handleChange}
                                fullWidth
                                required
                                placeholder="https://example.com"
                                error={!!formErrors.url}
                                helperText={formErrors.url}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="analytics-type-label">Analytics Type</InputLabel>
                                <Select
                                    labelId="analytics-type-label"
                                    name="analytics_type"
                                    value={formData.analytics_type}
                                    onChange={handleChange}
                                    label="Analytics Type"
                                >
                                    <MenuItem value="custom">Custom Analytics</MenuItem>
                                    <MenuItem value="google_analytics">Google Analytics</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                                <FormHelperText>
                                    Select the type of analytics you want to use for this website
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {formData.analytics_type === 'google_analytics' && (
                            <Grid item xs={12}>
                                <TextField
                                    name="analytics_properties.tracking_id"
                                    label="Google Analytics Tracking ID"
                                    value={formData.analytics_properties?.tracking_id || ''}
                                    onChange={(e) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            analytics_properties: {
                                                ...prev.analytics_properties,
                                                tracking_id: e.target.value
                                            }
                                        }));
                                    }}
                                    fullWidth
                                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                                />
                            </Grid>
                        )}

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => navigate('/websites')}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={submitting}
                            >
                                {submitting ? <CircularProgress size={24} /> : (isEditing ? 'Update' : 'Create')}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default WebsiteForm;