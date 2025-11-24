import { formatDate } from "@/lib/utils";
import { Post } from "@/types/model";
import Image from "next/image";
import { FC } from "react";

interface IPostDetailProps {
    post: Post
};

export const PostDetail: FC<IPostDetailProps> = ({ post }) => {
    return (
        <>
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
            <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
    );
}
