"use server";

import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { Post } from "@/types/post";

export async function getPosts(page: number = 1, limit: number = 10, q: string) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_token")?.value;

    // console.log({ requesting: `/posts?page=${page}&limit=${limit}&q=${q}` });

    const response = await axios.get<{
      data: Post[];
      meta: {
        limit: number;
        page: number;
      };
    }>(`/posts?page=${page}&limit=${limit}&q=${q}`, {
      headers: sessionCookie
        ? {
            Cookie: `session_token=${sessionCookie}`,
          }
        : {}
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
