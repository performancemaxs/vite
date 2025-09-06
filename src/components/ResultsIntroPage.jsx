import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Star, Users } from 'lucide-react';

export default function ResultsIntroPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/analyzing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          <span className="text-blue-600">20 Million+</span> people have discovered their IQ score with IQTester
        </h1>

        {/* Customer Testimonial */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">EB</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">Elena Brooks</h3>
            <p className="text-sm text-gray-500">March 5, 2025</p>
          </div>

          <div className="flex justify-center mb-4">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>

          <blockquote className="text-lg font-semibold text-gray-900 mb-4">
            "It's changed my perspective!"
          </blockquote>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            I'm so thankful for this test! It gave me deep insight into my intelligence and how I think. 
            The results were spot on and helped me understand my strengths and areas for growth.
          </p>
        </div>

        {/* Social Proof Stats */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">12024 users</span>
            <span className="text-gray-600">took their IQ test today.</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-600">Trusted by over</span>
            <span className="text-lg font-semibold text-blue-600">20 million people.</span>
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg mb-6"
          onClick={handleContinue}
        >
          Continue
        </Button>

        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <span className="text-sm font-semibold text-gray-400">THE GLOBE AND MAIL</span>
          <span className="text-sm font-semibold text-gray-400">BENZINGA</span>
        </div>
      </div>
    </div>
  );
}

