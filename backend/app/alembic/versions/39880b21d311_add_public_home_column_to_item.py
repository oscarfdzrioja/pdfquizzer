"""Add public_home column to Item

Revision ID: 39880b21d311
Revises: a11e79e47aa9
Create Date: 2024-12-28 13:52:05.845251

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '39880b21d311'
down_revision = 'a11e79e47aa9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('item', sa.Column('public_home', sa.Boolean(), server_default=sa.text('true'), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('item', 'public_home')
    # ### end Alembic commands ###