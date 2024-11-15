import Image from 'next/image'
import Link from 'next/link'
import { TestResult } from '../types'

interface CompletionScreenProps {
  testResult: TestResult;
}

export function CompletionScreen({ }: CompletionScreenProps) {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #FCE7F3 100%)"
      }}
    >
      <div className="max-w-5xl mx-auto p-8">
        {/* Logo */}
        <div className="fixed left-8 top-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-xl"
          />
        </div>

        {/* Main Content */}
        <div className="text-center mt-16">
          <div className="relative">
            <Image
              src="/aiphoto.png"
              alt="Complete"
              width={200}
              height={200}
              className="mx-auto mb-8"
            />
            {/* Confetti effect around the image */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10">
              <Image
                src="/confetti.png"
                alt="confetti"
                width={300}
                height={300}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-900">
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