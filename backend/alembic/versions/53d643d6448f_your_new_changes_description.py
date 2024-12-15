"""Your new changes description

Revision ID: 53d643d6448f
Revises: 1e49563b5aae
Create Date: [current_date]

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector


# revision identifiers, used by Alembic.
revision: str = '53d643d6448f'
down_revision: Union[str, None] = '1e49563b5aae'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create a new tasks table with the completed column
    op.execute('''
        CREATE TABLE tasks_new (
            id VARCHAR NOT NULL PRIMARY KEY,
            project_id VARCHAR,
            content VARCHAR NOT NULL,
            description TEXT,
            priority INTEGER,
            due VARCHAR,
            labels VARCHAR,
            completed BOOLEAN DEFAULT 0,
            FOREIGN KEY(project_id) REFERENCES projects(id)
        )
    ''')
    
    # Copy data from the old table to the new one
    op.execute('''
        INSERT INTO tasks_new (
            id, project_id, content, description, 
            priority, due, labels
        )
        SELECT id, project_id, content, description, 
               priority, due, labels
        FROM tasks
    ''')
    
    # Drop the old table
    op.execute('DROP TABLE tasks')
    
    # Rename the new table to the original name
    op.execute('ALTER TABLE tasks_new RENAME TO tasks')
    
    # Create new notes table
    op.create_table('notes',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('date', sa.DateTime(), nullable=True),
        sa.Column('char_length', sa.Integer(), nullable=True),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('project_id', sa.String(), nullable=True),
        sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Create task_note_association table
    op.create_table('task_note_association',
        sa.Column('task_id', sa.String(), nullable=True),
        sa.Column('note_id', sa.String(), nullable=True),
        sa.ForeignKeyConstraint(['note_id'], ['notes.id'], ),
        sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], )
    )


def downgrade() -> None:
    # Drop the new tables
    op.drop_table('task_note_association')
    op.drop_table('notes')
    
    # For the tasks table, we need to remove the completed column
    op.execute('''
        CREATE TABLE tasks_old (
            id VARCHAR NOT NULL PRIMARY KEY,
            project_id VARCHAR,
            content VARCHAR NOT NULL,
            description TEXT,
            priority INTEGER,
            due VARCHAR,
            labels VARCHAR,
            FOREIGN KEY(project_id) REFERENCES projects(id)
        )
    ''')
    
    op.execute('''
        INSERT INTO tasks_old (
            id, project_id, content, description, 
            priority, due, labels
        )
        SELECT id, project_id, content, description, 
               priority, due, labels
        FROM tasks
    ''')
    
    op.execute('DROP TABLE tasks')
    op.execute('ALTER TABLE tasks_old RENAME TO tasks')
