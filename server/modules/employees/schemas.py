from sqlmodel import SQLModel, EmailStr

class EmployeeCreate(SQLModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeResponse(SQLModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str