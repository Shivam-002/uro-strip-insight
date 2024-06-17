from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from main import get_test_results
from models.response import SuccessResponse
from dotenv import load_dotenv
import os

load_dotenv()

# Create a FastAPI instance
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN")],
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)


# Define the route to handle the file upload
@app.post("/api/v1/query-test")
async def query_test(file: UploadFile = File(...)):
    result = await get_test_results(file)

    response = SuccessResponse(data=result)
    return response
