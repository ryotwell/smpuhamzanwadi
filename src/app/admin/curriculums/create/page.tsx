import React from "react";
import { CurriculumForm } from "../comps/form";
import type { Metadata } from "next";
import { Curriculum } from "@/types/model";

export const metadata: Metadata = {
    title: "Buat Kurikulum Baru | Admin",
    description: "Halaman admin untuk membuat kurikulum baru di website SMPU Hamzanwadi.",
};

export default function CreateCurriculum() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12 space-y-6 xl:col-span-7">
                <CurriculumForm
                    formMode="CREATE" 
                    curriculum={{} as Curriculum}
                />
            </div>

            <div className="col-span-12 space-y-6 xl:col-span-5">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Informasi
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Pastikan data yang diisi sudah benar dan lengkap.
                            </p>
                        </div>
                    </div>

                    <div className="w-full text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">Formulir ini digunakan untuk menambah kurikulum baru ke dalam sistem.</p>
                        <p>Pastikan:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Nama kurikulum diisi dengan jelas</li>
                            <li>Kategori dipilih sesuai jenis kurikulum</li>
                            <li>Gambar sesuai format yang diminta</li>
                            <li>Deskripsi menjelaskan kurikulum secara lengkap</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
