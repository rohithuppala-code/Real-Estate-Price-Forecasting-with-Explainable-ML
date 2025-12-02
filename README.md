# Real-Estate Price Forecasting with Explainable ML

A full‑stack app for estimating Estate prices using a trained machine‑learning pipeline. The frontend is built with React (Vite + Tailwind), and the backend uses FastAPI to serve model predictions and metadata for dropdowns.

## Features
- User‑friendly dropdowns for `Neighborhood`, `Exterior`, and `Kitchen Quality`
- Automatic mapping of friendly labels to original model keys
- Fast predictions via a pre‑trained pipeline
- Clean, animated UI

## Tech Stack
- Frontend: `React`, `Vite`, `Tailwind CSS`
- Backend: `FastAPI`, `Uvicorn`
- ML: `scikit-learn`, `pandas`, `joblib`

## Getting Started

### Prerequisites
- `Node.js` (v18+ recommended)
- `Python` 3.10+ and `pip`

### 1) Backend
1. Open a terminal in `backend`.
2. Install dependencies:
   - `pip install fastapi uvicorn pandas scikit-learn joblib`
3. Start the API server:
   - Run this command in the terminal: `uvicorn main:app --reload --port 8000`
4. The API will be available at `http://localhost:8000`.

### 2) Frontend
After running the backend server split the terminal in 'frontend' and run the following commands:
1. From the project root, install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm run dev`
3. Open the app at the URL printed by Vite (typically `http://localhost:5173`).

## Project Structure
```
Real-Estate Price Forecasting with Explainable ML/
project-root/
├── backend/            # FastAPI app, model pipeline, metadata
├── model_notebook/     # Jupyter notebook used to train/save model
├── frontend/
│   ├── src/            # React app source
│   └── App.jsx         # Frontend entry
└── README.md


## Training / Updating the Model
- The notebook `model_notebook/house_price_model.ipynb` trains the pipeline and saves:
  - `backend/pipeline.joblib` (model pipeline)
  - `backend/metadata.json` (dropdown metadata)
- Metadata includes friendly label mappings for `Neighborhood`, `Exterior`, and `KitchenQuality`. Rerun the final cells if you change categories or want to update labels.

## Notes
- If the backend port or host changes, update the fetch URL in `src/App.jsx`.
- Build commands: `npm run build` and `npm run preview` for a production preview.
