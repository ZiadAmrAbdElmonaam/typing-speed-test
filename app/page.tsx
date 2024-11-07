'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { submitEmail, submitTestResult, fetchSampleText } from './actions'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './components/ui/card'
import { motion } from 'framer-motion'


import { Progress } from '@radix-ui/react-progress'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

const InfoIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
)

export default function SpeedTypingTest() {
  const [email, setEmail] = useState<string>('')
  const [sampleText, setSampleText] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [testStarted, setTestStarted] = useState<boolean>(false)
  const [testFinished, setTestFinished] = useState<boolean>(false)
  const [wpm, setWpm] = useState<number>(0)
  const [kpm, setKpm] = useState<number>(0)
  const [errors, setErrors] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(100)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'professional' | 'expert'>('beginner')

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
    const newText = await fetchSampleText(selectedLevel)
    setSampleText(newText)
    setTestStarted(true)
    setTestFinished(false)
    setTimeElapsed(0)
    setInputText('')
    setErrors(0)
    setAccuracy(100)
    if (inputRef.current) inputRef.current.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const currentPosition = value.length - 1
    
    if (value.length < inputText.length) {
      setInputText(value)
      return
    }

    const newChar = value[currentPosition]
    const expectedChar = sampleText[currentPosition]
    
    if (newChar === expectedChar) {
      setInputText(value)
      
      if (value === sampleText) {
        endTest()
      }
    } else {
      e.preventDefault()
      setErrors(prev => prev + 1)
    }

    const totalAttempts = inputText.length + 1
    const errorRate = (errors / totalAttempts) * 100
    setAccuracy(Math.max(0, Math.round(100 - errorRate)))
  }

  const endTest = async () => {
    setTestFinished(true)
    if (intervalRef.current) clearInterval(intervalRef.current)

    const minutes = timeElapsed / 60
    const wordsTyped = inputText.trim().split(/\s+/).length
    const calculatedWpm = Math.round(wordsTyped / minutes)
    const calculatedKpm = Math.round(inputText.length / minutes)
    setWpm(calculatedWpm)
    setKpm(calculatedKpm)

    const result = await submitTestResult(email, calculatedWpm, calculatedKpm, accuracy)
    if (!result.success) {
      console.error('Failed to save test results')
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitEmail(email)
    if (result.success) {
      startTest()
    } else {
      console.error('Failed to submit email')
    }
  }

  const getCharacterStyle = (index: number) => {
    if (index < inputText.length) {
      return inputText[index] === sampleText[index] 
        ? 'text-green-600' 
        : 'text-red-600 border-b-[3px] border-red-500 bg-red-50'
    }
    return ''
  }

  const getWpmLevel = (wpm: number) => {
    if (wpm < 80) return 'Beginner'
    if (wpm < 95) return 'Professional'
    return 'Expert'
  }

  const getMood = (wpm: number, accuracy: number) => {
    if (wpm >= 65 && accuracy === 100) return '🌟 Outstanding! Expert level achieved!'
    if (wpm >= 55 && accuracy >= 95) return '🎯 Professional performance!'
    if (wpm >= 45 && accuracy >= 90) return '👍 Good beginner pace!'
    return '💪 Keep practicing to improve!'
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault()
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

        <Tabs defaultValue="beginner" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="beginner" onClick={() => setSelectedLevel('beginner')}>
              Beginner
              <span className="ml-2 text-xs text-gray-500">&lt;80 WPM</span>
            </TabsTrigger>
            <TabsTrigger value="professional" onClick={() => setSelectedLevel('professional')}>
              Professional
              <span className="ml-2 text-xs text-gray-500">80-95 WPM</span>
            </TabsTrigger>
            <TabsTrigger value="expert" onClick={() => setSelectedLevel('expert')}>
              Expert
              <span className="ml-2 text-xs text-gray-500">&gt;95 WPM</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beginner">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-indigo-700">Beginner Level</h3>
              <p className="text-sm text-gray-600">Target: 45+ WPM with 90% accuracy</p>
              <p className="text-xs text-gray-500 mt-2">Perfect for those starting their typing journey</p>
            </div>
          </TabsContent>

          <TabsContent value="professional">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-indigo-700">Professional Level</h3>
              <p className="text-sm text-gray-600">Target: 80-95 WPM with 95% accuracy</p>
              <p className="text-xs text-gray-500 mt-2">For experienced typists looking to improve</p>
            </div>
          </TabsContent>

          <TabsContent value="expert">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-indigo-700">Expert Level</h3>
              <p className="text-sm text-gray-600">Target: 95+ WPM with 100% accuracy</p>
              <p className="text-xs text-gray-500 mt-2">For professional typists aiming for perfection</p>
            </div>
          </TabsContent>
        </Tabs>

        <CardContent>
          <form onSubmit={handleEmailSubmit} className="mb-6">
            <div className="flex items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
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
                <span 
                  key={index} 
                  className={getCharacterStyle(index)}
                  style={{ display: 'inline-block' }}
                >
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
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                disabled={testFinished}
                className="mt-4 bg-white border-2 border-indigo-300 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onPaste={handlePaste}
                onCopy={handleCopy}
              />
              <div className="mt-4 flex justify-between text-indigo-700">
                <p>Time: {timeElapsed} seconds</p>
                <p>Errors: {errors}</p>
              </div>
              <Progress value={accuracy} className="mt-2" />
              <p className="text-right text-sm text-indigo-600">Accuracy: {accuracy}%</p>
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
              <p className="text-lg text-indigo-600">Keystrokes per Minute: {kpm} KPM</p>
              <p className="text-lg text-indigo-600">Accuracy: {accuracy}%</p>
              <p className="text-lg text-indigo-600">Level: {getWpmLevel(wpm)}</p>
              <Alert className={`mt-4 ${
                wpm >= 95 ? 'bg-green-50 border-green-200' :
                wpm >= 80 ? 'bg-blue-50 border-blue-200' :
                'bg-yellow-50 border-yellow-200'
              }`}>
                <InfoIcon />
                <AlertTitle>Performance Analysis</AlertTitle>
                <AlertDescription>
                  {getMood(wpm, accuracy)}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}