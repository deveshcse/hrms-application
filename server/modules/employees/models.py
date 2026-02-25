from sqlmodel import SQLModel, Field

class Employee(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    employee_id: str = Field(index=True, unique=True)
    full_name: str
    email: str = Field(index=True)
    department: str