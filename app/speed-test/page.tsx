'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "../components/ui/input"
import { 

} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/ui/button'

interface TypingTest {
  paragraph: string;
  level: number;
  testTime: number;
  companyId: number;
  jobAssignmentId: number;
  passCriteria: string;
  id: number;
}

interface TestResult {
  wordsPerMinute: number
  consumedTime: number
  accuracy: number
  keyStrokesPerMinute: number
  countOfWrongLetters: number
  urlRootParameterGuid: string
  isDeleted: boolean
}

export default function Component() {
    const [stage, setStage] = useState<'welcome' | 'test' | 'complete'>('welcome')
    const [timeLeft, setTimeLeft] = useState(60)
    const [text, setText] = useState('')
    const [sampleText, setSampleText] = useState('')
    const timerRef = useRef<NodeJS.Timeout>()
    const inputRef = useRef<HTMLInputElement>(null)
    const [testResult, setTestResult] = useState<TestResult | null>(null)
  
    useEffect(() => {
        const fetchParagraph = async () => {
            try {
                const response = await fetch('https://demo.nancy-ai.com/api/seera/typing-tests')
                const data: TypingTest[] = await response.json()
                if (data && data.length > 0) {
                    setSampleText(data[0].paragraph)
                    setTimeLeft(data[0].testTime)
                }
            } catch (error) {
                console.error('Error fetching paragraph:', error)
                setSampleText("One of the most rewarding experiences in life is learning something new.")
            }
        }

        fetchParagraph()
    }, [])
  
    useEffect(() => {
      if (stage === 'test' && timeLeft > 0) {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setStage('complete')
              clearInterval(timerRef.current)
              const results = calculateTestResults()
              submitTestResults(results)
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
      const value = e.target.value;
      
      // Always update the text to show the wrong character in red
      setText(value);
      
      // If this is the first character, start the test
      if (text.length === 0 && value.length === 1) {
        setStage('test');
        if (inputRef.current) inputRef.current.focus();
      }
      
      // If the last character is wrong, prevent further typing by resetting to previous value
      const lastCharIndex = value.length - 1;
      if (value.length > text.length && value[lastCharIndex] !== sampleText[lastCharIndex]) {
        setTimeout(() => {
          setText(value.slice(0, -1));
        }, 200); // Small delay to show the wrong character before removing it
      }
    };
  
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
    }
  
    const handleCopy = (e: React.ClipboardEvent) => {
      e.preventDefault()
    }
  
    const calculateTestResults = () => {
      // Calculate words per minute
      const words = text.trim().split(/\s+/).length
      const minutes = (60 - timeLeft) / 60
      const wpm = Math.round(words / minutes)

      // Calculate accuracy and wrong letters
      let correctChars = 0
      let wrongLetters = 0
      
      text.split('').forEach((char, index) => {
        if (char === sampleText[index]) {
          correctChars++
        } else {
          wrongLetters++
        }
      })

      const accuracy = text.length > 0 
        ? Math.round((correctChars / text.length) * 100 * 10) / 10
        : 0

      // Calculate keystrokes per minute (including spaces and wrong letters)
      const totalKeystrokes = text.length
      const keyStrokesPerMinute = Math.round(totalKeystrokes / minutes)

      const result: TestResult = {
        wordsPerMinute: wpm,
        consumedTime: 60 - timeLeft, // time spent in seconds
        accuracy: accuracy,
        keyStrokesPerMinute: keyStrokesPerMinute,
        countOfWrongLetters: wrongLetters,
        urlRootParameterGuid: "b6916191-6025-434c-82da-4e77c6b98b34",
        isDeleted: false
      }

      setTestResult(result)
      return result
    }
  
    const submitTestResults = async (results: TestResult) => {
      try {
        const response = await fetch('https://demo.nancy-ai.com/api/seera/test-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(results)
        })

        if (!response.ok) {
          throw new Error('Failed to submit test results')
        }

        const data = await response.json()
        console.log('Test results submitted successfully:', data)
      } catch (error) {
        console.error('Error submitting test results:', error)
      }
    }
  
    if (stage === 'welcome') {
      return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
          <div className="max-w-5xl mx-auto p-8">
            <div className="flex justify-between items-center">
              <div className="fixed left-8 top-8">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
              </div>
              <div className="fixed right-8 top-8">
                <Button 
                  variant="ghost" 
                  className="text-purple-600 hover:bg-purple-50"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="text-center mt-20">
              <Image
                src="/aiphoto.png"
                alt="Welcome"
                width={200}
                height={200}
                className="mx-auto mb-8"
              />
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Welcome to Your Speed Writing Test!
              </h1>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                In this test, you&apos;ll have the chance to demonstrate your writing speed and accuracy. 
                All you need to do is write as much as you can within the time limit.
              </p>
              
              <Button 
                onClick={handleStart}
                className="px-12 py-3 mb-16 text-white text-lg rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:opacity-90 transition-all duration-200"
              >
                Let&apos;s Go
              </Button>

              <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="p-6 rounded-lg bg-white shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src="https://api.iconify.design/solar:keyboard-outline.svg?color=%239333ea" 
                      alt="Type"
                      width="48"
                      height="48"
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Type Quickly</h3>
                  <p className="text-gray-600 text-sm">
                    In the text box, type as quickly and accurately as possible. Write continuously until time is up
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-white shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src="https://api.iconify.design/oi/timer.svg?color=%239333ea" 
                      alt="Timer"
                      width="48"
                      height="48"
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Watch the Timer</h3>
                  <p className="text-gray-600 text-sm">
                    You&apos;ll see a countdown in the top corner. This will let you know how much time you have left
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-white shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src="https://api.iconify.design/solar:check-circle-outline.svg?color=%239333ea" 
                      alt="Check"
                      width="48"
                      height="48"
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Get Results</h3>
                  <p className="text-gray-600 text-sm">
                    When the time is up, your responses will be saved automatically. You don&apos;t need to do anything else
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  
    if (stage === 'test') {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-5xl mx-auto p-8">
            <div className="flex justify-between items-center">
              <div className="absolute left-20 mt-2">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
              </div>
              <div className="absolute right-20">
                <Button variant="outline" className="text-purple-600">
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="text-center mt-24 mb-12">
              <p className="text-gray-700 dark:text-gray-300 text-lg">You will start your writing speed test now,</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">click start once you are ready</p>
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent my-6">
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
                <span className="text-2xl ml-1">Sec</span>
              </div>
            </div>

            <div className="relative">
              <Input
                ref={inputRef}
                value={text}
                onChange={handleType}
                onPaste={handlePaste}
                onCopy={handleCopy}
                className="w-full p-6 text-lg bg-transparent rounded-lg absolute inset-0 opacity-0 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                autoFocus
              />
              <div className="p-8 rounded-lg border border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl dark:shadow-purple-900/20">
                {sampleText.split('').map((char, index) => {
                  const isTyped = index < text.length;
                  const isCorrect = text[index] === char;
                  
                  return (
                    <span
                      key={index}
                      className={
                        isTyped
                          ? isCorrect
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'     
                          : 'text-gray-400 dark:text-gray-600'     
                      }
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }
  
    if (stage === 'complete' && testResult) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-950 dark:to-gray-950">
          <div className="max-w-5xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="fixed left-8 top-8">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="text-center mt-20">
              <Image
                src="/aiphoto.png"
                alt="Complete"
                width={200}
                height={200}
                className="mx-auto mb-8"
              />
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Great Job! You&apos;ve Finished the Test!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Thank you for completing the speed writing test! We appreciate the time and effort you put into it.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Your results will be sent to your email within 24 hours. Keep an eye on your inbox for further details.
              </p>

              <div className="flex justify-center space-x-8 mt-16 mb-8">
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Contact Us
                </Link>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>

              <div className="flex justify-center space-x-6">
                <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
                  <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
                  <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
                  <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
                  <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  
    return (
      <div 
        className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-950 dark:to-gray-950"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), #FFFFFF 60%), conic-gradient(from 179.42deg at 47.87% -110.87%, #FFF -25.84deg, #7001D3 0.27deg, #FFF 23.53deg, #FFF 127.5deg, #FFF 196.87deg, #FFF 334.16deg, #7001D3 360.27deg)",
          backgroundBlendMode: "multiply"
        }}
      >
        <div className="max-w-5xl mx-auto p-8">
          <div className="flex justify-between items-center">
            <div className="absolute left-20 mt-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="text-center">
            <Image
              src="/aiphoto.png"
              alt="Complete"
              width={240}
              height={240}
              className="mx-auto mb-12 mt-16 drop-shadow-2xl"
            />
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Great Job! You&apos;ve Finished the Test!
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              Thank you for completing the speed writing test! We appreciate the time and effort you put into it.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-12">
              Your results will be sent to your email within 24 hours. Keep an eye on your inbox for further details.
            </p>
            
            <div className="flex justify-center space-x-8 mb-12">
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                Contact Us
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
            
            <div className="flex justify-center space-x-6">
              <Link href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }