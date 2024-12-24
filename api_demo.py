import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the API key
api_key = os.getenv('api_key')

# Use the API key
print(api_key)  # This will print your API key