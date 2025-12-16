import { create } from 'zustand';
import { Faq } from '@/types/model';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';
import { toast } from 'sonner';

interface FaqStore {
    faqs: Faq[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    getFaqs: () => Promise<void>;
    addFaq: (data: Partial<Faq>) => Promise<Faq | null>;
    updateFaq: (id: number, data: Partial<Faq>) => Promise<Faq | null>;
    deleteFaq: (id: number) => Promise<boolean>;
}

export const useFaqStore = create<FaqStore>((set, get) => ({
    faqs: [],
    loading: false,
    setLoading: (loading) => set({ loading }),

    getFaqs: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(APIPATHS.FETCHFAQS);
            set({ faqs: res.data?.data || [], loading: false });
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal mengambil data faqs';
            toast.error(message);
            set({ loading: false });
        }
    },

    addFaq: async (data) => {
        set({ loading: true });
        try {
            const res = await axios.post(APIPATHS.STOREFAQ, data);
            await get().getFaqs();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal menambah faq';
            toast.error(message);
            set({ loading: false });
            return null;
        }
    },

    updateFaq: async (id, data) => {
        set({ loading: true });
        try {
            const res = await axios.put(`${APIPATHS.UPDATEFAQ}/${id}`, data);
            await get().getFaqs();
            set({ loading: false });
            return res.data?.data || null;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal memperbarui faq';
            toast.error(message);
            set({ loading: false });
            return null;
        }
    },

    deleteFaq: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${APIPATHS.DELETEFAQ}/${id}`);
            await get().getFaqs();
            set({ loading: false });
            return true;
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Gagal menghapus faq';
            toast.error(message);
            set({ loading: false });
            return false;
        }
    },
}));
