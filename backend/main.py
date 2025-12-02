from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import json
from datetime import datetime
import math

pipeline = joblib.load("pipeline.joblib")
metadata = json.load(open("metadata.json"))

reverse_maps = {
  field: {friendly: original for original, friendly in mapping.items()}
  for field, mapping in metadata.items()
  if isinstance(mapping, dict)
}

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/metadata")
def get_metadata():
    # Return dropdown options (may be dicts with friendly labels)
    return metadata

@app.post("/predict")
async def predict(request: dict):
    # Convert any friendly names from the frontend back into original keys
    for field, fmap in reverse_maps.items():
        val = request.get(field)
        if isinstance(val, str) and val in fmap:
            request[field] = fmap[val]

    # Ensure numeric types for required numeric fields
    def to_float(val):
        try:
            return float(val)
        except Exception:
            return None

    def to_int(val):
        try:
            return int(val)
        except Exception:
            return None

    square_feet = to_float(request.get("SquareFeet"))
    bedrooms = to_int(request.get("Bedrooms"))
    bathrooms = to_int(request.get("Bathrooms"))
    year_built = to_int(request.get("YearBuilt"))
    lot_size = to_float(request.get("LotSize"))

    # Compute engineered features expected by the pipeline
    # HouseAge = current_year - YearBuilt
    if year_built is not None and year_built > 0:
        request["HouseAge"] = datetime.now().year - year_built
    else:
        request["HouseAge"] = 0

    # AreaPerBedroom = SquareFeet / max(Bedrooms, 1)
    if square_feet is not None:
        b_safe = bedrooms if (bedrooms is not None and bedrooms > 0) else 1
        request["AreaPerBedroom"] = square_feet / b_safe
    else:
        request["AreaPerBedroom"] = 0

    # LogLotSize = log1p(LotSize)
    if lot_size is not None and lot_size >= 0:
        request["LogLotSize"] = math.log1p(lot_size)
    else:
        request["LogLotSize"] = 0

    # Convert to dataframe (pipeline expects tabular format)
    import pandas as pd
    X = pd.DataFrame([request])

    # Predict
    pred = pipeline.predict(X)[0]

    return {"predicted_price": float(pred)}
