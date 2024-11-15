import Image from 'next/image'
import Link from 'next/link'
import { TestResult } from '../types'
import { Button } from '@/app/components/ui/button';

interface CompletionScreenProps {
  testResult: TestResult;
}

export function CompletionScreen({  }: CompletionScreenProps) {
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900/20 dark:to-gray-900"
    >
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8 mt-10">
          <div className="absolute left-20 mt-2">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-xl" />
          </div>
          <div className="absolute right-20">
            <Button 
              variant="outline"
              className="text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              style={{
                border: "2px solid transparent",
                color: "#6a1b9a",
                borderRadius: "8px",
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="text-center mt-16">
          <Image src="/aiphoto.png" alt="Complete" width={200} height={200} className="mx-auto mb-8" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
            Great Job! You&apos;ve Finished the Test!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for completing the speed writing test! We appreciate the time and effort you put into it.
          </p>
          <p className="text-gray-500 text-sm mb-16">
            Your results will be sent to your email within 24 hours. Keep an eye on your inbox for further details.
          </p>

          {/* Footer Links */}
          <div className="flex justify-center space-x-8 mb-8">
            <Link 
              href="#" 
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
              <Image 
                src="/linkedin.svg" 
                alt="LinkedIn" 
                width={24} 
                height={24} 
              />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
              <Image 
                src="/instagram.svg" 
                alt="Instagram" 
                width={24} 
                height={24} 
              />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
              <Image 
                src="/facebook.svg" 
                alt="Facebook" 
                width={24} 
                height={24} 
              />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-200">
              <Image 
                src="/twitter.svg" 
                alt="Twitter" 
                width={24} 
                height={24} 
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 