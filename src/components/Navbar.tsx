
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sun, Moon, LogIn, LogOut, UserPlus, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface NavbarProps {
  isLoggedIn: boolean;
  userEmail?: string;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  userEmail,
  onLogin,
  onSignup,
  onLogout
}) => {
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Format the current time and date
  const formattedTime = format(currentTime, 'HH:mm:ss');
  const formattedDate = format(currentTime, 'MMM dd, yyyy');

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userEmail) return '?';
    return userEmail.charAt(0).toUpperCase();
  };

  return (
    <div className="glass border-b border-white/20 shadow-sm dark:border-[#3a4b6a]/40">
      <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Simple TodoList</h1>
        
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          {isLoggedIn ? (
            <>
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={onLogout} className="dark:border-[#3a4b6a] dark:text-gray-200">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={onLogin} className="dark:border-[#3a4b6a] dark:text-gray-200">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button variant="outline" size="sm" onClick={onSignup} className="dark:border-[#3a4b6a] dark:text-gray-200">
                <UserPlus className="w-4 h-4 mr-2" />
                Signup
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-2 dark:text-gray-200 dark:hover:bg-[#3a4b6a]"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
