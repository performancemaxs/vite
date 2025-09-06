import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateIQ } from '../data/quizQuestions';
import { Star, Shield, Award, Brain, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 58); // 6:58 in seconds
  const [recentPurchase, setRecentPurchase] = useState('Jack');

  // Get stored data
  const responses = JSON.parse(localStorage.getItem('quizResponses') || '[]');
  const email = localStorage.getItem('userEmail') || '';
  const results = calculateIQ(responses);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate recent purchases
  useEffect(() => {
    const names = ['Jack', 'Sarah', 'Mike', 'Emma', 'David'];
    const interval = setInterval(() => {
      setRecentPurchase(names[Math.floor(Math.random() * names.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-blue-600 text-white py-2 text-center">
        <div className="flex items-center justify-center space-x-4">
          <span className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">🇺🇸</span>
            </span>
            <span>{recentPurchase} Just Bought his IQ Score!</span>
          </span>
          <span className="font-bold">IQ {Math.floor(Math.random() * 40) + 100}</span>
        </div>
      </div>

      {/* Urgency Banner */}
      <div className="bg-yellow-400 text-center py-3">
        <p className="font-bold text-lg">
          IQ Score only $1.00! Offer ends in {formatTime(timeLeft)}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Hero & Features */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Your Report is Ready!<br />
                <span className="text-blue-600">Reveal Your IQ Score Today!</span>
              </h1>

              {/* IQ Comparison */}
              <div className="flex justify-between items-end mb-6">
                <div className="text-center">
                  <div className="w-16 h-20 bg-gray-300 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Coco Chanel</p>
                  <p className="text-blue-600 font-bold">IQ 113</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-24 bg-blue-500 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-white text-2xl">?</span>
                  </div>
                  <p className="text-sm font-medium">You</p>
                  <p className="text-blue-600 font-bold">IQ ???</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-20 bg-gray-300 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Steve Jobs</p>
                  <p className="text-blue-600 font-bold">IQ 160</p>
                </div>
              </div>

              <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg">
                Get My IQ Certificate Now!
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-center mb-6">Why You Can Trust IQTester</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Validated IQ Test</h4>
                    <p className="text-sm text-gray-600">
                      Our assessment is based on the Stanford-Binet Intelligence Scale, 
                      the gold standard in IQ testing since 1916.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Comprehensive Report</h4>
                    <p className="text-sm text-gray-600">
                      Your personalized report is generated using the widely accepted 
                      Cattell-Horn-Carroll (CHC) theory of cognitive abilities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Neuroscience-Backed Training</h4>
                    <p className="text-sm text-gray-600">
                      Our cognitive training programs are grounded in the latest neuroscience research, 
                      proven to enhance cognitive function and boost IQ scores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Checkout */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Try IQTester for 7 days</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Get your precise IQ score with our scientifically-validated assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Know where you stand compared to the general population</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Identify your cognitive strengths and weaknesses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">
                    Get a 7-day trial for just $1.00. <strong>After trial, we'll charge $29.99/month</strong> until you cancel.
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-green-700">Promo Code IQTEST-85 Applied</span>
                  <span className="text-sm font-semibold text-green-700">You save 85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total due today:</span>
                  <div className="text-right">
                    <span className="text-lg line-through text-gray-500">$6.99</span>
                    <span className="text-2xl font-bold text-green-600 ml-2">$1.00</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">CHOOSE YOUR PAYMENT METHOD</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="p-4 h-auto">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-1"></div>
                      <span className="text-xs">PayPal</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-800 rounded mx-auto mb-1"></div>
                      <span className="text-xs">Card</span>
                    </div>
                  </Button>
                </div>

                <div className="space-y-3">
                  <Input placeholder="Card Number" className="p-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="MM/YY" className="p-3" />
                    <Input placeholder="CVC" className="p-3" />
                  </div>
                  <Input placeholder="Cardholder Name" className="p-3" />
                </div>

                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg">
                  Complete Purchase - $1.00
                </Button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="text-center">
                <p className="text-sm text-gray-600">Over 7869 tests taken today</p>
                <p className="text-sm text-gray-600">Avg. IQ score: 104</p>
                <p className="text-lg font-bold text-green-600">+734</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Report Preview */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Personal IQ Report</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Your results reveal fascinating insights into your cognitive strengths and untapped potential. 
              With scores that place you among the top performers in key areas, your abilities in Logic and 
              Pattern Recognition are truly exceptional:
            </p>
            <div className="bg-white rounded p-4 border-l-4 border-blue-500">
              <p className="text-gray-600 italic">
                Your compatibility with Scorpio is a mystery. We have found many positive aspects but there are 
                also pitfalls that can destroy your relationship and prevent you from starting a new one.
              </p>
            </div>
            <p className="text-center text-blue-600 font-semibold mt-4">
              To read the full report, you need full access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

