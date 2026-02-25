from sqlmodel import SQLModel
from datetime import date
from .models import AttendanceStatus

class AttendanceCreate(SQLModel):
    employee_id: int
    date: date
    status: AttendanceStatus