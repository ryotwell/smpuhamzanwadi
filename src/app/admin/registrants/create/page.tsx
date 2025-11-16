import React from "react";
import type { Metadata } from "next";
import { StudentForm } from "@/app/admin/registrants/comps/form";
import { DEFAULT_STUDENT, Student } from "@/types/model";

export const metadata: Metadata = {
    title: "Edit Data Peserta | Admin",
    description: "Admin panel untuk mengedit data peserta SMPU Hamzanwadi.",
};

export default async function EditRegistrantPage() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <StudentForm student={DEFAULT_STUDENT as Student} formMode="CREATE" />
        </div>
    );
}
