import React from "react";
import Image from "next/image";

import { APIPATHS } from "@/lib/constants";
import axios from "@/lib/axios";

import { Header } from "../../header";

import { Post } from "@/types/model";
import { StandardApiResponse } from "@/types/api";

import "../../../tinymce.css";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PostApiResponse = StandardApiResponse & {
    data: Post;
};

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const actualParams = await params;

    try {
        const response = await axios.get<PostApiResponse>(`${APIPATHS.FINDPOST}/${actualParams.slug}`);
        const post = response.data.data;

        return <PostDetail post={post} />
    } catch (error) {
        console.log(error);

        return (
            <div className="flex justify-center items-center h-dvh">
                <h1 className="text-xl font-bold">Post Not Found!</h1>
            </div>
        )
    }
};

const PostDetail = ({ post }: { post: Post }) => {
    return (
        <div className="mx-auto py-8 transition-colors duration-300">
            {/* <div className="bg-white dark:bg-gray-950 mb-28 transition-colors duration-300 min-h-screen flex flex-col"></div> */}
            <Header />
            {/* <section className="max-w-5xl mx-auto mt-24 px-4"> */}
            <div className="md:flex mx-auto pt-28 md:pt-32 px-8">
                <div className="w-full md:w-3/5">
                    {post.thumbnail ? (
                        <div className="mb-6">
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                width={800}
                                height={450}
                                className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                            />
                        </div>
                    ) : null}
                    <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <span>
                            Dipublikasikan:{" "}
                            <time dateTime={post.created_at}>
                                {formatDate(post.created_at)}
                            </time>
                        </span>
                        {post.category && (
                            <span>
                                {" | "}
                                Kategori: <span className="font-semibold text-primary">{post.category}</span>
                            </span>
                        )}
                    </div>
                    <hr className="my-6 border-t border-gray-300 dark:border-gray-600" />
                    <div className="tinymce-content bg-red-500" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                <div className="bg-blue-500 w-full md:w-2/5">
                    Hello
                </div>
            </div>
        </div>
    )
}

export default PostPage;
