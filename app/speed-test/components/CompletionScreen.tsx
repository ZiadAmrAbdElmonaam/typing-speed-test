import Image from 'next/image'
import Link from 'next/link'
import { TestResult } from '../types'
import { Button } from '@/app/components/ui/button';

interface CompletionScreenProps {
  testResult: TestResult;
  onContact: () => void;
}

export function CompletionScreen({  onContact }: CompletionScreenProps) {
  return (
    <div 
      className="min-h-screen dark:bg-black"
      style={{
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), #FFFFFF 60%), conic-gradient(from 179.42deg at 47.87% -110.87%, #FFF -25.84deg, #7001D3 0.27deg, #FFF 23.53deg, #FFF 127.5deg, #FFF 196.87deg, #FFF 334.16deg, #7001D3 360.27deg)",
      }}
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
              onClick={onContact}
              className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 dark:border-purple-800"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-24">
          <div className="relative">
            <Image 
              src="/aiphoto.png" 
              alt="Complete" 
              width={200} 
              height={200} 
              className="mx-auto mb-8 dark:opacity-90" 
            />
            {/* Confetti effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:opacity-75">
                <g className="animate-confetti">
                  <path d="M200 0L220 180L40 200L220 220L200 400L180 220L360 200L180 180L200 0Z" fill="url(#paint0_linear)"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="200" y1="0" x2="200" y2="400" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF1493"/>
                      <stop offset="0.5" stopColor="#7B68EE"/>
                      <stop offset="1" stopColor="#00CED1"/>
                    </linearGradient>
                  </defs>
                </g>
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Great Job! You&apos;ve Finished the Test!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Thank you for completing the speed writing test! We appreciate the time and effort you put into it.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-16">
            Your results will be sent to your email within 24 hours. Keep an eye on your inbox for further details.
          </p>

          {/* Footer Links */}
          <div className="flex justify-center space-x-8 mb-8">
            <button 
              onClick={onContact}
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Contact Us
            </button>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <Link 
              href="https://www.linkedin.com/company/nancy-ai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
            >
              <Image 
                src="/linkedin.svg" 
                alt="LinkedIn" 
                width={24} 
                height={24} 
                className="dark:opacity-75 hover:opacity-100 transition-opacity duration-200" 
              />
            </Link>
            <Link 
              href="https://www.facebook.com/nncyai"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
            >
              <Image 
                src="/facebook.svg" 
                alt="Facebook" 
                width={24} 
                height={24} 
                className="dark:opacity-75 hover:opacity-100 transition-opacity duration-200" 
              />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
              <Image 
                src="/instagram.svg" 
                alt="Instagram" 
                width={24} 
                height={24} 
                className="dark:opacity-75 hover:opacity-100 transition-opacity duration-200" 
              />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
              <Image 
                src="/twitter.svg" 
                alt="Twitter" 
                width={24} 
                height={24} 
                className="dark:opacity-75 hover:opacity-100 transition-opacity duration-200" 
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Add the animation styles */}
      <style jsx>{`
        @keyframes confetti {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-confetti {
          animation: confetti 20s linear infinite;
        }
      `}</style>
    </div>
  )
} 