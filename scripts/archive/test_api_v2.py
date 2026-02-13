import requests
import json

url = "http://127.0.0.1:5000/predict"
payload = {
  "state": "Assam",
  "month": 7,
  "rainfall": 220,
  "ph": 7.1,
  "bod": 3.0,
  "nitrate": 1.5,
  "temp": 34
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
