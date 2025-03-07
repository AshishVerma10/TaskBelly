
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Category, Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';

interface TaskListProps {
  category: Category;
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const { getTasksByCategory, toggleTaskCompletion, deleteTask, getCategoryProgress } = useTaskContext();
  
  const tasks = getTasksByCategory(category);
  const progress = getCategoryProgress(category);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (tasks.length === 0) {
    return (
      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">List of Tasks</h2>
        <ProgressBar progress={100} className="mb-4" />
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks in this category
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">List of Tasks</h2>
      <ProgressBar progress={progress} className="mb-4" />
      
      <div className="h-[300px] overflow-y-auto custom-scrollbar pr-2">
        <motion.ul 
          className="space-y-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTaskCompletion} 
              onDelete={deleteTask} 
              variants={item}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete,
  variants
}: { 
  task: Task; 
  onToggle: (id: string) => void; 
  onDelete: (id: string) => void;
  variants: any;
}) => {
  return (
    <motion.li 
      variants={variants}
      className="flex items-center justify-between p-3 rounded-lg bg-white bg-opacity-50 hover:bg-opacity-80 transition-all dark:bg-[#1a2a44] dark:bg-opacity-50 dark:hover:bg-opacity-70"
    >
      <div className="flex items-center space-x-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={() => onToggle(task.id)}
          className="data-[state=checked]:bg-todo-progress data-[state=checked]:border-todo-progress dark:border-[#3a4b6a]"
        />
        <span className={`${task.completed ? 'line-through text-gray-400' : 'dark:text-gray-200'}`}>
          {task.name}
        </span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Trash2 size={18} />
      </Button>
    </motion.li>
  );
};

export default TaskList;
