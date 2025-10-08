import requests
import json

# Test getting all products
try:
    response = requests.get('http://localhost:3000/api/products')
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")