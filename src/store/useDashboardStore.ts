import { create } from "zustand";
import axios from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";

export type ActiveBatch = {
    id: number;
    name: string;
    year: number;
    is_active: boolean;
    start_date: string;      // ISO date string
    end_date: string;        // ISO date string
    created_at: string;      // ISO date string
    updated_at: string;      // ISO date string
    students: any | null;    // Adjust type if structure known
};

export type DashboardData = {
    active_batch: ActiveBatch | null;
    total_batch: number;
    total_posts: number;
    total_students: number;
    total_students_active_batch: number;
};

export type DashboardAPIResponse = {
    success: boolean;
    status: number;
    message: string;
    data: DashboardData
};

type DashboardStore = {
    data: DashboardAPIResponse["data"] | null;
    loading: boolean;
    error: string | null;
    fetchDashboard: () => Promise<void>;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
    data: null,
    loading: true,
    error: null,
    fetchDashboard: async () => {
        set({ loading: true, error: null });
        try {
            const { data }: { data: DashboardAPIResponse } = await axios.get(APIPATHS.DASHBOARD);
            set({ data: data.data, loading: false, error: null });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err?.message || "Failed to fetch dashboard",
                loading: false,
            });
        }
    },
}));
