import { create } from 'zustand'
import { Post } from '@/types/model';
import { Meta } from '@/types/api';
import axios from '@/lib/axios';
import { APIPATHS } from '@/lib/constants';

interface PostState {
    posts: Post[];
    meta?: Meta | null;
    loading: boolean;
    error: string | null;
    setPosts: (posts: Post[], meta?: Meta | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getPosts: (params?: { page?: number; limit?: number; q?: string }) => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    meta: null,
    loading: false,
    error: null,
    setPosts: (posts, meta = null) => set({ posts, meta }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    getPosts: async (params = {}) => {
        set({ loading: true, error: null });
        const { page = 1, limit = 10, q = '' } = params;

        try {
            const res = await axios.get(`${APIPATHS.FETCHPOSTS}?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`);            

            set({
                posts: res.data?.data || [],
                meta: res.data?.data?.meta || null,
                loading: false
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err.message || 'Gagal mengambil data posts',
                loading: false
            });
        }
    },
}));
