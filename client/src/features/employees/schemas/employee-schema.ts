import { z } from 'zod';

export const employeeSchema = z.object({
    id: z.number().optional(),
    employee_id: z.string().min(1, 'Employee ID is required'),
    full_name: z.string().min(1, 'Full name is required'),
    email: z.email('Invalid email address'),
    department: z.string().min(1, 'Department is required'),
});

export type Employee = z.infer<typeof employeeSchema>;
