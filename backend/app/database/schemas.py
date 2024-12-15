from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    project_id: Optional[str] = None
    content: str
    description: Optional[str] = None
    priority: Optional[int] = None
    due: Optional[str] = None
    labels: Optional[str] = None
    completed: bool = False

class TaskCreate(TaskBase):
    pass  # Inherits all fields from TaskBase

class TaskSchema(TaskBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True