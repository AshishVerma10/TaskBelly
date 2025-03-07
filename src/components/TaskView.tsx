
import React from 'react';
import { Category } from '@/types';
import { CATEGORIES } from '@/utils/constants';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

interface TaskViewProps {
  category: Category;
}

const TaskView: React.FC<TaskViewProps> = ({ category }) => {
  const categoryInfo = CATEGORIES.find(cat => cat.id === category);

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in px-4">
      <h1 className="text-2xl font-bold mb-6">
        List of {categoryInfo?.name} Tasks
      </h1>
      
      <TaskList category={category} />
      <AddTaskForm currentCategory={category} />
    </div>
  );
};

export default TaskView;
