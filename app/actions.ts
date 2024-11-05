'use server'

export async function submitEmail(email: string) {
  // In a real application, you would store this email in a database
  console.log(`Email submitted: ${email}`)
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: 'Email submitted successfully' }
}

export async function submitTestResult(email: string, wpm: number) {
  // In a real application, you would store this result in a database
  console.log(`Test result for ${email}: ${wpm} WPM`)
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: 'Test result submitted successfully' }
}

export async function fetchSampleText() {
  try {
    const response = await fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&format=json')
    const data = await response.json()
    return data[0] // Returns the first sentence or paragraph from the API
  } catch (error) {
    console.error('Failed to fetch sample text:', error)
    return "The quick brown fox jumps over the lazy dog." // Default fallback text
  }
}