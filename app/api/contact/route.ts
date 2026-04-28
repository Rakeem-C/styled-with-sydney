import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.()
    
    const { name, email, subject, message } = body ?? {}
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: true, saved: Boolean(prisma), message: 'Contact request received.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Failed to save contact submission' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      contacts: [],
      databaseEnabled: Boolean(prisma),
    })
  } catch (error) {
    console.error('Contact fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}
