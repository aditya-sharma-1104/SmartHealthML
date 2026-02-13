import requests
import json

url = "http://127.0.0.1:5000/predict"
# High Risk scenario to trigger alert
payload = {
  "state": "Kerala",
  "month": 8,
  "rainfall": 350,
  "ph": 6.8,
  "bod": 6.2,
  "nitrate": 5.1,
  "temp": 32
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
