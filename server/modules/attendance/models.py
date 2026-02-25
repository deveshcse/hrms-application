from sqlmodel import SQLModel, Field
from datetime import date
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "present"
    ABSENT = "absent"

class Attendance(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    employee_id: int = Field(foreign_key="employee.id")
    date: date
    status: AttendanceStatus