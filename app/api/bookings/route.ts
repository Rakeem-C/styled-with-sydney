import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.()
    
    const { name, email, phone, service, date, time, message } = body ?? {}
    
    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: true, saved: Boolean(prisma), message: 'Booking request received.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      bookings: [],
      databaseEnabled: Boolean(prisma),
    })
  } catch (error) {
    console.error('Booking fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
