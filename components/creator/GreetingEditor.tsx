
import { useState } from 'react';
import { ArrowLeft, Save, Eye, Share2 } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';
import { getTemplateById } from '@/data/templates';
import EditorSidebar from '@/components/editor/EditorSidebar';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditorProperties from '@/components/editor/EditorProperties';

interface GreetingEditorProps {
  templateId: string;
  onBack: () => void;
  onSave: (greeting: any) => void;
}

const GreetingEditor = ({ templateId, onBack, onSave }: GreetingEditorProps) => {
  const template = getTemplateById(templateId);
  const [selectedElement, setSelectedElement] = useState<string>('');
  const [layerStates, setLayerStates] = useState({
    background: { visible: true, locked: false },
    title: { visible: true, locked: false },
    media: { visible: true, locked: false },
    message: { visible: true, locked: false },
    questions: { visible: true, locked: false },
    cta: { visible: true, locked: false }
  });
  const [greetingData, setGreetingData] = useState({
    title: 'Happy Birthday!',
    message: 'Wishing you a wonderful day filled with happiness and love!',
    media: [],
    questions: [],
    tone: 'Casual',
    customizations: {
      accentColor: template?.accentColor || '#FF4D6D',
      fontFamily: 'Quicksand',
      backgroundColor: '#FFFFFF',
      layout: 'Standard',
      showBranding: true,
      titleColor: '#000000',
      titleAlignment: 'center',
      titleFontSize: 'medium',
      titleBold: true,
      titleItalic: false,
      messageColor: '#374151',
      messageLineHeight: 'relaxed',
      messageBold: false,
      messageItalic: false,
      mediaSize: 'medium',
      mediaBorderRadius: '12',
      mediaPosition: 'center',
      mediaDropShadow: false,
      mediaBorder: false
    }
  });

  const handleSave = () => {
    const greeting = {
      id: Date.now().toString(),
      templateId,
      ...greetingData,
      shareUrl: `giftred.com/s/${Date.now()}`,
      viewCount: 0,
      createdAt: new Date().toISOString()
    };
    onSave(greeting);
  };

  const handleMediaUpload = (file: File) => {
    // In a real app, you would upload the file to a server
    const mockUrl = URL.createObjectURL(file);
    const newMedia = [...greetingData.media, { url: mockUrl, type: file.type, name: file.name }];
    setGreetingData(prev => ({
      ...prev,
      media: newMedia
    }));
  };

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId);
  };

  const handleGreetingUpdate = (newData: any) => {
    setGreetingData(newData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="border-l border-gray-200 pl-4">
                <h1 className="text-lg font-semibold font-quicksand text-gray-900">
                  {template?.name || 'Custom Greeting'}
                </h1>
                <p className="text-xs text-gray-500">Editing your greeting</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <SecondaryButton size="sm" className="text-gray-600 border-gray-300 hover:border-gray-400">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </SecondaryButton>
              <SecondaryButton size="sm" className="text-gray-600 border-gray-300 hover:border-gray-400">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </SecondaryButton>
              <PrimaryButton size="sm" onClick={handleSave} className="shadow-sm">
                <Share2 className="h-4 w-4 mr-2" />
                Publish & Share
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Sidebar */}
        <EditorSidebar 
          greetingData={greetingData}
          onUpdate={handleGreetingUpdate}
          onMediaUpload={handleMediaUpload}
        />

        {/* Center Canvas */}
        <EditorCanvas 
          greetingData={greetingData}
          selectedElement={selectedElement}
          onElementSelect={handleElementSelect}
          layerStates={layerStates}
        />

        {/* Right Properties Panel */}
        <EditorProperties 
          selectedElement={selectedElement}
          greetingData={greetingData}
          onUpdate={handleGreetingUpdate}
        />
      </div>
    </div>
  );
};

export default GreetingEditor;
