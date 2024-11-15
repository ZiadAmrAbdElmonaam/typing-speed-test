import Image from 'next/image'
import { InstructionCards } from './InstructionCards'
import { Button } from '@/app/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #FCE7F3 100%)"
      }}
    >
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="fixed left-8 top-8">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-xl" />
          </div>
          <div className="fixed right-8 top-8">
            <Button variant="ghost" className="text-purple-600 hover:bg-purple-50">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-20">
          <Image src="/aiphoto.png" alt="Welcome" width={200} height={200} className="mx-auto mb-8" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Welcome to Your Speed Writing Test!
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            In this test, you&apos;ll have the chance to demonstrate your writing speed and accuracy. 
            All you need to do is write as much as you can within the time limit.
          </p>
          
          <Button 
            onClick={onStart}
            className="px-12 py-3 mb-16 text-white text-lg rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:opacity-90 transition-all duration-200"
          >
            Let&apos;s Go
          </Button>

          {/* Instruction Cards */}
          <InstructionCards />
        </div>
      </div>
    </div>
  )
} 