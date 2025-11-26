# AI-Powered Instagram Caption Generator

A full-stack web application that generates creative Instagram captions from images using Computer Vision and Natural Language Processing.

## Features
- **Image Analysis**: Uses BLIP (Bootstrapping Language-Image Pre-training) to understand image content.
- **Style Transfer**: Uses Flan-T5 to rewrite captions in different styles (Funny, Inspirational, Short & Punchy).
- **Hashtag Generation**: Automatically generates relevant hashtags.
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS.

## Tech Stack
- **Backend**: Python, FastAPI, Transformers, PyTorch
- **Frontend**: React, TypeScript, Vite, Tailwind CSS

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   python main.py
   ```
   The server will start at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Usage
1. Open the application in your browser.
2. Upload an image (PNG/JPG).
3. Select a caption style.
4. Click "Generate Captions".
5. Copy your favorite caption and hashtags!

## Git Repository
To push this code to a new repository:
1. Initialize git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Add remote: `git remote add origin <your-repo-url>`
5. Push: `git push -u origin main`
