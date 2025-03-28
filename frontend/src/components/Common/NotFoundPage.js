// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Auth Pages
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import OAuthCallback from './components/Auth/OAuthCallback';

// Public Pages
import HomePage from './components/Home/HomePage';
import NotFoundPage from './components/Common/NotFoundPage';

// Protected Pages
import ProtectedRoute from './components/Common/ProtectedRoute';
import DashboardPage from './components/Dashboard/DashboardPage';
import WebsitesList from './components/Websites/WebsitesList';
import WebsiteForm from './components/Websites/WebsiteForm';
import WebsiteDetail from './components/Websites/WebsiteDetail';

// Create theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3', // Blue
        },
        secondary: {
            main: '#ff9800', // Orange
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <MainLayout>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/oauth-callback" element={<OAuthCallback />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/websites" element={<WebsitesList />} />
                                <Route path="/websites/new" element={<WebsiteForm isEditing={false} />} />
                                <Route path="/websites/:id" element={<WebsiteDetail />} />
                                <Route path="/websites/:id/edit" element={<WebsiteForm isEditing={true} />} />
                            </Route>

                            {/* 404 Page */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </MainLayout>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;