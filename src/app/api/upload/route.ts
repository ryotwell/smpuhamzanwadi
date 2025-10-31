import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({
        status: 400,
        message: 'No file uploaded',
        data: null
      }, { status: 400 })
    }

    // Validate MIME type
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({
        status: 400,
        message: 'Invalid file type. Only PNG, JPG, and JPEG are allowed',
        data: null
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = join(process.cwd(), 'public', 'upload')
    const filePath = join(uploadDir, file.name)

    await writeFile(filePath, buffer)
    console.log(`open ${filePath} to see the uploaded file`)

    // For access in frontend/public, include the path starting from /upload/...
    const publicPath = `/upload/${file.name}`

    return NextResponse.json({
      status: 200,
      message: 'File uploaded successfully',
      data: {
        path: publicPath,
        name: file.name,
        type: file.type,
        size: file.size
      }
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: 'Internal server error',
      data: null
    }, { status: 500 })
  }
}
