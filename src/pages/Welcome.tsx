
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, ClipboardList, User } from 'lucide-react';

const Welcome = () => {
  const { isLoggedIn, setShowLoginModal, setShowSignupModal } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
            Welcome to <span className="text-primary dark:text-[#26a69a]">Simple TodoList</span>
          </h1>
          
          <p className="text-xl mb-12 dark:text-gray-200">
            The easiest way to keep track of your tasks and stay productive.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard 
              icon={<ClipboardList size={32} />}
              title="Organize Tasks"
              description="Categorize your tasks to keep everything organized and easy to find."
            />
            <FeatureCard 
              icon={<CheckCircle size={32} />}
              title="Track Progress"
              description="See your progress with each category and stay motivated."
            />
            <FeatureCard 
              icon={<User size={32} />}
              title="Personal Account"
              description="Create your account to sync your tasks across devices."
            />
          </div>
          
          <div className="space-x-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 text-white dark:bg-[#26a69a] dark:hover:bg-[#4db6ac]"
            >
              Get Started
            </Button>
            {!isLoggedIn && (
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowSignupModal(true)}
                className="dark:border-[#3a4b6a] dark:text-gray-200"
              >
                Create Account
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode,
  title: string,
  description: string 
}) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center">
      <div className="mb-4 text-primary dark:text-[#26a69a]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default Welcome;
