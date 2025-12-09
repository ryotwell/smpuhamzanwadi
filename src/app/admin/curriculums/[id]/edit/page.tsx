import React from "react";
import type { Metadata } from "next";
import { CurriculumForm } from "../../comps/form";
import { getCurriculum } from "../../actions";

export const metadata: Metadata = {
    title: "Edit Kurikulum | Admin",
    description: "Admin panel untuk mengedit data kurikulum SMPU Hamzanwadi.",
};

export default async function EditCurriculumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const curriculum = await getCurriculum(id);

    if (!curriculum) {
        return (
            <div>
                Data kurikulum tidak ditemukan!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12 space-y-6 xl:col-span-7">
                <CurriculumForm curriculum={curriculum} formMode="UPDATE" />
            </div>

        </div>
    );
}

