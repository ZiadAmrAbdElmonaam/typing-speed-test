import Image from 'next/image'
import { Button } from '@/app/components/ui/button';

interface StartTestScreenProps {
  timeInSeconds: number;
  onStartTest: () => void;
  onContact: () => void;
}

export function StartTestScreen({ timeInSeconds, onStartTest, onContact }: StartTestScreenProps) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

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
              onClick={onContact}
              className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 dark:border-purple-800"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-24">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            you will start your writing speed test now,
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            click start once you are ready
          </p>
          
          {/* Timer Display */}
          <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent my-6">
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
            <span className="text-2xl ml-1">Sec</span>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStartTest}
            className="relative px-8 py-3 rounded-full text-lg text-white shadow-md hover:shadow-lg transition-all duration-200 min-w-[200px] mt-8"
            style={{
              background: "linear-gradient(to right, #d898f8, #7001d3, #a4b0ff)",
              backgroundImage: "linear-gradient(to right, #d898f8, #7001d3, #a4b0ff)"
            }}
          >
            Start the Test
          </Button>
        </div>
      </div>
    </div>
  );
} 