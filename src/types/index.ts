
export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examplePrompt?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface PromptEvaluation {
  strengths: string[];
  weaknesses: string[];
}

export interface OutputEvaluation {
  strengths: string[];
  weaknesses: string[];
}

export interface EvaluationResult {
  prompt_score: number;
  output_score: number;
  prompt_evaluation: PromptEvaluation;
  output_evaluation: OutputEvaluation;
  simulated_output: string;
  improvement_suggestions: string[];
  improved_prompt_example: string;
}

export interface UserProgress {
  completedTasks: string[];
  totalScore: number;
  averagePromptScore: number;
  averageOutputScore: number;
}
