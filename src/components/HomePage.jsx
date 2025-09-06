import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [currentTestCount, setCurrentTestCount] = useState(12024);
  const [recentResults, setRecentResults] = useState([]);

  // Simulate dynamic test count
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate recent test results
  useEffect(() => {
    const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'John', 'Kate'];
    const locations = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Tokyo'];
    
    const generateResult = () => ({
      name: names[Math.floor(Math.random() * names.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      iq: Math.floor(Math.random() * 40) + 100,
      id: Math.random()
    });

    setRecentResults([generateResult(), generateResult(), generateResult()]);

    const interval = setInterval(() => {
      setRecentResults(prev => [generateResult(), ...prev.slice(0, 2)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Want to Know Your{' '}
              <span className="text-blue-600">Real IQ Score?</span>
            </h1>
            
            <p className="text-xl text-gray-600">
              Take our IQ test and unlock your path to self-discovery and development
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link to="/start">Start IQ Test Now</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
              >
                How It Works
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">Excellent user reviews</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-blue-600 font-semibold">
              <Users className="w-5 h-5" />
              <span>{currentTestCount.toLocaleString()} IQ tests taken today!</span>
            </div>
          </div>

          {/* IQ Distribution Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">IQ Score Distribution</h3>
            </div>
            
            {/* Simple bell curve visualization */}
            <div className="relative h-48 flex items-end justify-center space-x-1">
              {[0.1, 2.1, 13.6, 34.1, 34.1, 13.6, 2.1, 0.1].map((percentage, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-blue-500 rounded-t"
                    style={{ 
                      height: `${percentage * 4}px`,
                      width: '20px'
                    }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">
                    {[55, 70, 85, 100, 115, 130, 145][index]}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Average IQ: 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <span className="text-lg font-semibold text-gray-400">BENZINGA</span>
            <span className="text-lg font-semibold text-gray-400">BARCHART</span>
            <span className="text-lg font-semibold text-gray-400">YAHOO!</span>
            <span className="text-lg font-semibold text-gray-400">THE GLOBE AND MAIL</span>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How it Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold">Take a Test</h3>
            <p className="text-gray-600">Get an unbiased view of yourself</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Get Your Detailed Report</h3>
            <p className="text-gray-600">Learn your strengths and discover areas for growth</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">Begin Your Journey</h3>
            <p className="text-gray-600">Start improving with expert courses and brain training</p>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">Latest Results</h3>
          <div className="space-y-2">
            {recentResults.map((result) => (
              <div 
                key={result.id}
                className="flex justify-center items-center space-x-4 text-sm text-gray-600 animate-fade-in"
              >
                <span className="font-medium">{result.name}</span>
                <span>from {result.location}</span>
                <span className="font-semibold text-blue-600">IQ {result.iq}</span>
                <span className="text-green-600">✓ Completed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

