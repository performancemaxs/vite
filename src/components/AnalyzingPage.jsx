import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Star } from 'lucide-react';

export default function AnalyzingPage() {
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
  const [showPreference, setShowPreference] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Memory', completed: false },
    { name: 'Speed', completed: false },
    { name: 'Reaction', completed: false },
    { name: 'Concentration', completed: false },
    { name: 'Logic', completed: false }
  ];

  const [categoryStates, setCategoryStates] = useState(categories);

  useEffect(() => {
    if (!showWarning && !showPreference) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          
          // Update category completion
          const categoryIndex = Math.floor(newProgress / 20);
          if (categoryIndex < 5 && categoryIndex !== currentCategory) {
            setCategoryStates(prevStates => 
              prevStates.map((cat, index) => 
                index <= categoryIndex ? { ...cat, completed: true } : cat
              )
            );
            setCurrentCategory(categoryIndex);
          }

          if (newProgress >= 100) {
            setTimeout(() => navigate('/email'), 1000);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [showWarning, showPreference, currentCategory, navigate]);

  const handleWarningAccept = () => {
    setShowWarning(false);
    setShowPreference(true);
  };

  const handlePreferenceSelect = (preference) => {
    setShowPreference(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Calculating your <span className="text-blue-600">IQ score...</span>
            </h1>
            <p className="text-gray-600">
              Hang tight while our AI brain analyses your answers against the 5 key measures of intelligence...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-600">{progress}%</p>
          </div>

          {/* Categories */}
          <div className="space-y-3 max-w-md mx-auto">
            {categoryStates.map((category, index) => (
              <div key={category.name} className="flex items-center space-x-3">
                <CheckCircle 
                  className={`w-5 h-5 ${
                    category.completed ? 'text-green-500' : 'text-gray-300'
                  }`}
                />
                <span className={`${
                  category.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Ava Thompson",
              location: "Toronto, Canada, 1 hour ago",
              rating: 4,
              text: "I've noticed how better now I can concentrate and stay focused longer since starting IQTester."
            },
            {
              name: "William Harris", 
              location: "London, United Kingdom, 3 hours ago",
              rating: 5,
              text: "Was quite interesting to find out the test results. It made me think outside the box, pretty challenging but it needed all my focus"
            },
            {
              name: "Emma S.",
              location: "Vancouver, Canada, 5 hours ago", 
              rating: 4,
              text: "Honestly, I didn't expect much, but IQTester has totally surprised me. My focus is way better."
            }
          ].map((review, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{review.name}</p>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{review.text}</p>
              <p className="text-xs text-gray-400">{review.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold text-red-600 mb-4">WARNING</h3>
            <p className="text-gray-700 mb-4">
              Your results may surprise you. IQ report reveals hidden strengths and growth areas — 
              a powerful tool for unlocking your potential.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Your results remain confidential and personally yours.
            </p>
            <Button
              onClick={handleWarningAccept}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              I UNDERSTAND
            </Button>
          </div>
        </div>
      )}

      {/* Preference Modal */}
      {showPreference && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Do you prefer working with numbers or words?
            </h3>
            <div className="flex space-x-4">
              <Button
                onClick={() => handlePreferenceSelect('numbers')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Numbers
              </Button>
              <Button
                onClick={() => handlePreferenceSelect('words')}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Words
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

