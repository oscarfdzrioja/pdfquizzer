"""Delete Add cascade delete to Item-ReplyItem relationship

Revision ID: edc6739d4b7b
Revises: ce6dee4c048e
Create Date: 2024-12-28 13:52:05.845251

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'edc6739d4b7b'
down_revision = 'ce6dee4c048e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'replyitem', 'item', ['item_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'replyitem', type_='foreignkey')
    # ### end Alembic commands ###
