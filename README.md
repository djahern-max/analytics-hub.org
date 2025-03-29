Analytics Hub
Analytics Hub is a privacy-focused web analytics platform with AI-powered insights. This solution provides website owners with meaningful traffic analysis without compromising visitor privacy.
Overview
Analytics Hub offers an alternative to traditional analytics dashboards by leveraging artificial intelligence to analyze website traffic patterns and provide actionable insights. Rather than presenting raw data, Analytics Hub interprets your traffic data and presents recommendations to improve your website performance.
Features

Privacy-First Analytics: Collect essential metrics without personally identifying information
AI-Powered Insights: Get actionable recommendations based on traffic patterns
Lightweight Tracking: Minimal impact on website performance
Simple Integration: Easy to add to any website with a single script
Self-Hosted Option: Full control over your analytics data

Technology Stack

Backend: Python, FastAPI
Database: PostgreSQL
Frontend: React, CSS Modules
Deployment: Nginx, Gunicorn, Ubuntu

Installation
Server Requirements

Ubuntu 20.04 LTS or newer
PostgreSQL 12 or newer
Python 3.8 or newer
Node.js 14 or newer

Database Setup

Connect to your PostgreSQL instance:
bashCopysudo -u postgres psql -d analytics_hub

Current database schema:
Copyanalytics_hub=# \dt
              List of relations
 Schema |      Name       | Type  |  Owner
--------+-----------------+-------+----------
 public | alembic_version | table | postgres
 public | tracking_events | table | postgres
 public | users           | table | postgres
 public | websites        | table | postgres


Server Configuration
Service Setup
The application runs as a systemd service:
iniCopy[Unit]
Description=Analytics Hub FastAPI Application
After=network.target postgresql.service

[Service]
User=analytics-user
Group=analytics-user
WorkingDirectory=/var/www/analytics-hub/backend
ExecStart=/var/www/analytics-hub/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000 --access-logfile /var/log/analytics-hub/access.log --error-logfile /var/log/analytics-hub/error.log
Restart=always
RestartSec=5
EnvironmentFile=/var/www/analytics-hub/backend/.env

[Install]
WantedBy=multi-user.target
Service Management
bashCopy# Check service status
sudo systemctl status analytics-hub

# Start the service
sudo systemctl start analytics-hub

# Stop the service
sudo systemctl stop analytics-hub

# Restart the service
sudo systemctl restart analytics-hub
Web Server Configuration
The application is served through Nginx:
bashCopy# Edit Nginx configuration
sudo nano /etc/nginx/sites-available/analytics-hub.conf

# Test Nginx configuration
sudo nginx -t

# Reload Nginx to apply changes
sudo systemctl reload nginx
Deployment
Deploy frontend changes:
bashCopy# Navigate to project directory
cd /var/www/analytics-hub

# Run deployment script
sudo ./deploy.sh
Troubleshooting
Check application logs:
bashCopy# Nginx error logs
sudo cat /var/log/nginx/error.log

# Nginx access logs
sudo cat /var/log/nginx/access.log

# Application logs
sudo cat /var/log/analytics-hub/error.log
sudo cat /var/log/analytics-hub/access.log
Development
Local Setup

Clone the repository
Install dependencies
Set up local database:
bashCopypsql -U postgres -d analytics_hub

Run development server

tree -I 'node_modules|build|dist|.git|.next|coverage' -P '*.jsx|*.tsx|*.js|*.ts' ./src

tree -I 'node_modules|build|dist|.git|.next|coverage|venv|__pycache__' -P '*.py' .tree -I 'node_modules|build|dist|.git|.next|coverage|venv|__pycache__' -P '*.py' .

source venv_new/bin/activate
uvicorn app.main:app --reload


