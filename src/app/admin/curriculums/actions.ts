"use server";

import axios from "@/lib/axios";
import { Curriculum } from "@/types/model";
import { APIPATHS } from "@/lib/constants";
import { buildHeaders } from "@/lib/server.utils";
import { StandardAxiosResponse } from "@/types/api";

export async function getCurriculums(page = 1, limit = 10, q = "") {
    try {
        const headers = await buildHeaders();
        const query = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            q: q.trim(),
        }).toString();

        const { data: { data, meta } }: StandardAxiosResponse<Curriculum[]> = await axios.get(
            `${APIPATHS.FETCHCURRICULUMS}?${query}`,
            { headers }
        );

        return { data, meta }
    } catch (error) {
        console.error("Failed to fetch Curriculums:", error);
        return null;
    }
}

export async function getCurriculum(id: number | string): Promise<Curriculum | null> {
    try {
        const headers = await buildHeaders();
        const { data: { data } }: StandardAxiosResponse<Curriculum> = await axios.get(
            `${APIPATHS.FINDCURRICULUM}/${id}`,
            { headers }
        );
        return data;
    } catch (error) {
        console.error(`Failed to fetch curriculum with id ${id}:`, error);
        return null;
    }
}

