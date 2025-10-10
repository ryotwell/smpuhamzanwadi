import { NextRequest, NextResponse } from 'next/server'

// POST /api/post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log({ body });
    

    // Here you would typically save the post to a database
    // For demonstration, just echo back the content
    return NextResponse.json({
      message: 'Post received!',
      content: body.content,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to process post.',
      error: (error as Error).message,
    }, { status: 400 });
  }
}
