
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
      toast.error("Please enter a valid API key");
      return;
    }

    setApiKey(apiKey.trim());
    toast.success("API key saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gemini API Key</DialogTitle>
          <DialogDescription>
            Enter your Google Gemini API key to use the prompt evaluation feature.
            You can get an API key from the{" "}
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
              API Key
            </label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Your API key is stored locally in your browser and is not sent to our servers.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
