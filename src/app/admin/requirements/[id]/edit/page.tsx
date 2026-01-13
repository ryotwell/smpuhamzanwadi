"use client"

import React, { useEffect, useState } from "react";
import { RequirementForm } from "../../comps/form";
import { Requirement } from "@/types/model";
import axios from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";
import { useParams } from "next/navigation";

export default function EditRequirement() {
    const params = useParams();
    const id = params.id;
    const [requirement, setRequirement] = useState<Requirement | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequirement = async () => {
            if (!id) return;
            try {
                const res = await axios.get(`${APIPATHS.FINDREQUIREMENT}/${id}`);
                setRequirement(res.data?.data);
            } catch (error) {
                console.error("Failed to fetch requirement", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequirement();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
                <RequirementForm formMode="UPDATE" requirement={requirement} />
            </div>
        </div>
    );
}
