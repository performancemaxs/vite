import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-teal-600" />
          <span className="text-xl font-bold text-gray-900">IQTester</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" asChild>
            <Link to="/start">Start Test</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

