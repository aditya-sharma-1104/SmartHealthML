# Deployment Guide

This guide covers the deployment of SmartHealthML to production environments.

## 🌉 Architecture Recap
- **Frontend**: Deployed to **Vercel**.
- **Backend**: Deployed to **Render**.

---

## 1. Backend Deployment (Render)

1. **Connect Repository**: Link your GitHub repository to Render.
2. **Setup Blueprint/Web Service**:
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt` (inside the `Backend` folder).
   - **Start Command**: `python app.py` (or use `gunicorn app:app`).
3. **Environment Variables**:
   - Set `PYTHON_VERSION` if needed.
   - The SQLite database will be created in the local instance. Note: Render's free tier has an ephemeral disk; for persistent DB storage, consider connecting to a managed PostgreSQL instance and updating the `SQLALCHEMY_DATABASE_URI`.

---

## 2. Frontend Deployment (Vercel)

1. **Vercel Configuration**:
   The project includes a `vercel.json` to handle client-side routing in React:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
2. **Build Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_URL`: Set this to your Render backend URL (e.g., `https://smarthealthml.onrender.com`).

---

## 3. Triggering Redeployments

### Automated (GitHub Integration)
Both Vercel and Render are configured to auto-redeploy whenever changes are pushed to the `main` branch.

### Manual Troubleshooting
**Favicon Issues**:
Browsers cache favicons aggressively. If you update the favicon and it doesn't appear:
- Use a Hard Refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac).
- Check in Incognito mode.

**API Connectivity**:
If the frontend cannot reach the backend, verify the `VITE_API_URL` environment variable in the Vercel dashboard and ensure CORS is enabled in `Backend/app.py`.
