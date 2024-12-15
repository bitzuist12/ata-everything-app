"""add completed column to tasks

Revision ID: 5f02e12ac2eb
Revises: 53d643d6448f
Create Date: 2024-02-20 12:34:56.789012
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '5f02e12ac2eb'
down_revision: Union[str, None] = '53d643d6448f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Add completed column to tasks table using PostgreSQL syntax
    op.execute('''
        ALTER TABLE tasks 
        ADD COLUMN IF NOT EXISTS completed BOOLEAN DEFAULT false NOT NULL
    ''')

def downgrade() -> None:
    # Remove completed column from tasks table
    op.execute('ALTER TABLE tasks DROP COLUMN IF EXISTS completed')
