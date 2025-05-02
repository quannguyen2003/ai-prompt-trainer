
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, getTasksByCategory } from '@/utils/taskData';
import { Task } from '@/types';
import { Badge } from '@/components/ui/badge';

interface TaskSelectionProps {
  onSelectTask: (task: Task) => void;
}

const TaskSelection: React.FC<TaskSelectionProps> = ({ onSelectTask }) => {
  const [activeCategory, setActiveCategory] = React.useState(categories[0].id);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Select a Task</h2>
      
      <Tabs defaultValue={categories[0].id} onValueChange={handleCategoryChange}>
        <TabsList className="mb-4 flex flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getTasksByCategory(category.id).map((task) => (
                <Card 
                  key={task.id}
                  className="cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => onSelectTask(task)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge className={`${getDifficultyColor(task.difficulty)}`}>
                        {task.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {task.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TaskSelection;
