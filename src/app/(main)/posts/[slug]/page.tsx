import React from "react";
import axios from "@/lib/axios";
import { Post, StandardApiResponse } from "@/types/post";
import Image from "next/image";
import "../../../tinymce.css"
import { Header } from "../../header";

type PostApiResponse = StandardApiResponse & {
  data: Post;
};

// Helper for date formatting
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const actualParams = await params;

  try {
    const response = await axios.get<PostApiResponse>(`/posts/${actualParams.slug}`);
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
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* <div className="bg-white dark:bg-gray-950 mb-28 transition-colors duration-300 min-h-screen flex flex-col"></div> */}
      <Header />
      <div className="flex pt-28">
        <div className="w-3/5">
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
          {/* Dipublikasikan dan Kategori */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
            <span>
              Dipublikasikan:{" "}
              <time dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
            </span>
            {/* Kategori */}
            {post.category && (
              <span>
                {" | "}
                Kategori: <span className="font-semibold text-primary">{post.category}</span>
              </span>
            )}
          </div>
          <hr className="my-6 border-t border-gray-300 dark:border-gray-600" />
          <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="bg-blue-500 w-2/5">
          Hello
        </div>
      </div>
    </div>
  )
}

export default PostPage;
