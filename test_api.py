import requests

url = "http://localhost:8000/api/generate_caption"
files = {'file': ('test_image.jpg', open('test_image.jpg', 'rb'), 'image/jpeg')}
data = {'style': 'Funny'}

try:
    response = requests.post(url, files=files, data=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    if response.status_code == 200 and 'captions' in response.json():
        print("SUCCESS: API works!")
    else:
        print("FAILURE: API returned unexpected response.")
except Exception as e:
    print(f"FAILURE: Could not connect to API. Error: {e}")
