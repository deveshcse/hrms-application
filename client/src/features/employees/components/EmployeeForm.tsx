import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../schemas/employee-schema';
import type { Employee } from '../schemas/employee-schema';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmployees } from '../api/use-employees';

export function EmployeeForm() {
    const { createEmployee, isCreating } = useEmployees();

    const form = useForm<Employee>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            employee_id: '',
            full_name: '',
            email: '',
            department: '',
        },
    });

    function onSubmit(values: Employee) {
        createEmployee(values, {
            onSuccess: () => {
                form.reset();
            },
        });
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add New Employee</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="employee_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="EMP001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Engineering" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full md:w-auto" disabled={isCreating}>
                            {isCreating ? 'Adding...' : 'Add Employee'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
