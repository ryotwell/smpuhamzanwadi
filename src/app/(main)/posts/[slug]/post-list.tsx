"use client"

import axios from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";
import { formatDateWithDayName } from "@/lib/utils";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/model";

import Link from "next/link";
import React, { FC } from "react";

interface IPostListProps { };

export const PostList: FC<IPostListProps> = (props) => {
    const { posts, getPosts } = usePostStore()

    React.useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {posts.map((post) => {
                return (
                    <Link href={`/posts/${post.slug}`} className="flex" key={post.slug}>
                        {post.thumbnail && (
                            <div className="w-2/6 mr-5">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="rounded-lg mb-4 w-full object-cover"
                                />
                            </div>
                        )}
                        <div className="w-4/6">
                            <p className="text-muted-foreground">{formatDateWithDayName(post.created_at)}</p>
                            <h1 className="text-xl font-bold">{post.title}</h1>
                            <p className="text-sm text-muted-foreground">{post.description}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    );
}
