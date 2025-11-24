"use client"

import axios from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";
import { formatDateWithDayName } from "@/lib/utils";
import { Post } from "@/types/model";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
interface IPostListProps { };

export const PostList: FC<IPostListProps> = (props) => {
    const [posts, setPosts] = React.useState<Post[]>([]);

    const getPosts = async () => {
        const { data: { data } } = await axios.get(APIPATHS.FETCHPOSTS + '?limit=3');
        setPosts(data);
    };

    React.useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {posts.map((post, key) => {
                return (
                    <Link href="/" className="flex" key={key}>
                        {post.thumbnail && (
                            <div className="w-2/6 mr-5">
                                <Image
                                    src={post.thumbnail}
                                    alt={post.title}
                                    width={320}
                                    height={180}
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
