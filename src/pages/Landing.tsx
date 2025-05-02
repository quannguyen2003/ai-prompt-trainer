
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-brand-purple">AI Prompt Trainer</h1>
              <p className="text-muted-foreground">Master the art of prompt engineering</p>
            </div>
            <Button asChild>
              <Link to="/practice" className="gap-2">
                Start Practicing <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Become a Prompt Engineering Expert
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Practice your AI prompting skills with real-time feedback. Write better prompts, get better results.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/practice" className="gap-2">
                Start Training Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose a Task</h3>
              <p className="text-gray-600">Select from a variety of prompt engineering challenges across different difficulty levels.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Write Your Prompt</h3>
              <p className="text-gray-600">Craft your prompt in the editor with helpful guidance and examples available.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Detailed Feedback</h3>
              <p className="text-gray-600">Receive AI-powered analysis on your prompt's effectiveness with scores and improvement tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Practice Prompt Engineering?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-700 rounded-full p-2 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Save Time and Resources</h3>
                  <p className="text-gray-600">Well-crafted prompts get better results with fewer iterations, saving you time and API costs.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-700 rounded-full p-2 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Improve AI Output Quality</h3>
                  <p className="text-gray-600">Learn to guide AI to produce more relevant, accurate, and useful responses.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-700 rounded-full p-2 h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Develop a Valuable Skill</h3>
                  <p className="text-gray-600">Prompt engineering is becoming an essential skill in today's AI-driven workplace.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link to="/practice" className="gap-2">
                  Start Your First Challenge <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-brand-purple">AI Prompt Trainer</h2>
              <p className="text-sm text-gray-500">Practice and improve your prompting skills</p>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} AI Prompt Trainer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
