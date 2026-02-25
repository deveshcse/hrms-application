from sqlmodel import SQLModel
from datetime import date

class AttendanceCreate(SQLModel):
    employee_id: int
    date: date
    status: str