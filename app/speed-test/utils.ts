export const calculateWPM = (totalCharacters: number, timeInSeconds: number): number => {
  // Standard word length is 5 characters
  const words = totalCharacters / 5
  
  // Convert seconds to minutes
  const minutes = timeInSeconds / 60
  
  // Use a minimum time of 1 second to avoid division by zero
  const timeForCalculation = Math.max(minutes, 1/60)
  
  // Calculate WPM
  const wpm = Math.round(words / timeForCalculation)
  
  return wpm
} 