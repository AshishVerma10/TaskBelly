
import React from 'react';
import { motion } from 'framer-motion';
import { useTaskContext } from '@/context/TaskContext';
import { CATEGORIES, getCategoryIcon } from '@/utils/constants';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const { getCategoryProgress } = useTaskContext();
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full ${!isMobile ? 'max-w-xs' : ''} flex flex-col p-4`}>
      <div className={`glass-card p-6 w-full flex ${isMobile ? 'flex-row justify-between overflow-x-auto' : 'flex-col space-y-6'}`}>
        {CATEGORIES.map((category) => {
          const progress = getCategoryProgress(category.id);
          const IconComponent = getCategoryIcon(category.id);
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(category.id)}
              className={`rounded-xl p-4 flex ${isMobile ? 'flex-col' : 'flex-row'} items-center transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-white dark:bg-[#3a4b6a] shadow-md' 
                  : 'hover:bg-white/50 dark:hover:bg-[#3a4b6a]/50'
              }`}
            >
              <div 
                className="category-icon mb-2"
                style={{ backgroundColor: category.color }}
              >
                <IconComponent size={24} />
              </div>
              <div className={`${isMobile ? 'text-center' : 'ml-3 text-left'} dark:text-gray-200`}>
                <div className="font-medium">{category.name}</div>
                {!isMobile && (
                  <div className="text-sm text-gray-500 dark:text-gray-300">{progress}% done</div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
