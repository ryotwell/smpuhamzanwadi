"use server";

import axios from "@/lib/axios";
import { Student } from "@/types/model";
import { APIPATHS } from "@/lib/constants";
import { buildHeaders } from "@/lib/server.utils";
import { StandardAxiosResponse } from "@/types/api";

export async function getStudents({ page = 1, limit = 10, q = "", batch }: { page: number, limit: number, q: string, batch?: number }) {
    try {
        const headers = await buildHeaders();
        const params: Record<string, string> = {
            page: String(page),
            limit: String(limit),
            q: q.trim(),
        };

        if (typeof batch === "number" && !Number.isNaN(batch)) {
            params.batch = String(batch);
        }

        const query = new URLSearchParams(params).toString();

        const { data: { data, meta } }: StandardAxiosResponse<Student[]> = await axios.get(
            `${APIPATHS.FETCHSTUDENTS}?${query}`,
            { headers }
        );

        return { data, meta }
    } catch (error) {
        console.error("Failed to fetch students:", error);
        return null;
    }
}

export async function getStudent(id: number | string): Promise<Student | null> {
    try {
        const headers = await buildHeaders();
        const { data: { data } }: StandardAxiosResponse<Student> = await axios.get(
            `${APIPATHS.FINDSTUDENT}/${id}`,
            { headers }
        );
        return data;
    } catch (error) {
        console.error(`Failed to fetch student with id ${id}:`, error);
        return null;
    }
}