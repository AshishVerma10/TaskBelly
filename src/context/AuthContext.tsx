
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  showLoginModal: boolean;
  showSignupModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isLoggedIn');
    return savedAuth === 'true';
  });
  
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('userEmail');
  });
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [isLoggedIn, userEmail]);

  const login = (email: string, password: string) => {
    // Simulate API call to login
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserEmail(email);
      setShowLoginModal(false);
      toast({
        title: "Login successful",
        description: `Welcome back, ${email}!`
      });
    }, 1000);
  };

  const signup = (email: string, password: string) => {
    // Simulate API call to signup
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserEmail(email);
      setShowSignupModal(false);
      toast({
        title: "Signup successful",
        description: `Welcome, ${email}!`
      });
    }, 1000);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        userEmail, 
        login, 
        signup, 
        logout, 
        showLoginModal, 
        showSignupModal, 
        setShowLoginModal, 
        setShowSignupModal 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
