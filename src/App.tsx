
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TemplateSelector from './components/creator/TemplateSelector';
import GreetingEditor from './components/creator/GreetingEditor';
import GreetingViewer from './components/viewer/GreetingViewer';

const queryClient = new QueryClient();

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'templates' | 'editor' | 'viewer'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [greetingId, setGreetingId] = useState<string>('');

  useEffect(() => {
    // Listen for navigation events from buttons
    const handleNavigateToTemplates = () => {
      setCurrentView('templates');
    };

    const handleNavigateToEditor = (event: any) => {
      setSelectedTemplate(event.detail?.templateId || '');
      setCurrentView('editor');
    };

    window.addEventListener('navigate-to-templates', handleNavigateToTemplates);
    window.addEventListener('navigate-to-editor', handleNavigateToEditor);

    return () => {
      window.removeEventListener('navigate-to-templates', handleNavigateToTemplates);
      window.removeEventListener('navigate-to-editor', handleNavigateToEditor);
    };
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentView('editor');
  };

  const handleGreetingSave = (greeting: any) => {
    console.log('Greeting saved:', greeting);
    setGreetingId(greeting.id);
    setCurrentView('viewer');
  };

  const handleBackToTemplates = () => {
    setCurrentView('templates');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'templates':
        return (
          <TemplateSelector 
            onTemplateSelect={handleTemplateSelect}
            onBack={handleBackToHome}
          />
        );
      case 'editor':
        return (
          <GreetingEditor 
            templateId={selectedTemplate}
            onBack={handleBackToTemplates}
            onSave={handleGreetingSave}
          />
        );
      case 'viewer':
        return (
          <GreetingViewer 
            greetingId={greetingId}
            onBack={handleBackToHome}
          />
        );
      default:
        return <Index />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={renderCurrentView()} />
            <Route path="/s/:greetingId" element={<GreetingViewer greetingId="demo-greeting" onBack={handleBackToHome} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
