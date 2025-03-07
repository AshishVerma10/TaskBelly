
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const LoginModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal, login, setShowSignupModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Call login function from AuthContext
    login(email, password);
    
    // Reset form
    setEmail('');
    setPassword('');
    setIsLoading(false);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#2a3b5a] dark:text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl">Login</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="dark:bg-[#1a2a44] dark:border-[#3a4b6a] dark:text-gray-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="dark:bg-[#1a2a44] dark:border-[#3a4b6a] dark:text-gray-200"
              required
            />
          </div>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSwitchToSignup}
              className="dark:border-[#3a4b6a] dark:text-gray-200 dark:hover:bg-[#3a4b6a]/50"
            >
              Need an account? Sign up
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-todo-progress hover:bg-todo-hover text-white dark:bg-[#26a69a] dark:hover:bg-[#4db6ac]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
