from pydantic import BaseModel
from typing import Optional

class TaskSchema(BaseModel):
    id: str
    project_id: Optional[str] = None
    content: str
    description: Optional[str] = None
    priority: Optional[int] = None
    due: Optional[str] = None
    labels: Optional[str] = None
    completed: bool = False

    class Config:
        from_attributes = True