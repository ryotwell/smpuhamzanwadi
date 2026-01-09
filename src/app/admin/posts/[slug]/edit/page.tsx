import type { Metadata } from "next";
import EditPostForm from "../../comps/form";
import { getPostBySlug } from "../../comps/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Edit Post | Admin",
    description: "Admin panel page to edit an existing post in the SMPU Hamzanwadi website.",
};

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug)

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Edit Post</h1>
                    <p className="text-theme-sm">Edit an existing post.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/posts">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Posts
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <Card>
                        <CardContent>
                            <EditPostForm
                                initialValues={{
                                    title: post?.title,
                                    thumbnail: post?.thumbnail,
                                    description: post?.description,
                                    content: post?.content.replaceAll("../../", "../../../"),
                                    published: post?.published,
                                    publishedAt: post?.published_at,
                                    category: post?.category as "BERITA" | "ARTIKEL" | "INFORMASI" | undefined,
                                }}
                                isUpdate={true}
                                editId={post?.slug}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
