# Deployment Guide

This guide covers how to run the InstaCaption AI application locally and how to deploy it to production.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Git](https://git-scm.com/)

## 1. Local Development

To run the application locally, you need to start both the backend and the frontend.

### Backend (Python/FastAPI)

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Start the server:
    ```bash
    python main.py
    ```
    The backend will run at `http://localhost:8000`.

### Frontend (React/Vite)

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run at `http://localhost:5173` (or similar).

## 2. Production Deployment

For production, it is recommended to deploy the frontend and backend separately.

### Backend Deployment (Render/Railway)

We recommend using [Render](https://render.com/) or [Railway](https://railway.app/) as they have native support for Python/FastAPI.

**Deploying to Render:**

1.  Push your code to a GitHub repository.
2.  Create a new **Web Service** on Render.
3.  Connect your GitHub repository.
4.  Set the **Root Directory** to `backend`.
5.  Set the **Build Command** to `pip install -r requirements.txt`.
6.  Set the **Start Command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
7.  Click **Create Web Service**.
8.  Copy the URL of your deployed backend (e.g., `https://your-app.onrender.com`).

### Frontend Deployment (Vercel/Netlify)

We recommend using [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) for the frontend.

**Deploying to Vercel:**

1.  Push your code to a GitHub repository (if not already done).
2.  Import the project into Vercel.
3.  Set the **Root Directory** to `frontend`.
4.  Vercel should automatically detect Vite.
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  **Crucial Step**: Add an Environment Variable.
    *   Name: `VITE_API_URL`
    *   Value: The URL of your deployed backend (e.g., `https://your-app.onrender.com`).
    *   *Note: Do not add a trailing slash.*
6.  Click **Deploy**.

### Note on ML Models

This application uses large AI models (BLIP and Flan-T5).
-   **First Startup**: When the backend starts for the first time, it will download these models (approx. 2GB). This may take a few minutes.
-   **Memory Usage**: Ensure your deployment target has at least 2GB of RAM (Render's free tier might struggle, but the Starter plan is sufficient).


## 3. Troubleshooting

-   **CORS Issues**: If the frontend cannot talk to the backend, check the `CORSMiddleware` settings in `backend/main.py`. In production, you might want to restrict `allow_origins` to your specific frontend domain instead of `["*"]`.
-   **Environment Variables**: Ensure `VITE_API_URL` is set correctly in your frontend deployment settings. It must start with `VITE_` to be exposed to the client-side code.
