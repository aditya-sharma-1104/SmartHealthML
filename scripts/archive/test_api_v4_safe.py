import requests
import json

url = "http://127.0.0.1:5000/predict"
# Safe scenario: rainfall=10, bod=0.8, nitrate=0.2, temp=18, month=1
payload = {
  "state": "Maharashtra",
  "month": 1,
  "rainfall": 10,
  "ph": 7.0,
  "bod": 0.8,
  "nitrate": 0.2,
  "temp": 18
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
