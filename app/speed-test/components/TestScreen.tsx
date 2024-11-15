import { useRef } from 'react'
import Image from 'next/image'
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface TestScreenProps {
  timeLeft: number;
  text: string;
  sampleText: string;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onCopy: (e: React.ClipboardEvent) => void;
  onContact: () => void;
}

export function TestScreen({ 
  timeLeft, 
  text, 
  sampleText, 
  onType, 
  onPaste, 
  onCopy,
  onContact 
}: TestScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div 
      style={{
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), #FFFFFF 60%), conic-gradient(from 179.42deg at 47.87% -110.87%, #FFF -25.84deg, #7001D3 0.27deg, #FFF 23.53deg, #FFF 127.5deg, #FFF 196.87deg, #FFF 334.16deg, #7001D3 360.27deg)"
      }}
      className="min-h-screen dark:bg-black"
    >
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center">
          <div className="absolute left-20 mt-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-xl dark:opacity-90"
            />
          </div>
          <div className="absolute right-20">
            <Button
              variant="outline"
              onClick={onContact}
              className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 dark:border-purple-800"
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="text-center mt-24">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            you will start your writing speed test now,
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            click start once you are ready
          </p>
          
          <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent my-6">
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
            {String(timeLeft % 60).padStart(2, '0')}
            <span className="text-2xl ml-1">Sec</span>
          </div>

          <div 
            className="relative mt-8 cursor-text" 
            onClick={handleBoxClick}
          >
            <Input
              ref={inputRef}
              value={text}
              onChange={onType}
              onPaste={onPaste}
              onCopy={onCopy}
              className="w-full p-6 text-lg bg-transparent rounded-lg absolute inset-0 opacity-0 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 z-10"
              autoFocus
            />
            <div className="p-8 rounded-lg border border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-xl dark:shadow-purple-900/20">
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
                        : 'text-gray-400 dark:text-gray-500'
                    }
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
            Your response will be saved automatically when time is up
          </p>
        </div>
      </div>
    </div>
  )
} 