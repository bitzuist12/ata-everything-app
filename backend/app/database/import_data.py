import json
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Project, Task
from dotenv import load_dotenv

load_dotenv()

# Database connection
DATABASE_URL = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def import_json_data():
    session = Session()
    
    # Update path to match your project structure
    json_dir = os.path.join(os.path.dirname(__file__), '..', 'todoist', 'todo_api', 'Todoist_data')
    
    try:
        # First, import projects
        projects_seen = set()
        
        # Read through task files
        for filename in os.listdir(json_dir):
            if filename.startswith('tasks_') and filename.endswith('.json'):
                with open(os.path.join(json_dir, filename), 'r') as f:
                    tasks_data = json.load(f)
                    
                    for task_data in tasks_data:
                        # Create project if not exists
                        if task_data['project_id'] not in projects_seen:
                            project = Project(
                                id=task_data['project_id'],
                                name=task_data['project_name']
                            )
                            session.merge(project)  # merge instead of add to handle duplicates
                            projects_seen.add(task_data['project_id'])
                        
                        # Create task
                        task = Task(
                            id=task_data['id'],
                            project_id=task_data['project_id'],
                            content=task_data['content'],
                            description=task_data['description'],
                            priority=task_data['priority'],
                            due=task_data['due'],
                            labels=','.join(task_data['labels']) if task_data['labels'] else ''
                        )
                        session.merge(task)  # merge instead of add to handle duplicates
        
        session.commit()
        print("Data import completed successfully!")
        
    except Exception as e:
        print(f"Error importing data: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    import_json_data()