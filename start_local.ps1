Write-Host "Starting InstaCaption AI Locally..."

# Start Backend
Write-Host "Launching Backend Server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host 'Setting up Backend...'; if (!(Test-Path venv)) { python -m venv venv }; .\venv\Scripts\activate; pip install -r requirements.txt; python main.py"

# Start Frontend
Write-Host "Launching Frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; Write-Host 'Setting up Frontend...'; npm install; npm run dev"

Write-Host "Both services are starting in separate windows."
