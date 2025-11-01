import React from "react";
import CreatePostForm from "./form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create New Post | Admin",
    description: "Admin panel page to create a new post in the SMPU Hamzanwadi website.",
};

export default function CreatePost() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12 space-y-6 xl:col-span-7">
                <CreatePostForm />
            </div>

            <div className="col-span-12 space-y-6 xl:col-span-5">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Example
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Lorem ipsum dolor sit.
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam ab reprehenderit ex.
                    </div>
                </div>
            </div>
        </div>
    );
}
