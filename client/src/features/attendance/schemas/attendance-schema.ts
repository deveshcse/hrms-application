import { z } from 'zod';

export const attendanceSchema = z.object({
    employee_id: z.number({
        error: 'Employee is required',
    }),
    date: z.string().min(1, 'Date is required'),
    status: z.enum(['present', 'absent'], {
        error: 'Status is required',
    }),
});

export type Attendance = z.infer<typeof attendanceSchema>;

export interface AttendanceRecord extends Attendance {
    id?: number;
    full_name?: string;
}
