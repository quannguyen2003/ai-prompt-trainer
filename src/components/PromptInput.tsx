
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Task } from '@/types';
import { Lightbulb, Send, Eye } from "lucide-react";
import { toast } from "sonner";

interface PromptInputProps {
  currentTask: Task;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ currentTask, onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [charCount, setCharCount] = useState(0);
  const autosaveKey = `autosave_${currentTask.id}`;

  useEffect(() => {
    // Load autosaved content when task changes
    const saved = localStorage.getItem(autosaveKey);
    if (saved) {
      setPrompt(saved);
      setCharCount(saved.length);
    } else {
      // Clear the input if no autosave exists
      setPrompt('');
      setCharCount(0);
    }
  }, [currentTask, autosaveKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
    setCharCount(value.length);
    
    // Autosave
    localStorage.setItem(autosaveKey, value);
  };

  const handleSubmit = () => {
    if (prompt.trim()) {
      if (prompt.length < 10) {
        toast.warning("Your prompt is a bit short. Adding more details will help get better results! Would you like to elaborate a bit more?");
        return;
      }
      toast.success("Evaluating your prompt... This should take just a moment!");
      onSubmit(prompt);
    } else {
      toast("Let's add some content to your prompt before submitting. Even a few words will get us started!", {
        description: "Your creative journey begins with the first word!",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Prompt</span>
          {currentTask.examplePrompt && (
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Example</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-96 overflow-y-auto">
                <div>
                  <h4 className="font-medium mb-2">Example Prompt</h4>
                  <div className="bg-muted p-2 rounded-md whitespace-pre-wrap text-sm font-fira">
                    {currentTask.examplePrompt}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </CardTitle>
        <CardDescription>
          Task: {currentTask.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea 
            className="prompt-textarea"
            value={prompt}
            onChange={handleChange}
            placeholder="Write your prompt here... Be creative and specific!"
            disabled={isLoading}
          />
          <div className="flex justify-end text-sm text-muted-foreground">
            {charCount} characters {charCount > 0 && charCount < 20 ? "(Adding more detail will help get better results!)" : ""}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={isLoading}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button onClick={handleSubmit} disabled={!prompt.trim() || isLoading}>
          {isLoading ? "Evaluating your creativity..." : "Submit for Evaluation"}
          {!isLoading && <Send className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptInput;

