import { NextRequest, NextResponse } from 'next/server'
import { extname } from 'path'
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

        // Create subfolder based on current year, e.g. "2024"
        const now = new Date();
        const currentYear = now.getFullYear().toString();

        const randomFilename = generateRandomFilename(file.name);
        // S3 Key: year/filename
        const key = `${currentYear}/${randomFilename}`;
        const BUCKET_NAME = "smpuhamzanwadi";

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: file.type,
            ACL: 'public-read'
        });

        await s3Client.send(command);
        console.log(`uploaded to s3: ${key}`);

        // Construct public URL
        const publicUrl = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`;

        console.log({
            path: key,
            fullUrl: publicUrl,
            name: randomFilename,
            type: file.type,
            size: file.size
        });


        return NextResponse.json({
            success: true,
            status: 200,
            message: 'File uploaded successfully',
            data: {
                path: key,
                fullUrl: publicUrl,
                name: randomFilename,
                type: file.type,
                size: file.size
            }
        }, { status: 200 })
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Internal server error',
            data: null
        }, { status: 500 })
    }
}
