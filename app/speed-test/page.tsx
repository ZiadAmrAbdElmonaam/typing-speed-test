'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { WelcomeScreen } from './components/WelcomeScreen'
import { TestScreen } from './components/TestScreen'
import { CompletionScreen } from './components/CompletionScreen'
import { TypingTest, TestResult } from './types'
import { API_ENDPOINTS } from '../config/api'
import { calculateWPM } from './utils'

export default function SpeedTest() {
  const [stage, setStage] = useState<'welcome' | 'test' | 'complete'>('welcome')
  const [timeLeft, setTimeLeft] = useState(60)
  const [text, setText] = useState('')
  const [sampleText, setSampleText] = useState('')
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [initialTestTime, setInitialTestTime] = useState(60)
  const timerRef = useRef<NodeJS.Timeout>()

  const calculateTestResults = useCallback(() => {
    const consumedTimeInMinutes = Number(((initialTestTime - timeLeft) / 60).toFixed(1))
    
    const totalCharacters = text.length
    
    const wpm = calculateWPM(totalCharacters, (initialTestTime - timeLeft))

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

    const totalKeystrokes = text.length
    const timeForCalculation = Math.max(consumedTimeInMinutes, 1/60)
    const keyStrokesPerMinute = Math.round(totalKeystrokes / timeForCalculation)

    const result: TestResult = {
      wordsPerMinute: wpm,
      consumedTime: consumedTimeInMinutes,
      accuracy: accuracy,
      keyStrokesPerMinute: keyStrokesPerMinute,
      countOfWrongLetters: wrongLetters,
      urlRootParameterGuid: "b6916191-6025-434c-82da-4e77c6b98b34",
      isDeleted: false
    }

    console.log("Test Results:", {
      textLength: text.length,
      timeLeft,
      initialTestTime,
      consumedTimeInMinutes,
      calculatedWPM: wpm,
    });

    setTestResult(result)
    return result
  }, [text, timeLeft, sampleText, initialTestTime])

  useEffect(() => {
    const fetchParagraph = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.TYPING_TESTS)
        const data: TypingTest[] = await response.json()
        console.log('Typing Test API Response:', {
          paragraph: data[0]?.paragraph,
          testTime: data[0]?.testTime,
          rawData: data
        })
        
        if (data && data.length > 0) {
          setSampleText(data[0].paragraph)
          const timeInSeconds = data[0].testTime * 60
          setTimeLeft(timeInSeconds)
          setInitialTestTime(timeInSeconds)
        }
      } catch (error) {
        console.error('Error fetching paragraph:', error)
        setSampleText("One of the most rewarding experiences in life is learning something new.")
        setTimeLeft(60)
        setInitialTestTime(60)
      }
    }

    fetchParagraph()
  }, [])

  useEffect(() => {
    if (stage === 'test' && timeLeft > 0) {
      const startTime = Date.now();
      const initialTimeLeft = timeLeft;

      timerRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const newTimeLeft = initialTimeLeft - elapsedSeconds;

        if (newTimeLeft <= 0) {
          setTimeLeft(0);
          setStage('complete');
          clearInterval(timerRef.current);
          const results = calculateTestResults();
          submitTestResults(results);
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  const handleStart = () => {
    setStage('test')
  }

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setText(value)
    
    if (text.length === 0 && value.length === 1) {
      setStage('test')
    }
    
    if (value.length === sampleText.length) {
      setStage('complete')
      const results = calculateTestResults()
      submitTestResults(results)
      return
    }
    
    const lastCharIndex = value.length - 1
    if (value.length > text.length && value[lastCharIndex] !== sampleText[lastCharIndex]) {
      setTimeout(() => {
        setText(value.slice(0, -1))
      }, 200)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const submitTestResults = async (results: TestResult) => {
    try {
      const formattedResults = {
        wordsPerMinute: Number(results.wordsPerMinute),
        consumedTime: Number(results.consumedTime),
        accuracy: Number(results.accuracy),
        keyStrokesPerMinute: Number(results.keyStrokesPerMinute),
        countOfWrongLetters: Number(results.countOfWrongLetters),
        urlRootParameterGuid: results.urlRootParameterGuid,
        isDeleted: false
      }

      console.log('Formatted Test Results to be submitted:', formattedResults)

      const response = await fetch(API_ENDPOINTS.TEST_RESULTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedResults)
      })

      if (!response.ok) {
        throw new Error('Failed to submit test results')
      }

      const data = await response.json()
      console.log('Test results submission response:', data)
    } catch (error) {
      console.error('Error submitting test results:', error)
    }
  }

  if (stage === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />
  }

  if (stage === 'test') {
    return (
      <TestScreen
        timeLeft={timeLeft}
        text={text}
        sampleText={sampleText}
        onType={handleType}
        onPaste={handlePaste}
        onCopy={handleCopy}
      />
    )
  }

  if (stage === 'complete' && testResult) {
    return <CompletionScreen testResult={testResult} />
  }

  return null
}