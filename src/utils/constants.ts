
import { CategoryInfo } from '@/types';
import { Brush, Briefcase, ShoppingCart, BookOpen, Heart } from 'lucide-react';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: 'Brush',
    color: '#94A3B8'
  },
  {
    id: 'work',
    name: 'Work',
    icon: 'Briefcase',
    color: '#818CF8'
  },
  {
    id: 'errands',
    name: 'Errands',
    icon: 'ShoppingCart',
    color: '#6EE7B7'
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: 'BookOpen',
    color: '#60A5FA'
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'Heart',
    color: '#F472B6'
  }
];

export const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'cleaning':
      return Brush;
    case 'work':
      return Briefcase;
    case 'errands':
      return ShoppingCart;
    case 'learning':
      return BookOpen;
    case 'health':
      return Heart;
    default:
      return Briefcase;
  }
};
