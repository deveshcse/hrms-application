from sqlmodel import Session, select
from core.exceptions import AppException
from modules.employees.models import Employee
from .models import Attendance

def mark_attendance(session: Session, data):
    # Check if employee exists
    emp = session.get(Employee, data.employee_id)
    if not emp:
        raise AppException("NOT_FOUND", "Employee not found", 404)

    # Check for duplicate attendance
    existing = session.exec(
        select(Attendance).where(
            Attendance.employee_id == data.employee_id,
            Attendance.date == data.date
        )
    ).first()

    if existing:
        raise AppException("DUPLICATE_ATTENDANCE", "Attendance already marked for this date", 400)

    record = Attendance(**data.model_dump())
    session.add(record)
    session.commit()
    session.refresh(record)
    return record

def get_employee_attendance(session: Session, employee_id: int):
    return session.exec(
        select(Attendance).where(Attendance.employee_id == employee_id).order_by(Attendance.date.desc())
    ).all()