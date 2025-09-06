import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultsIntroPage from './components/ResultsIntroPage';
import AnalyzingPage from './components/AnalyzingPage';
import EmailCapturePage from './components/EmailCapturePage';
import CheckoutPage from './components/CheckoutPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results-intro" element={<ResultsIntroPage />} />
          <Route path="/analyzing" element={<AnalyzingPage />} />
          <Route path="/email" element={<EmailCapturePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<div className="p-8 text-center">Login page coming soon...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

