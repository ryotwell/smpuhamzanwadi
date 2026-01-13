import { create } from 'zustand';
import { Requirement } from '@/types/model';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';
import { toast } from 'sonner';

interface RequirementStore {
    requirements: Requirement[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    getRequirements: () => Promise<void>;
    addRequirement: (data: Partial<Requirement>) => Promise<Requirement | null>;
    updateRequirement: (id: number, data: Partial<Requirement>) => Promise<Requirement | null>;
    deleteRequirement: (id: number) => Promise<boolean>;
}

export const useRequirementStore = create<RequirementStore>((set, get) => ({
    requirements: [],
    loading: false,
    setLoading: (loading) => set({ loading }),

    getRequirements: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(APIPATHS.FETCHREQUIREMENTS);
            set({ requirements: res.data?.data || [], loading: false });
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal mengambil data requirements';
            toast.error(message);
            set({ loading: false });
        }
    },

    addRequirement: async (data) => {
        set({ loading: true });
        try {
            const res = await axios.post(APIPATHS.STOREREQUIREMENT, data);
            await get().getRequirements();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal menambah requirement';
            toast.error(message);
            set({ loading: false });
            return null;
        }
    },

    updateRequirement: async (id, data) => {
        set({ loading: true });
        try {
            const res = await axios.put(`${APIPATHS.UPDATEREQUIREMENT}/${id}`, data);
            await get().getRequirements();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal memperbarui requirement';
            toast.error(message);
            set({ loading: false });
            return null;
        }
    },

    deleteRequirement: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${APIPATHS.DELETEREQUIREMENT}/${id}`);
            await get().getRequirements();
            set({ loading: false });
            return true;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal menghapus requirement';
            toast.error(message);
            set({ loading: false });
            return false;
        }
    },
}));
