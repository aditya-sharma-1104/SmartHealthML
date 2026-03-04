import requests
import json
import os
import time

BASE_URL = "http://localhost:5000/api"

def print_result(name, response):
    status = response.status_code
    print(f"[{name}] Status: {status}")
    try:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)[:500]}...")
    except:
        print(f"Response (text): {response.text[:200]}...")
    print("-" * 30)
    return status in [200, 201]

def verify_all():
    results = {}
    token = None
    user_id = None

    print("🚀 Starting SmartHealthML API Verification\n")

    # 1. Public Hygiene Tips
    try:
        results["Public Hygiene Tips"] = print_result("GET /public/hygiene-tips", requests.get(f"{BASE_URL}/public/hygiene-tips"))
    except Exception as e:
        print(f"Error: {e}")
        return

    # 2. Auth - Register
    reg_data = {
        "name": "Integration Tester",
        "email": f"tester_{int(time.time())}@example.com",
        "password": "Password123!",
        "role": "admin"
    }
    results["Auth Register"] = print_result("POST /auth/register", requests.post(f"{BASE_URL}/auth/register", json=reg_data))

    # 3. Auth - Login
    login_data = {
        "email": reg_data["email"],
        "password": reg_data["password"]
    }
    resp = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    results["Auth Login"] = print_result("POST /auth/login", resp)
    if resp.status_code == 200:
        token = resp.json().get("token")
        user_id = resp.json().get("user", {}).get("id")

    headers = {"Authorization": f"Bearer {token}"} if token else {}

    # 4. Predict API
    predict_data = {
        "state": "Maharashtra",
        "month": 7,
        "rainfall": 250.5,
        "ph": 6.8,
        "bod": 4.2,
        "nitrate": 1.5,
        "temperature": 28.5,
        "latitude": 19.0760,
        "longitude": 72.8777
    }
    results["Prediction"] = print_result("POST /predict", requests.post(f"{BASE_URL}/predict", json=predict_data))

    # 5. Heatmap Data
    results["Heatmap Data"] = print_result("GET /heatmap-data", requests.get(f"{BASE_URL}/heatmap-data"))

    # 6. Report Summary
    results["Report Summary"] = print_result("GET /report-summary", requests.get(f"{BASE_URL}/report-summary"))

    # 7. Alerts
    results["Active Alerts"] = print_result("GET /alerts", requests.get(f"{BASE_URL}/alerts"))
    results["All Alerts"] = print_result("GET /alerts/all", requests.get(f"{BASE_URL}/alerts/all"))

    # 8. Case Reporting
    case_data = {
        "patient_name": "John Doe",
        "age": 30,
        "village": "Rural Village",
        "symptoms": "Fever, Cough",
        "severity": "Moderate",
        "disease_type": "Flu",
        "worker_id": user_id or 1
    }
    results["Report Case"] = print_result("POST /cases/report", requests.post(f"{BASE_URL}/cases/report", json=case_data))
    results["Get Cases"] = print_result("GET /cases/all", requests.get(f"{BASE_URL}/cases/all"))

    # 9. Water Quality Reporting
    water_data = {
        "source": "Borewell",
        "location": "North Zone",
        "ph": 7.2,
        "turbidity": 2.5,
        "worker_id": user_id or 1
    }
    results["Report Water Quality"] = print_result("POST /water/report", requests.post(f"{BASE_URL}/water/report", json=water_data))

    # 10. Stats
    results["Admin Stats"] = print_result("GET /stats/admin", requests.get(f"{BASE_URL}/stats/admin"))
    results["Officer Stats"] = print_result("GET /stats/officer", requests.get(f"{BASE_URL}/stats/officer"))

    # 11. User Management (CRUD)
    results["Get Users"] = print_result("GET /users", requests.get(f"{BASE_URL}/users/"))
    
    # 12. Logs
    results["System Logs"] = print_result("GET /logs/", requests.get(f"{BASE_URL}/logs/"))

    # 13. Clinic Data (Bulk Upload)
    csv_path = r"c:\Users\adity\Documents\All Projects\SmartHealthML\data\sample_patients.csv"
    if os.path.exists(csv_path):
        with open(csv_path, 'rb') as f:
            files = {'file': ('sample_patients.csv', f, 'text/csv')}
            results["Clinic Upload"] = print_result("POST /clinic/upload", requests.post(f"{BASE_URL}/clinic/upload", files=files))
    else:
        results["Clinic Upload"] = "Skipped (File not found)"

    print("\n📊 Verification Summary:")
    all_passed = True
    for name, success in results.items():
        status_str = "✅ PASS" if success is True else ("❌ FAIL" if success is False else success)
        print(f"{name:25} : {status_str}")
        if success is False: all_passed = False

    if all_passed:
        print("\n✨ ALL APIs ARE WORKING PROPERLY! ✨")
    else:
        print("\n⚠️ SOME APIs FAILED VERIFICATION. ⚠️")

if __name__ == "__main__":
    verify_all()
