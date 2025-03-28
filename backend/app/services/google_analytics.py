from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import json

class GoogleAnalyticsService:
    def __init__(self, credentials_json):
        """Initialize service with user credentials"""
        self.credentials = Credentials.from_authorized_user_info(
            info=json.loads(credentials_json) if isinstance(credentials_json, str) else credentials_json
        )
        
    def get_properties(self):
        """Get all GA4 properties for the authenticated user"""
        try:
            analytics = build('analyticsadmin', 'v1beta', credentials=self.credentials)
            response = analytics.properties().list().execute()
            return response.get('properties', [])
        except HttpError as error:
            print(f"An error occurred: {error}")
            return []
            
    def get_property_metrics(self, property_id, date_range):
        """Get key metrics for a specific property"""
        try:
            analytics = build('analyticsdata', 'v1beta', credentials=self.credentials)
            response = analytics.properties().runReport(
                property=f"properties/{property_id}",
                body={
                    "dateRanges": [date_range],
                    "metrics": [
                        {"name": "activeUsers"},
                        {"name": "screenPageViews"},
                        {"name": "sessions"},
                        {"name": "bounceRate"}
                    ]
                }
            ).execute()
            return response
        except HttpError as error:
            print(f"An error occurred: {error}")
            return {}
