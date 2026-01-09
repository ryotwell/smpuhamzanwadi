import React from "react";
import type { Metadata } from "next";
import { DataTable } from "./comps/data-table";
import { getPosts } from "./comps/actions";
import { Meta } from "@/types/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Posts | Admin",
    description: "Admin panel page to manage posts in the SMPU Hamzanwadi website.",
};

export default async function PostsAdminPage({ searchParams }: { searchParams: Promise<{ page?: string, limit?: string, q?: string }> }) {
    const params = await searchParams

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const q = params?.q ?? "";

    const posts = await getPosts(page, limit, q);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <p className="text-theme-sm">Manage your posts.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/posts/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Post
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent>
                    <DataTable data={posts?.data ?? []} meta={posts?.meta as Meta} />
                </CardContent>
            </Card>
        </div>
    );
}
