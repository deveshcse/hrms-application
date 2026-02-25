from fastapi import APIRouter, Depends
from sqlmodel import Session
from db.session import get_session
from core.response import success_response
from .schemas import EmployeeCreate
from .service import create_employee, list_employees, delete_employee

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("/")
def create(data: EmployeeCreate, session: Session = Depends(get_session)):
    emp = create_employee(session, data)
    return success_response(emp)

@router.get("/")
def get_all(session: Session = Depends(get_session)):
    return success_response(list_employees(session))

@router.delete("/{employee_id}")
def remove(employee_id: int, session: Session = Depends(get_session)):
    delete_employee(session, employee_id)
    return success_response(message="Deleted")