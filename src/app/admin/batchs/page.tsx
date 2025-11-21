import React from "react";
import type { Metadata } from "next";
import { DataTable } from "./comps/data-table";
import { getBatchs } from "./actions";
import { Meta } from "@/types/api";

export const metadata: Metadata = {
    title: "Batch | Admin",
    description: "Admin panel page untuk mengelola batch pada website SMPU Hamzanwadi.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string, limit?: string, q?: string }> }) {
    const params = await searchParams

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const q = params?.q ?? "";

    const batchs = await getBatchs(page, limit, q);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Batch
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Kelola data batch tahun ajaran SMPU Hamzanwadi di sini.
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        <DataTable data={batchs?.data ?? []} meta={batchs?.meta as Meta} />
                    </div>
                </div>
            </div>

        </div>
    );
}
