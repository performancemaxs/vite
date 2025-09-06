import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { quizQuestions, answerOptions } from '../data/quizQuestions';
import { Clock } from 'lucide-react';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(new Array(31).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes in seconds
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    // Auto-advance to next question (except for last question)
    if (currentQuestion < 30) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handleEducationAnswer = (optionIndex) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = optionIndex + 1; // Convert to 1-based index
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    // Store responses in localStorage for next page
    localStorage.setItem('quizResponses', JSON.stringify(responses));
    navigate('/results-intro');
  };

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === 30;
  const isEducationQuestion = question.type === 'education';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Timer */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            {question.text}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {isEducationQuestion ? (
              // Education level options
              question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full p-4 text-left justify-start text-lg h-auto ${
                    responses[currentQuestion] === index + 1 
                      ? 'bg-teal-100 border-teal-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleEducationAnswer(index)}
                >
                  {option}
                  {responses[currentQuestion] === index + 1 && (
                    <span className="ml-auto">✓</span>
                  )}
                </Button>
              ))
            ) : (
              // Likert scale options
              answerOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className={`w-full p-4 text-left justify-start text-lg h-auto ${
                    responses[currentQuestion] === option.value 
                      ? option.color.replace('hover:', '') 
                      : option.color.split(' ')[1]
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))
            )}
          </div>

          {/* Get My Results Button (only on last question) */}
          {isLastQuestion && responses[currentQuestion] && (
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 text-lg"
                onClick={() => setShowConfirmation(true)}
              >
                Get My Results
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Do you want to confirm your answers? You will not be able to edit them after validation.
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex flex-wrap justify-center gap-2">
            {quizQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-purple-600 text-white'
                    : responses[index] !== null
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to submit your answers? You won't be able to change them after this.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

