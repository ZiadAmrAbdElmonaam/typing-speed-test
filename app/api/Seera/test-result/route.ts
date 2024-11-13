import { NextResponse } from 'next/server'

interface TestResultRequest {
  wordsPerMinute: number
  consumedTime: number
  accuracy: number
  keyStrokesPerMinute: number
  countOfWrongLetters: number
  urlRootParameterGuid: string
  isDeleted: boolean
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload: TestResultRequest = {
      wordsPerMinute: Number(body.wordsPerMinute) || 0,
      consumedTime: Number(body.consumedTime) || 0,
      accuracy: Number(body.accuracy) || 0,
      keyStrokesPerMinute: Number(body.keyStrokesPerMinute) || 0,
      countOfWrongLetters: Number(body.countOfWrongLetters) || 0,
      urlRootParameterGuid: body.urlRootParameterGuid || "b6916191-6025-434c-82da-4e77c6b98b34",
      isDeleted: false
    }

    const response = await fetch('https://demo.nancy-ai.com/api/seera/test-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Failed to submit test result')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })

  } catch (error) {
    console.error('Error submitting test result:', error)
    return NextResponse.json(
      { error: 'Failed to submit test result' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const response = await fetch('https://demo.nancy-ai.com/api/seera/test-result')
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test results' },
      { status: 500 }
    )
  }
} 