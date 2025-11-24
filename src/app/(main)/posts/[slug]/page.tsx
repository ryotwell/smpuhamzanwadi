import React from "react";

import { APIPATHS } from "@/lib/constants";
import axios from "@/lib/axios";

import { Header } from "../../header";

import { Post } from "@/types/model";
import { StandardApiResponse } from "@/types/api";

import "../../../tinymce.css";
import { PostDetail } from "./post-detail";
import { PostList } from "./post-list";

export const dynamic = "force-dynamic";

type PostApiResponse = StandardApiResponse & {
    data: Post;
};

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const actualParams = await params;

    try {
        const response = await axios.get<PostApiResponse>(`${APIPATHS.FINDPOST}/${actualParams.slug}`);
        const post = response.data.data;

        return <ShowPost post={post} />
    } catch (error) {
        console.error(error);

        return (
            <div className="flex justify-center items-center h-dvh">
                <h1 className="text-xl font-bold">Post Not Found!</h1>
            </div>
        )
    }
};

const ShowPost = ({ post }: { post: Post }) => {
    return (
        <div className="mx-auto py-8 transition-colors duration-300">
            <Header />
            <div className="lg:flex mx-auto pt-28 lg:pt-32 px-8">
                <div className="w-full lg:w-3/5 mb-5">
                    <PostDetail post={post} />
                </div>
                <div className="w-full lg:w-2/5 lg:ml-5">
                    <PostList />
                </div>
            </div>
        </div>
    )
}

export default PostPage;
