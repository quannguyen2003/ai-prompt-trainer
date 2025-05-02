
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EvaluationResult } from '@/types';

interface ResultsDisplayProps {
  result: EvaluationResult;
  onReset: () => void;
}

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  let scoreClass = "score-low";
  let message = "";
  
  if (score >= 80) {
    scoreClass = "score-high";
    message = "Excellent!";
  } else if (score >= 60) {
    scoreClass = "score-medium";
    message = "Good job!";
  } else {
    message = "Room to grow!";
  }
  
  return (
    <div className="flex flex-col items-end">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${scoreClass}`}>
        {score}/100
      </div>
      <span className="text-xs mt-1">{message}</span>
    </div>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  // Calculate average score for encouraging message
  const averageScore = Math.round((result.prompt_score + result.output_score) / 2);
  let encouragementMessage = "";
  
  if (averageScore >= 80) {
    encouragementMessage = "Outstanding work! Your prompting skills are impressive!";
  } else if (averageScore >= 60) {
    encouragementMessage = "Great progress! You're well on your way to becoming a prompt expert!";
  } else {
    encouragementMessage = "Every attempt is a learning opportunity! Let's see how we can improve together.";
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Evaluation Results</h2>
          <p className="text-sm text-muted-foreground mt-1">{encouragementMessage}</p>
        </div>
        <Button variant="outline" onClick={onReset}>
          Try Another Approach
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Prompt Quality</CardTitle>
              <ScoreBadge score={result.prompt_score} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Your Strengths</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.prompt_evaluation.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Growth Opportunities</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.prompt_evaluation.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm">{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Output Quality</CardTitle>
              <ScoreBadge score={result.output_score} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Output Strengths</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.output_evaluation.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Refinement Areas</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.output_evaluation.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm">{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="output">
        <TabsList>
          <TabsTrigger value="output">Simulated Output</TabsTrigger>
          <TabsTrigger value="suggestions">Improvement Suggestions</TabsTrigger>
          <TabsTrigger value="improved">Improved Prompt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="output">
          <Card>
            <CardHeader>
              <CardTitle>Simulated Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary p-4 rounded-md whitespace-pre-wrap font-fira text-sm">
                {result.simulated_output}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Suggestions to Elevate Your Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Here are some friendly suggestions to help make your prompt even more effective:</p>
              <ul className="list-disc pl-5 space-y-2">
                {result.improvement_suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="improved">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Prompt Example</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Here's an example of how your prompt could be enhanced:</p>
              <div className="bg-secondary p-4 rounded-md whitespace-pre-wrap font-fira text-sm">
                {result.improved_prompt_example}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;

