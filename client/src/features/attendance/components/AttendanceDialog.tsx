import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEmployeeAttendance } from "../api/use-attendance";
import { Skeleton } from "@/components/ui/skeleton";
import type { Employee } from "@/features/employees/schemas/employee-schema";

interface AttendanceDialogProps {
    employee: Employee | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AttendanceDialog({ employee, open, onOpenChange }: AttendanceDialogProps) {
    const { data: attendance, isLoading } = useEmployeeAttendance(employee?.id);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Attendance History - {employee?.full_name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : (attendance && attendance.length > 0) ? (
                        <div className="border rounded-md max-h-[400px] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {attendance.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-medium">{record.date}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    variant={record.status === 'present' ? 'default' : 'destructive'}
                                                    className="capitalize"
                                                >
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-10 border rounded-lg bg-muted/20">
                            <p className="text-muted-foreground">No attendance records found for this employee.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
