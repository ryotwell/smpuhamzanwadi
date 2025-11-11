import React from "react";
import type { Metadata } from "next";
import EditPostForm from "./form";
import { getPostBySlug } from "../../comps/actions";

export const metadata: Metadata = {
    title: "Edit Post | Admin",
    description: "Admin panel page to edit an existing post in the SMPU Hamzanwadi website.",
};

export default async function EditPostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug)

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">

            <div className="col-span-12 space-y-6 xl:col-span-7">
                <EditPostForm initialValues={{
                    title: post?.title,
                    thumbnail: post?.thumbnail,
                    description: post?.description,
                    content: post?.content.replaceAll("../../", "../../../"),
                    published: post?.published,
                    publishedAt: post?.published_at,
                    category: post?.category as "BERITA" | "ARTIKEL" | "INFORMASI" | undefined,
                }} isUpdate={true} editId={post?.slug} />
            </div>

            <div className="col-span-12 space-y-6 xl:col-span-5">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Edit Info
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Sesuaikan data postingan yang ingin diperbarui.
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        Halaman ini digunakan untuk mengedit sebuah postingan yang sudah ada. Pastikan perubahan data sudah benar sebelum menyimpan.
                    </div>
                </div>
            </div>
        </div>
    );
}
