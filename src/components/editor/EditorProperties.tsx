
import { useState, useEffect } from 'react';
import { Layers, History, Settings, Type, Palette, Move, Eye, EyeOff, Lock, Unlock, Trash2, Undo, Redo } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

interface HistoryItem {
  id: string;
  action: string;
  data: any;
  timestamp: number;
}

interface LayerState {
  visible: boolean;
  locked: boolean;
}

interface EditorPropertiesProps {
  selectedElement?: string;
  greetingData: any;
  onUpdate: (data: any) => void;
}

const EditorProperties = ({ selectedElement, greetingData, onUpdate }: EditorPropertiesProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      action: 'Created greeting',
      data: greetingData,
      timestamp: Date.now() - 120000
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [layerStates, setLayerStates] = useState<Record<string, LayerState>>({
    background: { visible: true, locked: false },
    title: { visible: true, locked: false },
    media: { visible: true, locked: false },
    message: { visible: true, locked: false },
    questions: { visible: true, locked: false },
    cta: { visible: true, locked: false }
  });

  const layers = [
    { id: 'background', name: 'Background', icon: '🎨' },
    { id: 'title', name: 'Title', icon: '📝' },
    { id: 'media', name: 'Media', icon: '🖼️' },
    { id: 'message', name: 'Message', icon: '💬' },
    { id: 'questions', name: 'Questions', icon: '❓' },
    { id: 'cta', name: 'Call to Action', icon: '🎯' }
  ];

  // Add to history when greeting data changes
  const addToHistory = (action: string, newData: any) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      action,
      data: { ...newData },
      timestamp: Date.now()
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newHistoryItem);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const updateGreeting = (field: string, value: any, actionName?: string) => {
    const newData = {
      ...greetingData,
      [field]: value
    };
    onUpdate(newData);
    addToHistory(actionName || `Updated ${field}`, newData);
  };

  const updateCustomization = (field: string, value: any, actionName?: string) => {
    const newData = {
      ...greetingData,
      customizations: {
        ...greetingData.customizations,
        [field]: value
      }
    };
    onUpdate(newData);
    addToHistory(actionName || `Changed ${field}`, newData);
  };

  const toggleLayerVisibility = (layerId: string) => {
    const newLayerStates = {
      ...layerStates,
      [layerId]: {
        ...layerStates[layerId],
        visible: !layerStates[layerId].visible
      }
    };
    setLayerStates(newLayerStates);

    // Apply layer visibility to greeting data
    const newData = { ...greetingData };
    if (layerId === 'title' && !newLayerStates[layerId].visible) {
      newData.title = '';
    } else if (layerId === 'message' && !newLayerStates[layerId].visible) {
      newData.message = '';
    } else if (layerId === 'media' && !newLayerStates[layerId].visible) {
      newData.media = [];
    }
    
    onUpdate(newData);
    addToHistory(`${newLayerStates[layerId].visible ? 'Showed' : 'Hidden'} ${layerId}`, newData);
  };

  const toggleLayerLock = (layerId: string) => {
    setLayerStates(prev => ({
      ...prev,
      [layerId]: {
        ...prev[layerId],
        locked: !prev[layerId].locked
      }
    }));
  };

  const deleteLayer = (layerId: string) => {
    const newData = { ...greetingData };
    
    switch (layerId) {
      case 'title':
        newData.title = '';
        break;
      case 'message':
        newData.message = '';
        break;
      case 'media':
        newData.media = [];
        break;
      case 'questions':
        newData.questions = [];
        break;
    }
    
    onUpdate(newData);
    addToHistory(`Deleted ${layerId}`, newData);
  };

  const undoAction = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onUpdate(history[newIndex].data);
    }
  };

  const redoAction = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onUpdate(history[newIndex].data);
    }
  };

  const restoreFromHistory = (index: number) => {
    setHistoryIndex(index);
    onUpdate(history[index].data);
  };

  const clearHistory = () => {
    const currentState = {
      id: Date.now().toString(),
      action: 'History cleared',
      data: greetingData,
      timestamp: Date.now()
    };
    setHistory([currentState]);
    setHistoryIndex(0);
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  const getElementProperties = () => {
    if (layerStates[selectedElement || '']?.locked) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Element Locked</h3>
          <p className="text-sm text-gray-500 mb-4">This element is locked and cannot be edited</p>
          <SecondaryButton onClick={() => toggleLayerLock(selectedElement || '')} size="sm">
            <Unlock className="h-4 w-4 mr-2" />
            Unlock Element
          </SecondaryButton>
        </div>
      );
    }

    switch (selectedElement) {
      case 'title':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Type className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Title Properties</h3>
                <p className="text-xs text-gray-600">Customize your greeting title</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Text
                </label>
                <input
                  type="text"
                  value={greetingData.title || ''}
                  onChange={(e) => updateGreeting('title', e.target.value, 'Updated title text')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => updateCustomization('titleFontSize', e.target.value, 'Changed title font size')}
                >
                  <option value="small">Small (18px)</option>
                  <option value="medium" selected>Medium (24px)</option>
                  <option value="large">Large (32px)</option>
                  <option value="xl">Extra Large (40px)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Text Alignment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => updateCustomization('titleAlignment', align, `Changed title alignment to ${align}`)}
                      className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                        greetingData.customizations?.titleAlignment === align
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-primary hover:bg-primary/5 hover:text-primary'
                      }`}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Text Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {['#000000', '#374151', '#6B7280', '#9CA3AF', '#EF4444', '#3B82F6'].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateCustomization('titleColor', color, 'Changed title color')}
                      className={`w-8 h-8 rounded-lg border-2 transition-colors shadow-sm ${
                        greetingData.customizations?.titleColor === color
                          ? 'border-gray-800 ring-2 ring-gray-300'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'media':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Palette className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Media Properties</h3>
                <p className="text-xs text-gray-600">Configure media display</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => updateCustomization('mediaSize', e.target.value, 'Changed media size')}
                >
                  <option value="small">Small (120px)</option>
                  <option value="medium" selected>Medium (192px)</option>
                  <option value="large">Large (256px)</option>
                  <option value="full">Full Width</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Border Radius
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  defaultValue="12"
                  onChange={(e) => updateCustomization('mediaBorderRadius', e.target.value, 'Changed media border radius')}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sharp</span>
                  <span>Rounded</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Position
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['top', 'center', 'bottom'].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => updateCustomization('mediaPosition', pos, `Changed media position to ${pos}`)}
                      className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                        greetingData.customizations?.mediaPosition === pos
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-primary hover:bg-primary/5 hover:text-primary'
                      }`}
                    >
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Effects
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) => updateCustomization('mediaDropShadow', e.target.checked, 'Toggled media drop shadow')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Drop Shadow</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) => updateCustomization('mediaBorder', e.target.checked, 'Toggled media border')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Border</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'message':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Type className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Message Properties</h3>
                <p className="text-xs text-gray-600">Style your main message</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Text
                </label>
                <textarea
                  value={greetingData.message || ''}
                  onChange={(e) => updateGreeting('message', e.target.value, 'Updated message text')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Write your heartfelt message..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Text Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['#000000', '#374151', '#6B7280', '#9CA3AF'].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateCustomization('messageColor', color, 'Changed message color')}
                      className={`w-full h-8 rounded-lg border-2 transition-colors ${
                        greetingData.customizations?.messageColor === color
                          ? 'border-gray-800 ring-2 ring-gray-300'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Height
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => updateCustomization('messageLineHeight', e.target.value, 'Changed message line height')}
                >
                  <option value="tight">Tight (1.25)</option>
                  <option value="normal">Normal (1.5)</option>
                  <option value="relaxed" selected>Relaxed (1.625)</option>
                  <option value="loose">Loose (2)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Text Style
                </label>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => updateCustomization('messageBold', !greetingData.customizations?.messageBold, 'Toggled message bold')}
                    className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                      greetingData.customizations?.messageBold
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    Bold
                  </button>
                  <button 
                    onClick={() => updateCustomization('messageItalic', !greetingData.customizations?.messageItalic, 'Toggled message italic')}
                    className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                      greetingData.customizations?.messageItalic
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    Italic
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Element</h3>
            <p className="text-sm text-gray-500 mb-4">Click on any element in the canvas to edit its properties</p>
            <div className="text-xs text-gray-400">
              Available: Title, Media, Message, Questions, CTA
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-sm">
      <Tabs defaultValue="properties" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-3 bg-gray-100">
          <TabsTrigger value="properties" className="text-xs font-medium">
            <Settings className="h-3.5 w-3.5 mr-1.5" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="layers" className="text-xs font-medium">
            <Layers className="h-3.5 w-3.5 mr-1.5" />
            Layers
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs font-medium">
            <History className="h-3.5 w-3.5 mr-1.5" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="flex-1 p-4 mt-0 overflow-y-auto">
          {getElementProperties()}
        </TabsContent>

        <TabsContent value="layers" className="flex-1 p-4 mt-0 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Layers</h3>
              <div className="text-xs text-gray-500">
                {layers.filter(layer => layerStates[layer.id]?.visible).length} visible
              </div>
            </div>
            
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`
                  group flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer
                  ${selectedElement === layer.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                  ${layerStates[layer.id]?.locked ? 'opacity-60' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Move className="h-4 w-4 text-gray-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-lg">{layer.icon}</div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                    <div className="text-xs text-gray-500">
                      {layerStates[layer.id]?.visible ? 'Visible' : 'Hidden'} • 
                      {layerStates[layer.id]?.locked ? ' Locked' : ' Unlocked'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLayerVisibility(layer.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title={layerStates[layer.id]?.visible ? 'Hide layer' : 'Show layer'}
                  >
                    {layerStates[layer.id]?.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLayerLock(layer.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title={layerStates[layer.id]?.locked ? 'Unlock layer' : 'Lock layer'}
                  >
                    {layerStates[layer.id]?.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLayer(layer.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete layer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 p-4 mt-0 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">History</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={undoAction}
                  disabled={historyIndex <= 0}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button
                  onClick={redoAction}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <Redo className="h-4 w-4" />
                </button>
                <SecondaryButton size="sm" className="text-xs" onClick={clearHistory}>
                  Clear All
                </SecondaryButton>
              </div>
            </div>
            
            {history.map((item, index) => (
              <div
                key={item.id}
                className={`
                  group p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${historyIndex === index 
                    ? 'border-primary bg-primary/5 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
                onClick={() => restoreFromHistory(index)}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">
                    {item.action.includes('title') ? '📝' :
                     item.action.includes('message') ? '💬' :
                     item.action.includes('media') ? '🖼️' :
                     item.action.includes('color') ? '🎨' :
                     item.action.includes('Created') ? '✨' : '⚡'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTime(item.timestamp)}</p>
                  </div>
                  {historyIndex === index && (
                    <div className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                      Current
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorProperties;
