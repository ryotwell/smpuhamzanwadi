"use client"

import { formatDateWithDayName } from "@/lib/utils";
import { usePostStore } from "@/store/usePostStore";

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
                    <Link href={`/posts/${post.slug}`} className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-6 group" key={post.slug}>
                        {post.thumbnail && (
                            <div className="w-full md:w-2/6">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="rounded-lg w-full object-cover aspect-video group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                        )}
                        <div className="w-full md:w-4/6">
                            <p className="text-muted-foreground">{formatDateWithDayName(post.created_at)}</p>
                            <h1 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h1>
                            <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    );
}
