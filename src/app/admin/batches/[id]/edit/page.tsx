import React from "react";
import type { Metadata } from "next";
import { BatchForm } from "../../comps/form";
import { getBatch } from "../../actions";

export const metadata: Metadata = {
    title: "Edit Data Angkatan | Admin",
    description: "Admin panel untuk mengedit data angkatan SMPU Hamzanwadi.",
};

export default async function EditBatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const batch = await getBatch(id);

    if (!batch) {
        return (
            <div>
                Data angkatan tidak ditemukan!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12 space-y-6 xl:col-span-7">
                <BatchForm batch={batch} formMode="UPDATE" />
            </div>

        </div>
    );
}
