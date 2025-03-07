
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const SignupModal: React.FC = () => {
  const { showSignupModal, setShowSignupModal, signup, setShowLoginModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Call signup function from AuthContext
    signup(email, password);
    
    // Reset form
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#2a3b5a] dark:text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl">Create an Account</DialogTitle>
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
              placeholder="Create a password"
              className="dark:bg-[#1a2a44] dark:border-[#3a4b6a] dark:text-gray-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="dark:text-gray-200">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="dark:bg-[#1a2a44] dark:border-[#3a4b6a] dark:text-gray-200"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSwitchToLogin}
              className="dark:border-[#3a4b6a] dark:text-gray-200 dark:hover:bg-[#3a4b6a]/50"
            >
              Already have an account? Log in
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-todo-progress hover:bg-todo-hover text-white dark:bg-[#26a69a] dark:hover:bg-[#4db6ac]"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
