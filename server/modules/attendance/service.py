from sqlmodel import Session
from .models import Attendance

def mark_attendance(session: Session, data):
    record = Attendance(**data.model_dump())
    session.add(record)
    session.commit()
    session.refresh(record)
    return record