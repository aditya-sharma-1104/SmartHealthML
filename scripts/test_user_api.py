import requests
import json

BASE_URL = "http://localhost:5000/api/users/"

def test_crud():
    print("--- Testing User CRUD Endpoints ---")
    
    # 1. Get all users (should be empty if fresh DB)
    print("\n[1] GET /api/users/")
    resp = requests.get(BASE_URL)
    print(f"Status: {resp.status_code}")
    users = resp.json()
    print(f"Users found: {len(users)}")

    # 2. Create a user
    print("\n[2] POST /api/users/")
    new_user = {
        "name": "Dr. Test Officer",
        "email": "test.officer@health.gov",
        "role": "health_officer",
        "status": "Active"
    }
    resp = requests.post(BASE_URL, json=new_user)
    print(f"Status: {resp.status_code}")
    created_user = resp.json().get('user')
    print(f"Created: {created_user}")

    if not created_user:
        print("Failed to create user. Exiting.")
        return

    user_id = created_user['id']

    # 3. Update the user
    print(f"\n[3] PUT /api/users/{user_id}")
    update_data = {"status": "Inactive", "role": "admin"}
    resp = requests.put(f"{BASE_URL}{user_id}", json=update_data)
    print(f"Status: {resp.status_code}")
    updated_user = resp.json().get('user')
    print(f"Updated: {updated_user}")

    # 4. Delete the user
    print(f"\n[4] DELETE /api/users/{user_id}")
    resp = requests.delete(f"{BASE_URL}{user_id}")
    print(f"Status: {resp.status_code}")
    print(f"Message: {resp.json().get('message')}")

    # 5. Verify deletion
    print("\n[5] GET /api/users/ (Final Verify)")
    resp = requests.get(BASE_URL)
    users = resp.json()
    print(f"Users found: {len(users)}")
    
    if len(users) == 0:
        print("\n✅ Verification Successful!")
    else:
        print("\n❌ Verification Failed: User still exists in database.")

if __name__ == "__main__":
    try:
        test_crud()
    except Exception as e:
        print(f"Error connecting to server: {e}")
        print("Make sure the Flask server is running on http://localhost:5000")
