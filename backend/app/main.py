from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import tasks  # Import the tasks router
from .database import engine, Base  # Ensure these are correctly imported

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost",  # Update with your frontend URL
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Include the tasks router with the updated prefix
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])