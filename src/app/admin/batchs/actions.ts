"use server";

import axios from "@/lib/axios";
import { Batch } from "@/types/model";
import { APIPATHS } from "@/lib/constants";
import { buildHeaders } from "@/lib/server.utils";
import { StandardAxiosResponse } from "@/types/api";

export async function getBatchs(page = 1, limit = 10, q = "") {
    try {
        const headers = await buildHeaders();
        const query = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            q: q.trim(),
        }).toString();

        const { data: { data, meta } }: StandardAxiosResponse<Batch[]> = await axios.get(
            `${APIPATHS.FETCHBATCHS}?${query}`,
            { headers }
        );

        return { data, meta }
    } catch (error) {
        console.error("Failed to fetch batchs:", error);
        return null;
    }
}

export async function getBatch(id: number | string): Promise<Batch | null> {
    try {
        const headers = await buildHeaders();
        const { data: { data } }: StandardAxiosResponse<Batch> = await axios.get(
            `${APIPATHS.FINDBATCH}/${id}`,
            { headers }
        );
        return data;
    } catch (error) {
        console.error(`Failed to fetch batch with id ${id}:`, error);
        return null;
    }
}