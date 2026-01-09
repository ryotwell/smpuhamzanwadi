import React from "react";
import CreatePostForm from "../comps/form";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Create New Post | Admin",
    description: "Admin panel page to create a new post in the SMPU Hamzanwadi website.",
};

export default function CreatePost() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Create New Posts</h1>
                    <p className="text-theme-sm">Create a new post.</p>
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
                            <CreatePostForm isUpdate={false} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
