
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { CATEGORIES } from '@/utils/constants';

interface AddTaskFormProps {
  currentCategory: Category;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ currentCategory }) => {
  const { addTask } = useTaskContext();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [category, setCategory] = useState<Category>(currentCategory);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName, category, taskDescription, dueDate);
      setTaskName('');
      setTaskDescription('');
      setDueDate(undefined);
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="taskName">Task Name:</Label>
          <Input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name..."
            className="w-full"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taskDescription">Task Description:</Label>
          <Textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description..."
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category:</Label>
          <Select 
            value={category} 
            onValueChange={(value) => setCategory(value as Category)}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date:</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal dark:text-gray-300 dark:border-[#3a4b6a]"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark:bg-[#2a3b5a]">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <Button type="submit" className="w-full">
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTaskForm;
