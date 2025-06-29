
import { useState } from 'react';
import { MessageCircle, Image, Palette, HelpCircle, Settings, Upload, Video, Music, Sparkles, Trash2, Plus } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

interface EditorSidebarProps {
  greetingData: any;
  onUpdate: (data: any) => void;
  onMediaUpload: (file: File) => void;
}

const EditorSidebar = ({ greetingData, onUpdate, onMediaUpload }: EditorSidebarProps) => {
  const [activeTab, setActiveTab] = useState('content');

  const sidebarTabs = [
    { id: 'content', label: 'Content', icon: MessageCircle, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: 'media', label: 'Media', icon: Image, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { id: 'design', label: 'Design', icon: Palette, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { id: 'questions', label: 'Questions', icon: HelpCircle, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onMediaUpload(file);
    }
  };

  const updateGreeting = (field: string, value: any) => {
    onUpdate({
      ...greetingData,
      [field]: value
    });
  };

  const updateCustomization = (field: string, value: any) => {
    onUpdate({
      ...greetingData,
      customizations: {
        ...greetingData.customizations,
        [field]: value
      }
    });
  };

  const removeMedia = (index: number) => {
    const newMedia = greetingData.media.filter((_: any, i: number) => i !== index);
    updateGreeting('media', newMedia);
  };

  const currentTab = sidebarTabs.find(tab => tab.id === activeTab);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
      {/* Enhanced Tab Navigation */}
      <div className="border-b border-gray-200 bg-gray-50/50">
        <div className="p-3">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Design Tools</h2>
          <div className="space-y-1">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-3 w-full px-3 py-2.5 text-left rounded-lg transition-all duration-200
                  ${activeTab === tab.id 
                    ? `${tab.bgColor} ${tab.borderColor} border-2 ${tab.color} shadow-sm` 
                    : 'hover:bg-gray-50 text-gray-600 border-2 border-transparent'
                  }
                `}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? tab.color : 'text-gray-500'}`} />
                <span className={`font-medium text-sm ${activeTab === tab.id ? tab.color : 'text-gray-700'}`}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className={`ml-auto w-2 h-2 rounded-full ${tab.color.replace('text-', 'bg-')}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className={`p-3 rounded-lg ${currentTab?.bgColor} ${currentTab?.borderColor} border`}>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Content Editor</h3>
                </div>
                <p className="text-xs text-blue-700">Craft your message and set the tone</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Greeting Title
                </label>
                <input
                  type="text"
                  value={greetingData.title}
                  onChange={(e) => updateGreeting('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter your greeting title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Main Message
                </label>
                <textarea
                  value={greetingData.message}
                  onChange={(e) => updateGreeting('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all shadow-sm"
                  placeholder="Write your heartfelt message..."
                />
                <div className="mt-2 text-xs text-gray-500">
                  Characters: {greetingData.message?.length || 0}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { tone: 'Casual', desc: 'Friendly & relaxed', emoji: '😊' },
                    { tone: 'Formal', desc: 'Professional', emoji: '🎩' },
                    { tone: 'Playful', desc: 'Fun & energetic', emoji: '🎉' },
                    { tone: 'Romantic', desc: 'Loving & sweet', emoji: '💝' }
                  ].map(({ tone, desc, emoji }) => (
                    <button
                      key={tone}
                      onClick={() => updateGreeting('tone', tone)}
                      className={`
                        p-3 text-left border-2 rounded-lg transition-all
                        ${greetingData.tone === tone 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{emoji}</span>
                        <div>
                          <div className="font-medium text-sm">{tone}</div>
                          <div className="text-xs text-gray-500">{desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className={`p-3 rounded-lg ${currentTab?.bgColor} ${currentTab?.borderColor} border`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Image className="h-4 w-4 text-green-600" />
                  <h3 className="font-medium text-green-900">Media Library</h3>
                </div>
                <p className="text-xs text-green-700">Add images, videos, and generate AI content</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Media
                </label>
                <div className="space-y-3">
                  <label className="group flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <Upload className="h-6 w-6 text-gray-500 group-hover:text-primary" />
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary">Upload Images</span>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                      <Video className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-600">Add Video</span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                      <Music className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-600">Add Audio</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                  AI Generation
                </label>
                <div className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <input
                    type="text"
                    placeholder="Describe an image to generate..."
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  />
                  <PrimaryButton size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Image
                  </PrimaryButton>
                </div>
              </div>

              {greetingData.media && greetingData.media.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Uploaded Media ({greetingData.media.length})
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {greetingData.media.map((item: any, index: number) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img src={item.url} alt="" className="w-full h-24 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => removeMedia(index)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div className={`p-3 rounded-lg ${currentTab?.bgColor} ${currentTab?.borderColor} border`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="h-4 w-4 text-purple-600" />
                  <h3 className="font-medium text-purple-900">Design Studio</h3>
                </div>
                <p className="text-xs text-purple-700">Customize colors, fonts, and layouts</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Accent Color
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    { color: '#FF4D6D', name: 'Rose' },
                    { color: '#845EC2', name: 'Purple' },
                    { color: '#00C9A7', name: 'Teal' },
                    { color: '#F94C66', name: 'Pink' },
                    { color: '#FFB400', name: 'Gold' },
                    { color: '#C0A9BD', name: 'Lavender' }
                  ].map(({ color, name }) => (
                    <button
                      key={color}
                      className={`
                        group relative w-full h-12 rounded-lg border-3 transition-all shadow-sm hover:shadow-md
                        ${greetingData.customizations?.accentColor === color 
                          ? 'border-gray-800 ring-2 ring-gray-300 scale-105' 
                          : 'border-gray-200 hover:border-gray-400'
                        }
                      `}
                      style={{ backgroundColor: color }}
                      onClick={() => updateCustomization('accentColor', color)}
                    >
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Font Family
                </label>
                <select 
                  value={greetingData.customizations?.fontFamily || 'Quicksand'}
                  onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                >
                  <option value="Quicksand">Quicksand (Friendly)</option>
                  <option value="Inter">Inter (Clean)</option>
                  <option value="Playfair">Playfair (Elegant)</option>
                  <option value="Montserrat">Montserrat (Modern)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Layout Style
                </label>
                <div className="space-y-3">
                  {[
                    { layout: 'Standard', desc: 'Perfect for most occasions', preview: '📄' },
                    { layout: 'Minimal', desc: 'Clean and simple design', preview: '⚪' },
                    { layout: 'Cinematic', desc: 'Full-screen immersive', preview: '🎬' }
                  ].map(({ layout, desc, preview }) => (
                    <button
                      key={layout}
                      onClick={() => updateCustomization('layout', layout)}
                      className={`
                        w-full p-4 text-left border-2 rounded-lg transition-all
                        ${greetingData.customizations?.layout === layout 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{preview}</span>
                        <div>
                          <div className="font-semibold text-sm">{layout}</div>
                          <div className="text-xs text-gray-600">{desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div className={`p-3 rounded-lg ${currentTab?.bgColor} ${currentTab?.borderColor} border`}>
                <div className="flex items-center space-x-2 mb-2">
                  <HelpCircle className="h-4 w-4 text-orange-600" />
                  <h3 className="font-medium text-orange-900">Interactive Questions</h3>
                </div>
                <p className="text-xs text-orange-700">Engage recipients with personalized questions</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                <p className="text-sm text-orange-800 mb-4">
                  Add questions for recipients to answer and create a two-way conversation.
                </p>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="What's your favorite memory with me?"
                    className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                  />
                  <PrimaryButton size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </PrimaryButton>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quick Question Templates
                </label>
                <div className="space-y-2">
                  {[
                    { q: "What's your favorite memory with me?", emoji: "🥰" },
                    { q: "If you could describe me in one word...", emoji: "💭" },
                    { q: "What are you most grateful for?", emoji: "🙏" },
                    { q: "What makes you smile?", emoji: "😊" }
                  ].map(({ q, emoji }) => (
                    <button
                      key={q}
                      className="w-full text-left p-3 text-sm border-2 border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{emoji}</span>
                        <span className="text-gray-700">{q}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className={`p-3 rounded-lg ${currentTab?.bgColor} ${currentTab?.borderColor} border`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Settings className="h-4 w-4 text-gray-600" />
                  <h3 className="font-medium text-gray-900">Greeting Settings</h3>
                </div>
                <p className="text-xs text-gray-600">Configure sharing and privacy options</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Sharing Settings
                </label>
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {[
                    { label: 'Allow comments', desc: 'Let recipients leave comments', checked: true },
                    { label: 'Show view counter', desc: 'Display how many times viewed', checked: true },
                    { label: 'Enable social sharing', desc: 'Add social media share buttons', checked: true },
                    { label: 'Public in gallery', desc: 'Feature in public greeting gallery', checked: false }
                  ].map(({ label, desc, checked }) => (
                    <label key={label} className="flex items-start space-x-3 p-2 hover:bg-white rounded-lg transition-colors">
                      <input 
                        type="checkbox" 
                        className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" 
                        defaultChecked={checked}
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{label}</span>
                        <p className="text-xs text-gray-600">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Custom Domain (Pro Feature)
                </label>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <input
                    type="text"
                    placeholder="yourname.com"
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    disabled
                  />
                  <p className="text-xs text-purple-600 mt-2">Upgrade to Pro to use custom domains</p>
                  <SecondaryButton size="sm" className="mt-3 text-purple-600 border-purple-300">
                    Upgrade to Pro
                  </SecondaryButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
