"""attendnce enum

Revision ID: 1ddccc835989
Revises: cc4425b5e3ff
Create Date: 2026-02-25 16:40:46.295801

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1ddccc835989'
down_revision: Union[str, Sequence[str], None] = 'cc4425b5e3ff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


attendance_status_enum = sa.Enum(
    "PRESENT",
    "ABSENT",
    name="attendancestatus"
)
def upgrade():
    # create enum in postgres
    attendance_status_enum.create(op.get_bind(), checkfirst=True)

    # alter column to use enum
    op.alter_column(
        "attendance",
        "status",
        existing_type=sa.String(),
        type_=attendance_status_enum,
        postgresql_using="status::attendancestatus"
    )

def downgrade():
    op.alter_column(
        "attendance",
        "status",
        existing_type=attendance_status_enum,
        type_=sa.String()
    )

    attendance_status_enum.drop(op.get_bind(), checkfirst=True)