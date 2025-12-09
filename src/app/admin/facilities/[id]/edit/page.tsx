import React from "react";
import type { Metadata } from "next";
import { FacilityForm } from "../../comps/form";
import { getFacility } from "../../actions";

export const metadata: Metadata = {
    title: "Edit Fasilitas | Admin",
    description: "Admin panel untuk mengedit data fasilitas SMPU Hamzanwadi.",
};

export default async function EditFacilityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const facility = await getFacility(id);

    if (!facility) {
        return (
            <div>
                Data fasilitas tidak ditemukan!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12 space-y-6 xl:col-span-7">
                <FacilityForm facility={facility} formMode="UPDATE" />
            </div>

        </div>
    );
}

