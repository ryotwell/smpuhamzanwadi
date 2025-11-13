import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { config } from '@/config'
import crypto from 'crypto'

// Allowed folders
const allowedFolders = ['pas-foto', 'kartu-keluarga', 'akta-kelahiran', 'ijazah'];

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
                message: 'Invalid or missing folder. Allowed values: pas-foto, kartu-keluarga, akta-kelahiran',
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

        // Limit file size: max 1MB (1 * 1024 * 1024)
        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'File size exceeds the 2MB limit',
                data: null
            }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Store directly under /public/upload/[folder]
        const uploadDir = join(process.cwd(), 'public', 'upload', folder);

        // Ensure subfolder exists
        await mkdir(uploadDir, { recursive: true });

        const randomFilename = generateRandomFilename(file.name);
        const filePath = join(uploadDir, randomFilename);

        await writeFile(filePath, buffer);
        console.log(`open ${filePath} to see the uploaded file`);

        // For access in frontend/public, include the path starting from /upload/[folder]/...
        const publicPath = `/upload/${folder}/${randomFilename}`;
        const fullUrl = `${config.baseUrl}${publicPath}`;

        return NextResponse.json({
            success: true,
            status: 200,
            message: 'File uploaded successfully',
            data: {
                path: publicPath,
                fullUrl: fullUrl,
                name: randomFilename,
                type: file.type,
                size: file.size
            }
        }, { status: 200 });
    } catch {
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Internal server error',
            data: null
        }, { status: 500 });
    }
}
