import { NextResponse } from 'next/server'

interface TypingTestRequest {
  paragraph: string
  level: number
  testTime: number
  companyId: number
  jobAssignmentId: number
  passCriteria: string
  isDeleted: boolean
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload: TypingTestRequest = {
      paragraph: body.paragraph || "Sample test paragraph.",
      level: body.level || 2,
      testTime: body.testTime || 6.00,
      companyId: body.companyId || 2,
      jobAssignmentId: body.jobAssignmentId || 131,
      passCriteria: body.passCriteria || "85%",
      isDeleted: body.isDeleted || false
    }

    // Here you would typically save to your database
    const response = await fetch('https://demo.nancy-ai.com/api/seera/typing-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Failed to create typing test')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })

  } catch (error) {
    console.error('Error creating typing test:', error)
    return NextResponse.json(
      { error: 'Failed to create typing test' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const response = await fetch('https://demo.nancy-ai.com/api/seera/typing-test')
    console.log('Response:', response)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching typing tests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch typing tests' },
      { status: 500 }
    )
  }
} 