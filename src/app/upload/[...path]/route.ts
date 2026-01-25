import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

// Allowed MIME types map based on extension
const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;

        // Construct absolute path to the file in public/upload
        const filePath = join(process.cwd(), 'public', 'upload', ...pathSegments);

        // Security check: ensure path is within public/upload (basic traversal check)
        // process.cwd()/public/upload should be the prefix of resolved path
        const uploadDir = join(process.cwd(), 'public', 'upload');
        if (!filePath.startsWith(uploadDir)) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        try {
            await stat(filePath);
        } catch (e) {
            return new NextResponse('File not found', { status: 404 });
        }

        const fileBuffer = await readFile(filePath);

        // Determine content type
        const ext = filePath.match(/\.[^/.]+$/)?.[0]?.toLowerCase() || '';
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
