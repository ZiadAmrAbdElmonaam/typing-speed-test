import { useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
interface TestScreenProps {
  timeLeft: number;
  text: string;
  sampleText: string;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onCopy: (e: React.ClipboardEvent) => void;
}

export function TestScreen({ 
  timeLeft, 
  text, 
  sampleText, 
  onType, 
  onPaste, 
  onCopy 
}: TestScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null)

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
            onChange={onType}
            onPaste={onPaste}
            onCopy={onCopy}
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