"use server";

import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { Post } from "@/types/post";
import { APIPATHS } from "@/lib/constants";

export async function getPosts(page: number = 1, limit: number = 10, q: string) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_token")?.value;

    const response = await axios.get<{
      data: Post[];
      meta: {
        limit: number;
        page: number;
      };
    }>(`${APIPATHS.FETCHPOSTS}?page=${page}&limit=${limit}&q=${q}`, {
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

// ADD: Get post by slug
export async function getPostBySlug(slug: string) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_token")?.value;

    const response = await axios.get<{ data: Post }>(
      `${APIPATHS.FINDPOST}/${encodeURIComponent(slug)}`,
      {
        headers: sessionCookie
          ? {
              Cookie: `session_token=${sessionCookie}`,
            }
          : {},
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
