from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import tasks  # Import the tasks router
from .database import engine, Base  # You can remove Base if not used elsewhere

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

app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])