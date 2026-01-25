import React from "react";
import type { Metadata } from "next";
import { DataTable } from "./comps/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Posts | Admin",
    description: "Admin panel page to manage posts in the SMPU Hamzanwadi website.",
};

export default function PostsAdminPage() {
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
                    <DataTable />
                </CardContent>
            </Card>
        </div>
    );
}
