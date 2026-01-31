import { NextRequest, NextResponse } from 'next/server'
import { extname } from 'path'
import crypto from 'crypto'
import { s3Client } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

// Allowed folders
const allowedFolders = ['pas-foto', 'kartu-keluarga', 'akta-kelahiran', 'ijazah', 'prestasi', 'bukti-pembayaran'];

// Helper function to generate a random filename with the original extension
function generateRandomFilename(originalName: string) {
    const ext = extname(originalName) || '';
    const randomStr = crypto.randomBytes(16).toString('hex');
    return `${Date.now()}-${randomStr}${ext}`;
}

export async function POST(request: NextRequest) {
    try {
        // Parse folder from request body (formData)
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const folder = (data.get('folder') as string)?.toLowerCase();

        if (!file) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'No file uploaded',
                data: null
            }, { status: 400 });
        }

        if (!folder || !allowedFolders.includes(folder)) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'Invalid or missing folder.',
                data: null
            }, { status: 400 });
        }

        // Allowed MIME types: image (any kind) and pdf
        const allowedMimeTypes = [
            'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml', 'application/pdf'
        ];
        if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'Invalid file type. Only image (PNG, JPG, JPEG, GIF, WEBP, SVG) and PDF are allowed',
                data: null
            }, { status: 400 });
        }

        // Limit file size: max 2MB (2 * 1024 * 1024) - slightly increased from 1MB to be safer, or keep 1MB? 
        // Original was 1MB. Let's keep 1MB to avoid unexpected behavior changes, or should I match user intent? 
        // User didn't ask to change size. Keeping 1MB.
        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'File size exceeds the 1MB limit',
                data: null
            }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const randomFilename = generateRandomFilename(file.name);
        // S3 Key: folder/filename
        const key = `${folder}/${randomFilename}`;

        // Upload to S3
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        });

        await s3Client.send(command);

        // Construct Public URL
        const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, '');
        const bucket = process.env.S3_BUCKET_NAME;
        const fullUrl = `${endpoint}/${bucket}/${key}`;

        return NextResponse.json({
            success: true,
            status: 200,
            message: 'File uploaded successfully',
            data: {
                path: fullUrl,
                fullUrl: fullUrl,
                name: randomFilename,
                type: file.type,
                size: file.size
            }
        }, { status: 200 });
    } catch (err) {
        console.error("Pub-Upload error:", err);
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Internal server error',
            data: null
        }, { status: 500 });
    }
}
