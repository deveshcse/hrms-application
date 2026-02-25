import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Clock } from 'lucide-react';
import { useEmployees } from '../api/use-employees';
import { Skeleton } from '@/components/ui/skeleton';
import { AttendanceDialog } from '@/features/attendance/components/AttendanceDialog';
import { useState } from 'react';
import type { Employee } from '../schemas/employee-schema';

export function EmployeeTable() {
    const { employees, isLoading, deleteEmployee, isDeleting } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);

    const handleViewAttendance = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsAttendanceDialogOpen(true);
    };

    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="text-center py-10 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No employees found. Add your first employee above.</p>
            </div>
        );
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.employee_id}>
                            <TableCell className="font-medium">{employee.employee_id}</TableCell>
                            <TableCell>{employee.full_name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary hover:text-primary hover:bg-primary/10"
                                        onClick={() => handleViewAttendance(employee)}
                                    >
                                        <Clock className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => employee.id && deleteEmployee(employee.id)}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AttendanceDialog
                employee={selectedEmployee}
                open={isAttendanceDialogOpen}
                onOpenChange={setIsAttendanceDialogOpen}
            />
        </div>
    );
}
