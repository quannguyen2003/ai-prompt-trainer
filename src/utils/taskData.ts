
import { Category, Task } from '../types';

export const categories: Category[] = [
  { id: 'writing', name: 'Creative Writing' },
  { id: 'coding', name: 'Code Generation' },
  { id: 'business', name: 'Business Content' },
  { id: 'data', name: 'Data Analysis' },
  { id: 'personal', name: 'Personal Assistance' },
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Create a Personalized Workout Plan',
    description: 'Write a prompt that generates a personalized weekly workout plan for someone looking to build muscle while working out at home with minimal equipment.',
    category: 'personal',
    difficulty: 'beginner',
    examplePrompt: 'Create a 5-day home workout plan for someone with the following details:\n- Goal: Build muscle\n- Equipment: Only dumbbells and a pull-up bar\n- Experience: Intermediate (2 years of consistent training)\n- Time available: 45 minutes per session\n- Specific focus: Upper body and core strength\n\nFor each day, include:\n1. Warm-up exercises (2-3 exercises, 5 minutes)\n2. Main workout routine with exercises, sets, reps, and rest periods\n3. Cool down stretches\n4. One nutrition tip relevant to the day\'s workout\n\nPresent the plan in a structured format with each day clearly labeled. Include alternatives for exercises that might be too challenging.'
  },
  {
    id: 'task-2',
    title: 'Generate a React Component',
    description: 'Write a prompt that generates a reusable React component for a customizable button with various styles and states.',
    category: 'coding',
    difficulty: 'intermediate',
    examplePrompt: 'Create a TypeScript React functional component for a reusable Button that:\n\n1. Accepts the following props:\n   - variant: "primary" | "secondary" | "outline" | "ghost" | "link" (default: "primary")\n   - size: "sm" | "md" | "lg" (default: "md")\n   - isLoading: boolean (default: false)\n   - isDisabled: boolean (default: false)\n   - leftIcon?: React.ReactNode\n   - rightIcon?: React.ReactNode\n   - children: React.ReactNode (button text/content)\n   - className?: string (for additional styling)\n   - ...rest (spread remaining props to button element)\n\n2. Implements proper TypeScript types and interfaces\n\n3. Uses a combination of CSS modules or a CSS-in-JS solution like styled-components\n\n4. Shows a spinner when isLoading is true\n\n5. Properly handles disabled state\n\n6. Includes accessibility attributes\n\n7. Has appropriate hover, focus, and active states\n\nProvide comprehensive implementation with comments explaining key sections.'
  },
  {
    id: 'task-3',
    title: 'Write a Marketing Email',
    description: 'Write a prompt that creates a compelling marketing email for a new product launch.',
    category: 'business',
    difficulty: 'intermediate'
  },
  {
    id: 'task-4',
    title: 'Data Visualization Recommendation',
    description: 'Write a prompt that asks for appropriate data visualization recommendations for a specific dataset and analysis goal.',
    category: 'data',
    difficulty: 'advanced'
  },
  {
    id: 'task-5',
    title: 'Short Story Creation',
    description: 'Write a prompt that generates an engaging short story with specific themes and character types.',
    category: 'writing',
    difficulty: 'beginner'
  }
];

export const getTasksByCategory = (categoryId: string): Task[] => {
  return tasks.filter(task => task.category === categoryId);
};

export const getTaskById = (taskId: string): Task | undefined => {
  return tasks.find(task => task.id === taskId);
};
