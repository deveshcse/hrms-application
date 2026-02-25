import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Employee } from '../schemas/employee-schema';
import { toast } from 'sonner';

export const useEmployees = () => {
    const queryClient = useQueryClient();

    const employeesQuery = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const { data } = await api.get('/employees/');
            return data.data as Employee[];
        },
    });

    const createEmployeeMutation = useMutation({
        mutationFn: async (newEmployee: Employee) => {
            const { data } = await api.post('/employees/', newEmployee);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            toast.success('Employee added successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to add employee';
            toast.error(message);
        },
    });

    const deleteEmployeeMutation = useMutation({
        mutationFn: async (employeeId: number) => {
            const { data } = await api.delete(`/employees/${employeeId}`);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            toast.success('Employee deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete employee');
        },
    });

    return {
        employees: employeesQuery.data || [],
        isLoading: employeesQuery.isLoading,
        isError: employeesQuery.isError,
        createEmployee: createEmployeeMutation.mutate,
        isCreating: createEmployeeMutation.isPending,
        deleteEmployee: deleteEmployeeMutation.mutate,
        isDeleting: deleteEmployeeMutation.isPending,
    };
};
