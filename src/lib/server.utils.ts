import { cookies } from "next/headers";

export const getSessionCookie = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("session_token")?.value;
};

export const buildHeaders = async () => {
    const sessionCookie = await getSessionCookie();
    return sessionCookie
        ? { Cookie: `session_token=${sessionCookie}` }
        : {};
};