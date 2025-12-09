import { create } from 'zustand';
import { Curriculum } from '@/types/model';
import { Meta } from '@/types/api';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';

const metaDefault: Meta = {
    limit: 10,
    page: 1,
};

interface CurriculumState {
    curriculums: Curriculum[];
    meta: Meta;
    loading: boolean;
    error: string | null;
    setCurriculums: (curriculums: Curriculum[], meta?: Meta) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getCurriculums: (params?: { page?: string; limit?: string; q?: string }) => Promise<void>;
    addCurriculum: (data: Partial<Curriculum>) => Promise<Curriculum | null>;
    updateCurriculum: (id: number, data: Partial<Curriculum>) => Promise<Curriculum | null>;
    deleteCurriculum: (id: number) => Promise<boolean>;
}

export const useCurriculumStore = create<CurriculumState>((set, get) => ({
    curriculums: [],
    meta: metaDefault,
    loading: false,
    error: null,
    setCurriculums: (curriculums, meta = metaDefault) => set({ curriculums, meta }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    getCurriculums: async (params = {}) => {
        set({ loading: true, error: null });
        const { page = 1, limit = 10, q = '' } = params;

        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                q: q.trim(),
            }).toString();
            const res = await axios.get(`${APIPATHS.FETCHCURRICULUMS}?${query}`);

            set({
                curriculums: res.data?.data || [],
                meta: res.data?.meta || metaDefault,
                loading: false,
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal mengambil data kurikulum',
                loading: false,
            });
        }
    },

    addCurriculum: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${APIPATHS.STORECURRICULUM}`, data);
            // Optionally, refresh the list
            await get().getCurriculums();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal menambah kurikulum',
                loading: false,
            });
            return null;
        }
    },

    updateCurriculum: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`${APIPATHS.UPDATECURRICULUM}/${id}`, data);
            // Optionally, refresh the list
            await get().getCurriculums();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal memperbarui kurikulum',
                loading: false,
            });
            return null;
        }
    },

    deleteCurriculum: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${APIPATHS.DELETECURRICULUM}/${id}`);
            // Optionally, refresh the list
            await get().getCurriculums();
            set({ loading: false });
            return true;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal menghapus kurikulum',
                loading: false,
            });
            return false;
        }
    },
}));

