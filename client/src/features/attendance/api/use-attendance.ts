import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import type { Attendance, AttendanceRecord } from '../schemas/attendance-schema';

export const useAttendance = () => {
    const queryClient = useQueryClient();

    const markAttendanceMutation = useMutation({
        mutationFn: async (attendance: Attendance) => {
            const { data } = await api.post('/attendance/', attendance);
            return data.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            queryClient.invalidateQueries({ queryKey: ['attendance', variables.employee_id] });
            toast.success('Attendance marked successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to mark attendance';
            toast.error(message);
        },
    });

    return {
        markAttendance: markAttendanceMutation.mutate,
        isMarking: markAttendanceMutation.isPending,
    };
};

export const useEmployeeAttendance = (employeeId: number | undefined) => {
    return useQuery({
        queryKey: ['attendance', employeeId],
        queryFn: async () => {
            if (!employeeId) return [];
            const { data } = await api.get(`/attendance/${employeeId}`);
            return data.data as AttendanceRecord[];
        },
        enabled: !!employeeId,
    });
};
