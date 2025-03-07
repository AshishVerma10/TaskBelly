
export type Category = 'cleaning' | 'work' | 'errands' | 'learning' | 'health';

export interface Task {
  id: string;
  name: string;
  category: Category;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  color: string;
}
