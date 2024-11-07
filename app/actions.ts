'use server'

import { prisma } from '@/lib/db'

export async function submitEmail(email: string) {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email }
    })
    
    return { success: true, userId: user.id }
  } catch (error) {
    console.error('Failed to submit email:', error)
    return { success: false, error: 'Failed to submit email' }
  }
}

export async function submitTestResult(email: string, wpm: number, kpm: number, accuracy: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Determine the level based on WPM
    let level = 'beginner'
    if (wpm >= 95) level = 'expert'
    else if (wpm >= 80) level = 'professional'

    const result = await prisma.result.create({
      data: {
        wpm,
        kpm,
        accuracy,
        level,
        userId: user.id
      }
    })

    return { 
      success: true, 
      message: 'Test result submitted successfully',
      result
    }
  } catch (error) {
    console.error('Failed to submit test result:', error)
    return { 
      success: false, 
      error: 'Failed to submit test result' 
    }
  }
}

export const fetchSampleText = async (level: 'beginner' | 'professional' | 'expert'): Promise<string> => {
  try {
    const sentences = level === 'beginner' ? 1 : level === 'professional' ? 2 : 3
    const response = await fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${sentences}&format=json`)
    const data = await response.json()
    return data[0]
  } catch (error) {
    console.error('Failed to fetch sample text:', error)
    return "The quick brown fox jumps over the lazy dog."
  }
}