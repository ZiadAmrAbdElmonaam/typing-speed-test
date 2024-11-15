import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/app/components/ui/textarea';

interface ContactScreenProps {
  onBack: () => void;
}

export function ContactScreen({ onBack }: ContactScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div 
      style={{
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), #FFFFFF 60%), conic-gradient(from 179.42deg at 47.87% -110.87%, #FFF -25.84deg, #7001D3 0.27deg, #FFF 23.53deg, #FFF 127.5deg, #FFF 196.87deg, #FFF 334.16deg, #7001D3 360.27deg)"
      }}
      className="min-h-screen dark:bg-black"
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
              onClick={onBack}
              className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 dark:border-purple-800"
            >
              Back
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-24">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Contact Us for More
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Our expert team are ready to answer your questions
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  placeholder="ex: Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  placeholder="ex: +02012345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <Textarea
                  placeholder="write you message here"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 rounded-full text-lg text-white shadow-md hover:shadow-lg transition-all duration-200"
                style={{
                  background: "linear-gradient(to right, #d898f8, #7001d3, #a4b0ff)",
                }}
              >
                Submit
              </Button>
            </div>
          </form>

          {/* WhatsApp Option */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or chat with us directly via Whatsapp
            </p>
            <a
              href="https://wa.me/your_whatsapp_number"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
              </svg>
              <span>Start Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 