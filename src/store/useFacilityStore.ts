import { create } from 'zustand';
import { Facility } from '@/types/model';
import { Meta } from '@/types/api';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';

const metaDefault: Meta = {
    limit: 10,
    page: 1,
};

interface FacilityState {
    facilities: Facility[];
    meta: Meta;
    loading: boolean;
    error: string | null;
    setFacilities: (facilities: Facility[], meta?: Meta) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getFacilities: (params?: { page?: string; limit?: string; q?: string }) => Promise<void>;
    addFacility: (data: Partial<Facility>) => Promise<Facility | null>;
    updateFacility: (id: number, data: Partial<Facility>) => Promise<Facility | null>;
    deleteFacility: (id: number) => Promise<boolean>;
}

export const useFacilityStore = create<FacilityState>((set, get) => ({
    facilities: [],
    meta: metaDefault,
    loading: false,
    error: null,
    setFacilities: (facilities, meta = metaDefault) => set({ facilities, meta }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    getFacilities: async (params = {}) => {
        set({ loading: true, error: null });
        const { page = 1, limit = 10, q = '' } = params;

        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                q: q.trim(),
            }).toString();
            const res = await axios.get(`${APIPATHS.FETCHFACILITIES}?${query}`);

            set({
                facilities: res.data?.data || [],
                meta: res.data?.meta || metaDefault,
                loading: false,
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal mengambil data fasilitas',
                loading: false,
            });
        }
    },

    addFacility: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${APIPATHS.STOREFACILITY}`, data);
            // Optionally, refresh the list
            await get().getFacilities();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal menambah fasilitas',
                loading: false,
            });
            return null;
        }
    },

    updateFacility: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`${APIPATHS.UPDATEFACILITY}/${id}`, data);
            // Optionally, refresh the list
            await get().getFacilities();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal memperbarui fasilitas',
                loading: false,
            });
            return null;
        }
    },

    deleteFacility: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${APIPATHS.DELETEFACILITY}/${id}`);
            // Optionally, refresh the list
            await get().getFacilities();
            set({ loading: false });
            return true;
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal menghapus fasilitas',
                loading: false,
            });
            return false;
        }
    },
}));

