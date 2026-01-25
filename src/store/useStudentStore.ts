import { create } from 'zustand';
import { Student } from '@/types/model';
import { Meta } from '@/types/api';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';

const metaDefault: Meta = {
    limit: 10,
    page: 1,
};

interface StudentState {
    students: Student[];
    meta: Meta;
    loading: boolean;
    error: string | null;
    setStudents: (students: Student[], meta?: Meta) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getStudents: (params?: { page?: string, limit?: string, q?: string, batch?: string | number }) => Promise<void>;
    getStudent: (id: number | string) => Promise<Student | null>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
    students: [],
    meta: metaDefault,
    loading: false,
    error: null,
    setStudents: (students, meta = metaDefault) => set({ students, meta }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    getStudents: async (params = {}) => {
        set({ loading: true, error: null });
        const { page = 1, limit = 10, q = '', batch } = params;

        try {
            const queryParams: Record<string, string> = {
                page: String(page),
                limit: String(limit),
                q: q.trim(),
            };

            if (batch) {
                queryParams.batch = String(batch);
            }

            const query = new URLSearchParams(queryParams).toString();
            const res = await axios.get(`${APIPATHS.FETCHSTUDENTS}?${query}`);

            set({
                students: res.data?.data || [],
                meta: res.data?.meta || metaDefault,
                loading: false,
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal mengambil data siswa',
                loading: false,
            });
        }
    },

    getStudent: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`${APIPATHS.FINDSTUDENT}/${id}`);
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                loading: false,
                error: err?.response?.data?.message || err.message || 'Gagal mengambil data siswa',
            });
            return null;
        }
    }
}));
