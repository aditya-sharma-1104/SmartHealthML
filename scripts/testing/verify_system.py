import requests
import json
import time

base_url = "http://127.0.0.1:5000"

def test_surveillance():
    print("--- Testing Prediction & Persistence ---")
    payload = {
        "state": "Maharashtra",
        "month": 7,
        "rainfall": 400,
        "ph": 6.5,
        "bod": 5.5,
        "nitrate": 4.1,
        "temp": 30
    }
    resp = requests.post(f"{base_url}/predict", json=payload)
    print(f"Predict Response: {resp.status_code}")
    print(json.dumps(resp.json(), indent=2))

    print("\n--- Testing Heatmap API ---")
    resp = requests.get(f"{base_url}/heatmap-data")
    print(f"Heatmap Data count: {len(resp.json())}")

    print("\n--- Testing Alerts API ---")
    resp = requests.get(f"{base_url}/alerts")
    alerts = resp.json()
    print(f"Alerts count: {len(alerts)}")
    if alerts:
        print(f"Latest Alert: {alerts[0]['message']}")

    print("\n--- Testing Summary API ---")
    resp = requests.get(f"{base_url}/report-summary")
    print(f"Summary: {json.dumps(resp.json(), indent=2)}")

if __name__ == "__main__":
    time.sleep(2) # Wait for server
    try:
        test_surveillance()
    except Exception as e:
        print(f"Error: {e}")
