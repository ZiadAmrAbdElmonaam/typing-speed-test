'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { submitEmail, submitTestResult, fetchSampleText } from './actions' // Import the new fetchSampleText function
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { motion } from 'framer-motion'

export default function SpeedTypingTest() {
  const [email, setEmail] = useState<string>('')
  const [sampleText, setSampleText] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [testStarted, setTestStarted] = useState<boolean>(false)
  const [testFinished, setTestFinished] = useState<boolean>(false)
  const [wpm, setWpm] = useState<number>(0)
  const [errors, setErrors] = useState<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (testStarted && !testFinished) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [testStarted, testFinished])

  const startTest = async () => {
    const newText = await fetchSampleText()
    setSampleText(newText)
    setTestStarted(true)
    setTestFinished(false)
    setTimeElapsed(0)
    setInputText('')
    setErrors(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputText(value)

    const correctText = sampleText.slice(0, value.length)
    if (value === sampleText) {
      endTest()
    } else if (value !== correctText) {
      setErrors((prevErrors) => prevErrors + 1)
    }
  }

  const endTest = async () => {
    setTestFinished(true)
    if (intervalRef.current) clearInterval(intervalRef.current)

    const minutes = timeElapsed / 60
    const wordsTyped = inputText.trim().split(/\s+/).length
    const calculatedWpm = Math.round(wordsTyped / minutes)
    setWpm(calculatedWpm)

    await submitTestResult(email, calculatedWpm)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitEmail(email)
    startTest()
  }

  const getCharacterStyle = (index: number) => {
    if (index < inputText.length) {
      return inputText[index] === sampleText[index] ? 'text-green-600' : 'text-red-600'
    }
    return ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-700">Speed Typing Test</CardTitle>
          <CardDescription className="text-lg text-indigo-600">Test your typing speed and accuracy!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="mb-6">
            <div className="flex items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-2 border-indigo-300 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300">
                Submit Email
              </Button>
            </div>
          </form>
          <div className="mb-6">
            <p className="font-semibold text-indigo-900 mb-2">Sample Text:</p>
            <p className="text-indigo-800 bg-white p-4 rounded-lg shadow-inner">
              {sampleText.split('').map((char, index) => (
                <span key={index} className={getCharacterStyle(index)}>
                  {char}
                </span>
              ))}
            </p>
          </div>
          {!testStarted ? (
            <Button 
              onClick={startTest} 
              disabled={!email} 
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 disabled:text-indigo-100 focus:ring-4 focus:ring-indigo-300"
            >
              Start Test
            </Button>
          ) : (
            <div>
              <Input
                value={inputText}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                disabled={testFinished}
                className="mt-4 bg-white border-2 border-indigo-300 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="mt-4 flex justify-between text-indigo-700">
                <p>Time: {timeElapsed} seconds</p>
                <p>Errors: {errors}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {testFinished && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full text-center"
            >
              <p className="text-2xl font-bold text-indigo-700 mb-2">Test completed!</p>
              <p className="text-xl text-indigo-600">Your typing speed: {wpm} WPM</p>
              <p className="text-lg text-indigo-600">Errors: {errors}</p>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}