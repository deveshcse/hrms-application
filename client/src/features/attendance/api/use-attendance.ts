import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import type { Attendance } from '../schemas/attendance-schema';

export const useAttendance = () => {
    const queryClient = useQueryClient();

    const markAttendanceMutation = useMutation({
        mutationFn: async (attendance: Attendance) => {
            const { data } = await api.post('/attendance/', attendance);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] }); // Assuming attendance might be listed under employee details or refreshes lists
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
