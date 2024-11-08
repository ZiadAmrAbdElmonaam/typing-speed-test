'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Input } from "../components/ui/input"
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Keyboard, Timer, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/ui/button'

export default function Component() {
    const [stage, setStage] = useState<'welcome' | 'test' | 'complete'>('welcome')
    const [timeLeft, setTimeLeft] = useState(60)
    const [text, setText] = useState('')
    const [sampleText] = useState(
      "One of the most rewarding experiences in life is learning something new. Whether it's picking up a new skill, exploring a new place, or meeting someone with a unique perspective, these moments expand our horizons and deepen our understanding of the world."
    )
    const [progress, setProgress] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [errors, setErrors] = useState(0)
    const timerRef = useRef<NodeJS.Timeout>()
    const inputRef = useRef<HTMLInputElement>(null)
  
    useEffect(() => {
      if (stage === 'test' && timeLeft > 0) {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setStage('complete')
              clearInterval(timerRef.current)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
      return () => clearInterval(timerRef.current)
    }, [stage, timeLeft])
  
    const handleStart = () => {
      setStage('test')
      if (inputRef.current) inputRef.current.focus()
    }
  
    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const currentPosition = value.length - 1
      
      if (text.length === 0 && value.length === 1) {
        setStage('test')
        if (inputRef.current) inputRef.current.focus()
      }
      
      if (value.length <= sampleText.length) {
        if (value.length < text.length) {
          setText(value)
          return
        }
  
        const newChar = value[currentPosition]
        const expectedChar = sampleText[currentPosition]
        
        if (newChar === expectedChar || currentPosition === -1) {
          setText(value)
          setProgress((value.length / sampleText.length) * 100)
          
          if (value === sampleText) {
            setStage('complete')
            clearInterval(timerRef.current)
          }
        } else {
          setErrors(prev => prev + 1)
          const totalAttempts = text.length + 1
          setAccuracy(Math.max(0, Math.round(100 - (errors / totalAttempts) * 100)))
        }
      }
    }
  
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
    }
  
    const handleCopy = (e: React.ClipboardEvent) => {
      e.preventDefault()
    }
  
    if (stage === 'welcome') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto p-6"
        >
          <div className="flex justify-between items-center mb-12">
            <div className="w-12 h-12 bg-purple-600 rounded-xl" />
            <Button variant="outline" className="text-purple-600">Contact Us</Button>
          </div>
          
          <div className="text-center mb-12">
            <Image
              src="/aiphoto.png"
              alt="Welcome"
              width={200}
              height={200}
              className="mx-auto mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">Welcome to Your Speed Writing Test!</h1>
            <p className="text-gray-600 mb-8">
              In this test, you&apos;ll have the chance to demonstrate your writing speed and accuracy.
              All you need to do is write as much as you can within the time limit.
            </p>
            <Button 
              onClick={handleStart}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg"
            >
              Let&apos;s Go
            </Button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Keyboard className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle className="mb-2">Type Quickly</CardTitle>
              <CardDescription>
                In the text box, type as quickly and accurately as possible
              </CardDescription>
            </Card>
            <Card className="text-center p-6">
              <Timer className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle className="mb-2">Watch the Timer</CardTitle>
              <CardDescription>
                You&apos;ll see a countdown in the top corner showing time left
              </CardDescription>
            </Card>
            <Card className="text-center p-6">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle className="mb-2">Get Results</CardTitle>
              <CardDescription>
                Your response will be saved automatically when time is up
              </CardDescription>
            </Card>
          </div>
        </motion.div>
      )
    }
  
    if (stage === 'test') {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto p-6"
        >
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-purple-600 mb-4">
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
              {String(timeLeft % 60).padStart(2, '0')}
              <span className="text-2xl ml-2">sec</span>
            </div>
            <p className="text-gray-600">
              Start typing to begin the test
            </p>
          </div>
  
          <div className="flex justify-center mb-8">
            <Image
              src="/aiphoto.png"
              alt="Speed Test"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
  
          <div className="relative">
            <Input
              ref={inputRef}
              value={text}
              onChange={handleType}
              onPaste={handlePaste}
              onCopy={handleCopy}
              className="w-full p-6 text-lg bg-transparent rounded-lg absolute inset-0 opacity-0"
              autoFocus
            />
            <Card className="mb-8 transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-8 dark:bg-gray-800 bg-gray-50 rounded-lg border dark:border-gray-700 border-gray-200 shadow-inner transition-colors duration-200">
                <p className="text-lg leading-relaxed font-mono tracking-wide">
                  {sampleText.split(' ').map((word, wordIndex) => {
                    const wordStart = sampleText
                      .split(' ')
                      .slice(0, wordIndex)
                      .join(' ')
                      .length + (wordIndex > 0 ? 1 : 0)
                    
                    return (
                      <span key={wordIndex}>
                        {word.split('').map((char, charIndex) => {
                          const absoluteIndex = wordStart + charIndex
                          const isTyped = absoluteIndex < text.length
                          const isCorrect = text[absoluteIndex] === char
                          
                          return (
                            <span
                              key={charIndex}
                              className={
                                isTyped
                                  ? isCorrect
                                    ? 'text-green-600 dark:text-green-400 transition-colors duration-200'
                                    : 'text-red-600 dark:text-red-400 border-b-2 border-red-500 dark:border-red-400 transition-colors duration-200'
                                  : 'text-gray-400 dark:text-gray-500 transition-colors duration-200'
                              }
                            >
                              {char}
                            </span>
                          )
                        })}
                        {wordIndex < sampleText.split(' ').length - 1 && (
                          <span className={
                            wordStart + word.length < text.length
                              ? text[wordStart + word.length] === ' '
                                ? 'text-green-600 dark:text-green-400 transition-colors duration-200'
                                : 'text-red-600 dark:text-red-400 border-b-2 border-red-500 dark:border-red-400 transition-colors duration-200'
                              : 'text-gray-400 dark:text-gray-500 transition-colors duration-200'
                          }> </span>
                        )}
                      </span>
                    )
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
  
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100 dark:bg-gray-700 transition-colors duration-200" 
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-4 transition-colors duration-200">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Accuracy: {accuracy}%</span>
          </div>
        </motion.div>
      )
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6 text-center"
      >
        <Image
          src="/placeholder.svg"
          alt="Complete"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">Great Job! You&apos;ve Finished the Test!</h1>
        <p className="text-gray-600 mb-2">
          Thank you for completing the speed writing test! We appreciate the time and effort you put into it.
        </p>
        <p className="text-sm text-gray-500 mb-12">
          Your results will be sent to your email within 24 hours. Keep an eye on your inbox for further details.
        </p>
        
        <div className="flex justify-center space-x-6">
          <Link href="#" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
        </div>
      </motion.div>
    )
  }