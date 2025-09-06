import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { calculateIQ } from '../data/quizQuestions';
import { Clock, TrendingUp, Eye } from 'lucide-react';

export default function EmailCapturePage() {
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  // Calculate results from stored responses
  const responses = JSON.parse(localStorage.getItem('quizResponses') || '[]');
  const results = calculateIQ(responses);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && acceptTerms) {
      // Store email and proceed to checkout
      localStorage.setItem('userEmail', email);
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Visualization */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold text-center mb-6">Your Cognitive Profile</h3>
            
            {/* Bar Chart Visualization */}
            <div className="space-y-4">
              {Object.entries(results.categoryScores).map(([category, score], index) => {
                const colors = ['bg-red-400', 'bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-yellow-400'];
                const percentage = (score / 100) * 100;
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{category}</span>
                      <span>{score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${colors[index]} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Email Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Discover <span className="text-blue-600">Your IQ</span> Potential!
            </h1>
            <p className="text-gray-600">
              Enter your email to unlock your complete IQ analysis and personalized cognitive profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg bg-gray-50 border-gray-200"
                required
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <Button 
              type="submit"
              size="lg" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg"
              disabled={!email || !acceptTerms}
            >
              Continue
            </Button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Completion Time</p>
              <p className="font-semibold">0m 24s</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Faster Than</p>
              <p className="font-semibold">{results.percentile}% of test takers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Strongest Skill</p>
              <p className="font-semibold">Visual Perception</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

