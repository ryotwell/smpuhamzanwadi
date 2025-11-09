"use client";

import { useEffect, useState } from "react";
import React from "react";
import axios from "@/lib/axios";
import { Post, StandardApiResponse } from "@/types/post";

type PostApiResponse = StandardApiResponse & {
  data: Post;
};

const PostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const actualParams = React.use(params);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<PostApiResponse>(`/posts/${actualParams.slug}`);
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [actualParams.slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
