"""empty message

Revision ID: f56af902fcd0
Revises: d88eef135990
Create Date: 2023-06-27 05:54:31.694434

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f56af902fcd0'
down_revision = 'd88eef135990'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('home__post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('updated', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('home__post', schema=None) as batch_op:
        batch_op.drop_column('updated')
        batch_op.drop_column('created')

    # ### end Alembic commands ###