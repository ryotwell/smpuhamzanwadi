import React from "react";
import type { Metadata } from "next";
import { StudentForm } from "../../comps/form";
import { getStudent } from "@/app/admin/registrants/actions";

export const metadata: Metadata = {
    title: "Edit Data Peserta | Admin",
    description: "Admin panel untuk mengedit data peserta SMPU Hamzanwadi.",
};

export default async function EditRegistrantPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const student = await getStudent(id);

    if (!student) {
        return (
            <div>
                Data peserta tidak ditemukan!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <StudentForm student={student} />
        </div>
    );
}
