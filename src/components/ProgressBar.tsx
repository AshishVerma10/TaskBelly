
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress-width', `${progress}%`);
    }
  }, [progress]);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="progress-bar">
        <div 
          ref={progressBarRef}
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
