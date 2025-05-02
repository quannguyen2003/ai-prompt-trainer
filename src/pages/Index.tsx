
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { evaluatePrompt, getApiKey, saveEvaluationResult } from '@/utils/evaluationService';
import { EvaluationResult, Task } from '@/types';
import { tasks } from '@/utils/taskData';
import TaskSelection from '@/components/TaskSelection';
import PromptInput from '@/components/PromptInput';
import ResultsDisplay from '@/components/ResultsDisplay';
import ProgressTracker from '@/components/ProgressTracker';
import ApiKeyModal from '@/components/ApiKeyModal';
import { Settings } from 'lucide-react';

const Index = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [stage, setStage] = useState<'select' | 'input' | 'results'>('select');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(!getApiKey());
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const handleSelectTask = (task: Task) => {
    setCurrentTask(task);
    setStage('input');
    setEvaluationResult(null);
  };

  const handleSubmitPrompt = async (prompt: string) => {
    if (!currentTask) return;
    
    setIsLoading(true);
    try {
      const result = await evaluatePrompt(currentTask, prompt);
      if (result) {
        setEvaluationResult(result);
        saveEvaluationResult(currentTask.id, prompt, result);
        setStage('results');
      }
    } catch (error) {
      console.error('Error evaluating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStage('input');
    setEvaluationResult(null);
  };

  const handleBackToTaskSelection = () => {
    setCurrentTask(null);
    setStage('select');
    setEvaluationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-brand-purple">AI Prompt Trainer</h1>
              <p className="text-muted-foreground">Master the art of prompt engineering</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setApiKeyModalOpen(true)}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              API Settings
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <ProgressTracker />
        
        {stage === 'select' && (
          <TaskSelection onSelectTask={handleSelectTask} />
        )}
        
        {stage === 'input' && currentTask && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{currentTask.title}</h2>
              <Button variant="ghost" onClick={handleBackToTaskSelection}>
                Back to Tasks
              </Button>
            </div>
            <PromptInput 
              currentTask={currentTask} 
              onSubmit={handleSubmitPrompt}
              isLoading={isLoading}
            />
          </div>
        )}
        
        {stage === 'results' && evaluationResult && (
          <ResultsDisplay result={evaluationResult} onReset={handleReset} />
        )}
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI Prompt Trainer - Practice and improve your prompt engineering skills</p>
        </div>
      </footer>
      
      <ApiKeyModal 
        open={apiKeyModalOpen}
        onOpenChange={setApiKeyModalOpen}
      />
    </div>
  );
};

export default Index;
