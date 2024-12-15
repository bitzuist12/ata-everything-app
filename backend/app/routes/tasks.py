from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import models, schemas, SessionLocal
import uuid

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/seed_tasks", response_model=List[schemas.TaskSchema])
def seed_tasks(db: Session = Depends(get_db)):
    # Clear existing tasks
    db.query(models.Task).delete()
    db.commit()
    
    # Create sample tasks
    sample_tasks = [
        models.Task(
            id=str(uuid.uuid4()),
            content="First sample task", 
            description="This is a test task",
            priority=1,
            completed=False
        ),
        models.Task(
            id=str(uuid.uuid4()),
            content="Second sample task", 
            description="Another test task",
            priority=2,
            completed=False
        )
    ]
    
    db.add_all(sample_tasks)
    db.commit()
    
    # Refresh tasks to ensure they're fully loaded
    for task in sample_tasks:
        db.refresh(task)
        print(f"Seeded Task ID: {task.id}, Content: {task.content}")
    
    return sample_tasks

@router.get("/", response_model=List[schemas.TaskSchema])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("\n--- BACKEND TASK RETRIEVAL ---")
    tasks = db.query(models.Task).offset(skip).limit(limit).all()
    
    print(f"Total tasks found: {len(tasks)}")
    for task in tasks:
        print(f"Task ID: {task.id}")
        print(f"Content: {task.content}")
        print(f"Description: {task.description}")
        print(f"Priority: {task.priority}")
        print(f"Completed: {task.completed}")
        print("---")
    
    return tasks

@router.get("/{task_id}", response_model=schemas.TaskSchema)
def read_task(task_id: str, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/", response_model=schemas.TaskSchema)
def create_task(task: schemas.TaskSchema, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.put("/{task_id}", response_model=schemas.TaskSchema)
def update_task(task_id: str, updated_task: schemas.TaskSchema, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in updated_task.dict().items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}