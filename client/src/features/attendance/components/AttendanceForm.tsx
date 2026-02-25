import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { attendanceSchema } from '../schemas/attendance-schema';
import type { Attendance } from '../schemas/attendance-schema';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmployees } from '@/features/employees/api/use-employees';
import { useAttendance } from '../api/use-attendance';

export function AttendanceForm() {
    const { employees } = useEmployees();
    const { markAttendance, isMarking } = useAttendance();

    const form = useForm<Attendance>({
        resolver: zodResolver(attendanceSchema),
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            status: 'present',
        },
    });

    function onSubmit(values: Attendance) {
        markAttendance(values, {
            onSuccess: () => {
                form.reset({
                    employee_id: undefined,
                    date: new Date().toISOString().split('T')[0],
                    status: 'present',
                });
            },
        });
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="employee_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee</FormLabel>
                                        <Select
                                            onValueChange={(val) => field.onChange(parseInt(val))}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an employee" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {employees.map((emp) => (
                                                    <SelectItem key={emp.id} value={emp.id?.toString() || ''}>
                                                        {emp.full_name} ({emp.employee_id})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="present">Present</SelectItem>
                                                <SelectItem value="absent">Absent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full md:w-auto" disabled={isMarking}>
                            {isMarking ? 'Marking...' : 'Mark Attendance'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
