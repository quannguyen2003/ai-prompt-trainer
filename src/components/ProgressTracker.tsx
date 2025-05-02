
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { getUserProgress } from '@/utils/evaluationService';

const ProgressTracker: React.FC = () => {
  const progress = getUserProgress();
  const completedCount = progress.completedTasks?.length || 0;
  const promptScore = Math.round(progress.averagePromptScore || 0);
  const outputScore = Math.round(progress.averageOutputScore || 0);

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-secondary/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">Tasks Completed</p>
          <p className="text-2xl font-bold">{completedCount}</p>
        </div>
        
        <div className="bg-secondary/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">Avg. Prompt Score</p>
          <p className="text-2xl font-bold">{promptScore}</p>
          <Progress 
            value={promptScore} 
            className="h-1.5 mt-2" 
          />
        </div>
        
        <div className="bg-secondary/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">Avg. Output Score</p>
          <p className="text-2xl font-bold">{outputScore}</p>
          <Progress 
            value={outputScore} 
            className="h-1.5 mt-2" 
          />
        </div>
      </div>
      
      {completedCount === 0 && (
        <div className="text-center p-2 bg-muted/50 rounded-md">
          <p className="text-sm text-muted-foreground">
            Complete tasks to see your progress statistics
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
