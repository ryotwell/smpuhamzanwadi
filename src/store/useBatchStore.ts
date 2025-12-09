import { create } from 'zustand';
import { Batch } from '@/types/model';
import { Meta } from '@/types/api';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';

const metaDefault: Meta = {
    limit: 10,
    page: 1,
};

interface BatchState {
    batches: Batch[];
    meta: Meta;
    loading: boolean;
    error: string | null;
    setBatches: (batches: Batch[], meta?: Meta) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getBatches: (params?: { page?: string; limit?: string; q?: string }) => Promise<void>;
    addBatch: (data: Partial<Batch>) => Promise<Batch | null>;
    updateBatch: (id: number, data: Partial<Batch> & { is_active?: boolean }) => Promise<Batch | null>;
    updateBatchIsActive: (id: number, is_active: boolean) => Promise<Batch | null>;
    deleteBatch: (id: number) => Promise<boolean>;
}

export const useBatchStore = create<BatchState>((set, get) => ({
    batches: [],
    meta: metaDefault,
    loading: false,
    error: null,
    setBatches: (batches, meta = metaDefault) => set({ batches, meta }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    getBatches: async (params = {}) => {
        set({ loading: true, error: null });
        const { page = 1, limit = 10, q = '' } = params;

        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                q: q.trim(),
            }).toString();
            const res = await axios.get(`${APIPATHS.FETCHBATCHES}?${query}`);

            console.log(`${APIPATHS.FETCHBATCHES}?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`);

            set({
                batches: res.data?.data || [],
                meta: res.data?.meta || metaDefault,
                loading: false,
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal mengambil data batches',
                loading: false,
            });
        }
    },

    addBatch: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${APIPATHS.STOREBATCH}`, data);
            // Optionally, refresh the list
            await get().getBatches();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal menambah batch',
                loading: false,
            });
            return null;
        }
    },

    updateBatch: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`${APIPATHS.UPDATEBATCH}/${id}`, data);
            // Optionally, refresh the list
            await get().getBatches();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal memperbarui batch',
                loading: false,
            });
            return null;
        }
    },

    // New function specifically for updating is_active
    updateBatchIsActive: async (id, is_active) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`${APIPATHS.UPDATEBATCH}/${id}`, { is_active });
            // Optionally, refresh the list
            // await get().getBatches();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal memperbarui status aktif batch',
                loading: false,
            });
            return null;
        }
    },

    deleteBatch: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${APIPATHS.DELETEBATCH}/${id}`);
            // Optionally, refresh the list
            await get().getBatches();
            set({ loading: false });
            return true;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal menghapus batch',
                loading: false,
            });
            return false;
        }
    },
}));
