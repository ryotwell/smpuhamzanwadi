"use server";

import axios from "@/lib/axios";
import { Facility } from "@/types/model";
import { APIPATHS } from "@/lib/constants";
import { buildHeaders } from "@/lib/server.utils";
import { StandardAxiosResponse } from "@/types/api";

export async function getFacilities(page = 1, limit = 10, q = "") {
    try {
        const headers = await buildHeaders();
        const query = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            q: q.trim(),
        }).toString();

        const { data: { data, meta } }: StandardAxiosResponse<Facility[]> = await axios.get(
            `${APIPATHS.FETCHFACILITIES}?${query}`,
            { headers }
        );

        return { data, meta }
    } catch (error) {
        console.error("Failed to fetch Facilities:", error);
        return null;
    }
}

export async function getFacility(id: number | string): Promise<Facility | null> {
    try {
        const headers = await buildHeaders();
        const { data: { data } }: StandardAxiosResponse<Facility> = await axios.get(
            `${APIPATHS.FINDFACILITY}/${id}`,
            { headers }
        );
        return data;
    } catch (error) {
        console.error(`Failed to fetch facility with id ${id}:`, error);
        return null;
    }
}

