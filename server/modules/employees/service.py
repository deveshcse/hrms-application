from sqlmodel import Session, select
from core.exceptions import AppException
from .models import Employee

def create_employee(session: Session, data):
    existing = session.exec(
        select(Employee).where(Employee.employee_id == data.employee_id)
    ).first()

    if existing:
        raise AppException("DUPLICATE_EMPLOYEE", "Employee already exists", 400)

    employee = Employee(**data.model_dump())
    session.add(employee)
    session.commit()
    session.refresh(employee)
    return employee


def list_employees(session: Session):
    return session.exec(select(Employee)).all()


def delete_employee(session: Session, employee_id: int):
    emp = session.get(Employee, employee_id)
    if not emp:
        raise AppException("NOT_FOUND", "Employee not found", 404)

    session.delete(emp)
    session.commit()