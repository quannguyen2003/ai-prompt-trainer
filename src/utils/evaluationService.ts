import { EvaluationResult, Task } from '../types';
import { toast } from "sonner";

// In a real application, this would be stored securely in environment variables
// and accessed through a backend service
let apiKey = "";

export const setApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('gemini_api_key', key);
};

export const getApiKey = (): string => {
  if (!apiKey) {
    apiKey = localStorage.getItem('gemini_api_key') || "";
  }
  return apiKey;
};

export const evaluatePrompt = async (
  task: Task,
  userPrompt: string
): Promise<EvaluationResult | null> => {
  try {
    const key = getApiKey();
    
    if (!key) {
      toast.error("It looks like we're missing an API key. Let's add your Gemini API key in settings to get started with prompt evaluation!");
      return null;
    }

    const systemPrompt = `You are an expert prompt evaluator. Your task is to evaluate a user's prompt based on how well it would perform for the given task. Analyze both the prompt itself and simulate the output it would likely generate.

TASK DESCRIPTION: ${task.description}

USER PROMPT: ${userPrompt}

Evaluation process:
1. First, analyze the user's prompt based on these criteria:
   - Clarity: Is the prompt clear and specific?
   - Structure: Is the prompt well-organized and logically structured?
   - Constraints: Does the prompt include necessary constraints and guidelines?
   - Examples: Does the prompt use examples effectively (when applicable)?
   - Efficiency: Does the prompt achieve its goal with minimal tokens?

2. Generate what you believe would be the output from this prompt if given to an AI.

3. Evaluate this simulated output based on:
   - Relevance: How well does it address the task?
   - Completeness: Does it cover all aspects of the task?
   - Accuracy: Is the information correct and precise?
   - Creativity: Does it show originality when needed?
   - Format: Does it follow the requested format (if specified)?

4. Score the prompt quality from 0-100.
5. Score the output quality from 0-100.
6. Provide specific feedback with actionable suggestions for improvement.
7. Show an example of how the prompt could be improved.

Return your evaluation in the following JSON format without any additional text:
{
  "prompt_score": number,
  "output_score": number,
  "prompt_evaluation": {
    "strengths": [string array],
    "weaknesses": [string array]
  },
  "output_evaluation": {
    "strengths": [string array],
    "weaknesses": [string array]
  },
  "simulated_output": string,
  "improvement_suggestions": [string array],
  "improved_prompt_example": string
}`;

    // Using the Gemini API through a proxy endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      
      // More empathetic error messages based on error type
      if (errorData.error?.code === 400) {
        toast.error("We had a small issue with your request. This might be due to the content of your prompt. Would you like to try a different approach?");
      } else if (errorData.error?.code === 401 || errorData.error?.code === 403) {
        toast.error("There seems to be an issue with your API key. Let's verify it in settings to continue your prompt evaluation journey!");
      } else if (errorData.error?.code === 429) {
        toast.error("You've been creating so many great prompts that we've hit the API rate limit! Let's take a short break and try again in a moment.");
      } else {
        toast.error(`We encountered an unexpected hiccup: ${errorData.error?.message || 'Something went wrong with the evaluation'}. Let's try again in a moment!`);
      }
      return null;
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return result as EvaluationResult;
      } else {
        toast.error("We had trouble understanding the evaluation result. Let's try again with a slightly different prompt!");
        console.error("Invalid response format:", responseText);
        return null;
      }
    } catch (parseError) {
      toast.error("We had a small hiccup processing your results. Let's give it another try!");
      console.error("Parse error:", parseError, "Response:", responseText);
      return null;
    }
  } catch (error) {
    console.error("Evaluation error:", error);
    toast.error(`We hit a bump in the road: ${error instanceof Error ? error.message : 'Something unexpected happened'}. Let's try again in a moment!`);
    return null;
  }
};

// Store evaluation results in local storage
export const saveEvaluationResult = (taskId: string, userPrompt: string, result: EvaluationResult) => {
  try {
    const historyKey = `prompt_history_${taskId}`;
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    
    history.push({
      timestamp: new Date().toISOString(),
      userPrompt,
      result,
    });
    
    localStorage.setItem(historyKey, JSON.stringify(history));
    
    // Update user progress
    updateUserProgress(taskId, result);
  } catch (error) {
    console.error("Error saving evaluation result:", error);
    toast.error("We couldn't save your progress this time. Your evaluation is still available, and we'll try to save it next time!");
  }
};

export const updateUserProgress = (taskId: string, result: EvaluationResult) => {
  try {
    const progressKey = 'user_progress';
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{"completedTasks":[],"totalScore":0,"totalPromptScore":0,"totalOutputScore":0,"tasksCompleted":0}');
    
    if (!progress.completedTasks.includes(taskId)) {
      progress.completedTasks.push(taskId);
    }
    
    progress.totalPromptScore = (progress.totalPromptScore || 0) + result.prompt_score;
    progress.totalOutputScore = (progress.totalOutputScore || 0) + result.output_score;
    progress.tasksCompleted = (progress.tasksCompleted || 0) + 1;
    progress.averagePromptScore = progress.totalPromptScore / progress.tasksCompleted;
    progress.averageOutputScore = progress.totalOutputScore / progress.tasksCompleted;
    
    localStorage.setItem(progressKey, JSON.stringify(progress));
  } catch (error) {
    console.error("Error updating user progress:", error);
  }
};

export const getUserProgress = () => {
  try {
    const progressKey = 'user_progress';
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{"completedTasks":[],"averagePromptScore":0,"averageOutputScore":0,"tasksCompleted":0}');
    return progress;
  } catch (error) {
    console.error("Error getting user progress:", error);
    return {
      completedTasks: [],
      averagePromptScore: 0,
      averageOutputScore: 0,
      tasksCompleted: 0
    };
  }
};
