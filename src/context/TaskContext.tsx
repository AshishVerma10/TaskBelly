
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, Category } from '@/types';
import { toast } from '@/hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string, category: Category, notes?: string, dueDate?: Date) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  getTasksByCategory: (category: Category) => Task[];
  getCategoryProgress: (category: Category) => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse the tasks and convert string dates back to Date objects
        const parsedTasks = JSON.parse(savedTasks);
        return parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        }));
      } catch (error) {
        console.error('Failed to parse saved tasks:', error);
        return [];
      }
    }
    return [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string, category: Category, notes?: string, dueDate?: Date) => {
    if (!name.trim()) {
      toast({
        title: "Task name is required",
        variant: "destructive"
      });
      return;
    }
    
    const newTask: Task = {
      id: uuidv4(),
      name: name.trim(),
      category,
      completed: false,
      createdAt: new Date(),
      notes: notes?.trim(),
      dueDate: dueDate
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task added",
      description: `"${name}" has been added to your ${category} list.`
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    const taskName = tasks.find(task => task.id === id)?.name;
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: taskName ? `"${taskName}" has been removed.` : "Task has been removed."
    });
  };

  const getTasksByCategory = (category: Category) => {
    return tasks.filter(task => task.category === category);
  };

  const getCategoryProgress = (category: Category) => {
    const categoryTasks = getTasksByCategory(category);
    if (categoryTasks.length === 0) return 100; // Default to 100% if no tasks
    
    const completedTasks = categoryTasks.filter(task => task.completed).length;
    return Math.round((completedTasks / categoryTasks.length) * 100);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      toggleTaskCompletion, 
      deleteTask, 
      getTasksByCategory, 
      getCategoryProgress 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
