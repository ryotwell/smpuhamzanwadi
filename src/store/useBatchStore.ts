import { create } from 'zustand';
import { Batch } from '@/types/model';
import { Meta } from '@/types/api';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';
import { toast } from 'sonner';

const metaDefault: Meta = {
    limit: 10,
    page: 1,
};

interface BatchState {
    batches: Batch[];
    meta: Meta;
    loading: boolean;
    activeBatch: Batch | null;
    getActiveBatch: () => Promise<void>;
    setBatches: (batches: Batch[], meta?: Meta) => void;
    setLoading: (loading: boolean) => void;
    getBatches: (params?: { page?: string; limit?: string; q?: string }) => Promise<void>;
    updateBatchIsActive: (id: number, is_active: boolean) => Promise<Batch | null>;
    deleteBatch: (id: number) => Promise<boolean>;
    getBatch: (id: number | string) => Promise<Batch | null>;
}

export const useBatchStore = create<BatchState>((set, get) => ({
    batches: [],
    meta: metaDefault,
    loading: false,
    activeBatch: null,
    setBatches: (batches, meta = metaDefault) => set({ batches, meta }),
    setLoading: (loading) => set({ loading }),
    getActiveBatch: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(APIPATHS.ACTIVEBATCH);
            set({ activeBatch: res.data?.data || null, loading: false });
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal mengambil data active batch';
            toast.error(message);
            set({ loading: false });
        }
    },
    getBatches: async (params = {}) => {
        set({ loading: true });
        const { page = 1, limit = 10, q = '' } = params;

        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                q: q.trim(),
            }).toString();
            const res = await axios.get(`${APIPATHS.FETCHBATCHES}?${query}`);

            set({
                batches: res.data?.data || [],
                meta: res.data?.meta || metaDefault,
                loading: false,
            });
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal mengambil data batches';
            toast.error(message);
            set({ loading: false });
        }
    },

    // New function specifically for updating is_active
    updateBatchIsActive: async (id, is_active) => {
        set({ loading: true });
        try {
            const res = await axios.put(`${APIPATHS.UPDATEBATCH}/${id}`, { is_active });
            await get().getBatches();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal memperbarui status aktif batch';
            toast.error(message);
            set({ loading: false });
            return null;
        }
    },

    deleteBatch: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${APIPATHS.DELETEBATCH}/${id}`);
            toast.success('Batch berhasil dihapus');
            await get().getBatches();
            set({ loading: false });
            return true;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal menghapus batch';
            toast.error(message);
            set({ loading: false });
            return false;
        }
    },


    getBatch: async (id) => {
        set({ loading: true });
        try {
            const res = await axios.get(`${APIPATHS.FINDBATCH}/${id}`);
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal mengambil data batch';
            toast.error(message);
            set({ loading: false });
            return null;
        }
    },
}));