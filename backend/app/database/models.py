from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Table
from sqlalchemy.orm import relationship
from .database import Base
import uuid
from sqlalchemy.sql import func

# Association table for the many-to-many relationship between Tasks and Notes
task_note_association = Table('task_note_association', Base.metadata,
    Column('task_id', String, ForeignKey('tasks.id')),
    Column('note_id', String, ForeignKey('notes.id'))
)

class Project(Base):
    __tablename__ = 'projects'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    
    # Relationships
    tasks = relationship("Task", back_populates="project")
    notes = relationship("Note", back_populates="project")

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey('projects.id'), nullable=True)
    content = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(Integer, nullable=True)
    due = Column(String, nullable=True)
    labels = Column(String, nullable=True)  # Stored as a comma-separated string
    completed = Column(Boolean, default=False)
    
    # Relationships
    project = relationship("Project", back_populates="tasks")
    notes = relationship("Note", secondary=task_note_association, back_populates="tasks")

class Note(Base):
    __tablename__ = 'notes'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    date = Column(DateTime, default=func.now())
    char_length = Column(Integer)
    summary = Column(Text)
    project_id = Column(String, ForeignKey('projects.id'), nullable=True)

    # Relationships
    project = relationship("Project", back_populates="notes")
    tasks = relationship("Task", secondary=task_note_association, back_populates="notes")