
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TaskProvider } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';
import TaskView from '@/components/TaskView';
import Navbar from '@/components/Navbar';
import { Category } from '@/types';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('work');
  const { isLoggedIn, userEmail, logout, setShowLoginModal, setShowSignupModal } = useAuth();
  const { theme } = useTheme();

  // If not logged in, redirect to welcome page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleSignup = () => {
    setShowSignupModal(true);
  };

  return (
    <TaskProvider>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          userEmail={userEmail} 
          onLogin={handleLogin}
          onSignup={handleSignup}
          onLogout={logout}
        />
        <Layout
          sidebar={
            <Sidebar 
              activeCategory={activeCategory}
              onSelectCategory={(category) => setActiveCategory(category as Category)}
            />
          }
          content={
            <TaskView category={activeCategory} />
          }
        />
      </div>
    </TaskProvider>
  );
};

export default Index;
