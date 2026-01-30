import { getBucketFiles } from "@/actions/s3/get-files";
import { NextResponse } from "next/server";

export async function GET() {
    const { data } = await getBucketFiles();

    return NextResponse.json(data)
}