"use client"

import React, { useEffect, useState } from "react";
import { FaqForm } from "../../comps/form";
import { Faq } from "@/types/model";
import axios from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";
import { useParams } from "next/navigation";

export default function EditFaq() {
    const params = useParams();
    const id = params.id;
    const [faq, setFaq] = useState<Faq | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaq = async () => {
            if (!id) return;
            try {
                const res = await axios.get(`${APIPATHS.FINDFAQ}/${id}`);
                setFaq(res.data?.data);
            } catch (error) {
                console.error("Failed to fetch faq", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaq();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
                <FaqForm formMode="UPDATE" faq={faq} />
            </div>
        </div>
    );
}
