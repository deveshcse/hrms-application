from fastapi import APIRouter, Depends
from sqlmodel import Session
from db.session import get_session
from core.response import success_response
from modules.attendance.schemas import AttendanceCreate
from modules.attendance.service import mark_attendance, get_employee_attendance


router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/")
def mark(data: AttendanceCreate, session: Session = Depends(get_session)):
    return success_response(mark_attendance(session, data))

@router.get("/{employee_id}")
def get_history(employee_id: int, session: Session = Depends(get_session)):
    return success_response(get_employee_attendance(session, employee_id))