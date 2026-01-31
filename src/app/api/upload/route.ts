import { NextRequest, NextResponse } from 'next/server'
import { extname } from 'path'
import { config } from '@/config'
import crypto from 'crypto'
import { cookies } from 'next/headers'
import axios from '@/lib/axios'
import { APIPATHS } from '@/lib/constants'
import { s3Client } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

// Helper function to generate a random filename with the original extension
function generateRandomFilename(originalName: string) {
    const ext = extname(originalName) || '';
    const randomStr = crypto.randomBytes(16).toString('hex');
    return `${Date.now()}-${randomStr}${ext}`;
}

// Helper function to check authentication
async function checkAuthenticated() {
    const cookieStore = await cookies();
    const session_token = cookieStore.get('session_token');
    if (!session_token || !session_token.value) {
        return { isAuthenticated: false, error: 'Unauthorized: No session token found' };
    }
    try {
        await axios.get(APIPATHS.PROFILE, {
            headers: {
                Cookie: `session_token=${session_token.value}`,
            }
        });
        return { isAuthenticated: true };
    } catch {
        return { isAuthenticated: false, error: 'Unauthorized: Invalid session token' };
    }
}

export async function POST(request: NextRequest) {
    try {
        // ---- Check is authenticated ----
        const authResult = await checkAuthenticated();
        if (!authResult.isAuthenticated) {
            return NextResponse.json({
                success: false,
                status: 401,
                message: authResult.error,
                data: null
            }, { status: 401 });
        }

        // ------------- Continue upload logic as normal -------------
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'No file uploaded',
                data: null
            }, { status: 400 })
        }

        // Validate MIME type
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']
        if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'Invalid file type. Only PNG, JPG, and JPEG are allowed',
                data: null
            }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create S3 key based on current year like local folder structure
        const now = new Date();
        const currentYear = now.getFullYear().toString();

        const randomFilename = generateRandomFilename(file.name);
        // S3 Key: year/filename
        const key = `${currentYear}/${randomFilename}`;

        // Upload to S3
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: file.type,
            // ACL: 'public-read', // Depends on bucket setting, often not needed if bucket policy is public or using protected URLs
        });

        await s3Client.send(command);

        // Construct Public URL
        // Assume endpoint is like http://host/bucket or http://bucket.host
        // Based on user provided .env: S3_ENDPOINT=http://... and S3_BUCKET_NAME
        // If forcePathStyle is true (often for self-hosted S3/MinIO), URL is endpoint/bucket/key
        // If not, it's bucket.endpoint/key

        // Let's assume standard path style for MinIO/compatible
        // Remove trailing slash from endpoint if present
        const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, '');
        const bucket = process.env.S3_BUCKET_NAME;

        // Construct full URL
        const fullUrl = `${endpoint}/${bucket}/${key}`;

        // Return path relative to the bucket or just the key - keeping consistency with frontend expectations might be tricky.
        // Frontend "preview" logic seems to check if it's absolute URL or relative.
        // Let's return the full URL as `path` too, or just the key if we want to change frontend logic heavily.
        // The previous code returned `path: /upload/year/filename` (relative to public).
        // If we return full URL, frontend might treat it as remote.

        return NextResponse.json({
            success: true,
            status: 200,
            message: 'File uploaded successfully',
            data: {
                path: fullUrl, // Changing this to full URL for simplicity in frontend handling of "remote"
                fullUrl: fullUrl,
                name: randomFilename,
                type: file.type,
                size: file.size
            }
        }, { status: 200 })
    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Internal server error',
            data: null
        }, { status: 500 })
    }
}
