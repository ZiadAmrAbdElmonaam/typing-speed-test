import Image from 'next/image'
import { InstructionCards } from './InstructionCards'
import { Button } from '@/app/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div 
      className="min-h-screen bg-gradient-light dark:bg-black"
    >
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
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
              className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 dark:border-purple-800"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-20">
          <Image 
            src="/aiphoto.png" 
            alt="Welcome" 
            width={200} 
            height={200} 
            className="mx-auto mb-8 dark:opacity-90" 
          />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to Your Speed Writing Test!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            In this test, you&apos;ll have the chance to demonstrate your writing speed and accuracy. 
            All you need to do is write as much as you can within the time limit.
          </p>
          
          <Button 
            onClick={onStart}
            className="relative px-8 py-3 mb-16 rounded-full text-lg text-white shadow-md hover:shadow-lg transition-all duration-200 min-w-[200px] dark:shadow-purple-900/30"
            style={{
              background: "linear-gradient(to right, #d898f8, #7001d3, #a4b0ff)",
              backgroundImage: "linear-gradient(to right, #d898f8, #7001d3, #a4b0ff)"
            }}
          >
            Let&apos;s Go
          </Button>
        </div>

        {/* Instruction Cards with dark mode text colors */}
        <div className="dark:text-white">
          <InstructionCards />
        </div>
      </div>
    </div>
  )
} 