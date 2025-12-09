import React from "react";
import type { Metadata } from "next";
import { DataTable } from "./comps/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Fasilitas | Admin",
    description: "Admin panel untuk mengelola data fasilitas di website SMPU Hamzanwadi.",
};

export default async function FacilitiesAdminPage() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Fasilitas
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Kelola data fasilitas SMPU Hamzanwadi di sini.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button asChild>
                                <Link href="/admin/facilities/create">
                                    Tambah Fasilitas
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full">
                        <DataTable />
                    </div>
                </div>
            </div>

        </div>
    );
}

