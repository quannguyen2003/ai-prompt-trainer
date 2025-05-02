
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setApiKey, getApiKey } from '@/utils/evaluationService';
import { toast } from "sonner";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ open, onOpenChange }) => {
  const [apiKey, setApiKeyState] = useState(getApiKey() || '');

  const handleSave = () => {
    if (apiKey.trim() === '') {
      toast.warning("We'll need an API key to evaluate your prompts. No worries if you don't have one yet - you can get one for free from Google AI Studio!");
      return;
    }

    setApiKey(apiKey.trim());
    toast.success("Great! Your API key has been saved. You're all set to start evaluating prompts!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to AI Prompt Trainer!</DialogTitle>
          <DialogDescription>
            To get started, we'll need your Google Gemini API key for evaluating your prompts.
            You can get a free API key from the{" "}
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Google AI Studio
            </a>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">
              Your Gemini API Key
            </label>
            <Input
              id="api-key"
              type="password"
              placeholder="Paste your Gemini API key here"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              This key unlocks all the evaluation features of the app!
            </p>
          </div>
          <div className="bg-secondary/30 p-3 rounded-md">
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely in your browser and is never sent to our servers. It's only used to communicate directly between your browser and Google's Gemini API.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            I'll do this later
          </Button>
          <Button onClick={handleSave}>
            Save & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;

