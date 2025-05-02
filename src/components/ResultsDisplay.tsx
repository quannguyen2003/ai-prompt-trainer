
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
  
  if (score >= 80) {
    scoreClass = "score-high";
  } else if (score >= 60) {
    scoreClass = "score-medium";
  }
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${scoreClass}`}>
      {score}/100
    </div>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Evaluation Results</h2>
        <Button variant="outline" onClick={onReset}>
          Try Again
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
                <h4 className="font-medium mb-2">Strengths</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.prompt_evaluation.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Areas for Improvement</h4>
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
                <h4 className="font-medium mb-2">Strengths</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.output_evaluation.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Areas for Improvement</h4>
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
              <CardTitle>Suggestions to Improve Your Prompt</CardTitle>
            </CardHeader>
            <CardContent>
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
              <CardTitle>Improved Prompt Example</CardTitle>
            </CardHeader>
            <CardContent>
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
