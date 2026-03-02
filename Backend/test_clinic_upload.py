import requests
import os

def test_upload():
    url = "http://localhost:5000/api/clinic/upload"
    csv_path = r"c:\Users\adity\Documents\All Projects\SmartHealthML\data\sample_patients.csv"
    
    if not os.path.exists(csv_path):
        print(f"File not found: {csv_path}")
        return

    with open(csv_path, 'rb') as f:
        files = {'file': ('sample_patients.csv', f, 'text/csv')}
        response = requests.post(url, files=files)
        
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

if __name__ == "__main__":
    test_upload()
