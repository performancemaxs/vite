import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Brain } from 'lucide-react';

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Get ready to start the <span className="text-blue-600">IQ Test!</span>
          </h1>
        </div>

        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">You will get 31 questions with growing difficulty</span>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Select the right answer out of the 5 options</span>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">You can skip the question and return back later</span>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg mb-4"
          asChild
        >
          <Link to="/quiz">Start IQ Test</Link>
        </Button>

        <p className="text-sm text-gray-500">
          Today's average IQ score: <span className="font-semibold text-blue-600">112</span>
        </p>
      </div>
    </div>
  );
}

