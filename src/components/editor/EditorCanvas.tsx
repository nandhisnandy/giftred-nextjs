import { useState } from 'react';
import { ZoomIn, ZoomOut, Monitor, Smartphone, Eye, Maximize2, RotateCcw, RotateCw } from 'lucide-react';
import { SecondaryButton } from '@/components/ui/secondary-button';

interface EditorCanvasProps {
  greetingData: any;
  selectedElement?: string;
  onElementSelect: (elementId: string) => void;
  layerStates?: Record<string, { visible: boolean; locked: boolean }>;
}

const EditorCanvas = ({ greetingData, selectedElement, onElementSelect, layerStates }: EditorCanvasProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullPreview, setIsFullPreview] = useState(false);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
  };

  const resetZoom = () => {
    setZoomLevel(100);
  };

  const canvasWidth = deviceMode === 'mobile' ? 390 : 520;
  const canvasHeight = deviceMode === 'mobile' ? 640 : 720;

  const getTitleStyles = () => {
    const customizations = greetingData.customizations || {};
    return {
      color: customizations.titleColor || '#000000',
      textAlign: (customizations.titleAlignment || 'center') as 'left' | 'center' | 'right',
      fontSize: customizations.titleFontSize === 'small' ? '18px' :
                customizations.titleFontSize === 'large' ? '32px' :
                customizations.titleFontSize === 'xl' ? '40px' : '24px',
      fontWeight: customizations.titleBold ? 'bold' : 'normal',
      fontStyle: customizations.titleItalic ? 'italic' : 'normal'
    };
  };

  const getMessageStyles = () => {
    const customizations = greetingData.customizations || {};
    return {
      color: customizations.messageColor || '#374151',
      lineHeight: customizations.messageLineHeight === 'tight' ? '1.25' :
                  customizations.messageLineHeight === 'normal' ? '1.5' :
                  customizations.messageLineHeight === 'loose' ? '2' : '1.625',
      fontWeight: customizations.messageBold ? 'bold' : 'normal',
      fontStyle: customizations.messageItalic ? 'italic' : 'normal',
      textAlign: 'center' as const
    };
  };

  const getMediaStyles = () => {
    const customizations = greetingData.customizations || {};
    const size = customizations.mediaSize;
    
    let dimensions = { width: '100%', height: '192px' };
    if (size === 'small') dimensions = { width: '120px', height: '120px' };
    else if (size === 'large') dimensions = { width: '256px', height: '256px' };
    else if (size === 'medium') dimensions = { width: '192px', height: '192px' };

    return {
      ...dimensions,
      borderRadius: `${customizations.mediaBorderRadius || 12}px`,
      boxShadow: customizations.mediaDropShadow ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
      border: customizations.mediaBorder ? '2px solid #e5e7eb' : 'none',
      alignSelf: customizations.mediaPosition === 'top' ? 'flex-start' :
                 customizations.mediaPosition === 'bottom' ? 'flex-end' : 'center'
    };
  };

  const handleElementClick = (elementId: string) => {
    if (layerStates?.[elementId]?.locked) return;
    onElementSelect(elementId);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 border-r border-gray-200">
      {/* Canvas Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Device Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-inner">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${deviceMode === 'desktop' 
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Monitor className="h-4 w-4" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${deviceMode === 'mobile' 
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
              <button
                onClick={handleZoomOut}
                className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={resetZoom}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 min-w-[3.5rem] text-center px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            {/* Orientation Controls */}
            <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 px-2 py-2 shadow-sm">
              <button className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <SecondaryButton size="sm" onClick={() => setIsFullPreview(!isFullPreview)} className="shadow-sm">
              {isFullPreview ? <Maximize2 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="ml-2">{isFullPreview ? 'Edit Mode' : 'Full Preview'}</span>
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex justify-center items-center min-h-full">
          <div 
            className="bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-300 border border-gray-200/50"
            style={{ 
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center'
            }}
          >
            {/* Greeting Preview */}
            <div 
              className="w-full h-full relative overflow-hidden flex flex-col"
              style={{ 
                fontFamily: greetingData.customizations?.fontFamily || 'Quicksand',
                backgroundColor: greetingData.customizations?.backgroundColor || '#FFFFFF'
              }}
            >
              {/* Header Accent */}
              {layerStates?.background?.visible !== false && (
                <div 
                  className="h-3 bg-gradient-to-r flex-shrink-0"
                  style={{ 
                    backgroundImage: `linear-gradient(90deg, ${greetingData.customizations?.accentColor || '#FF4D6D'}, ${greetingData.customizations?.accentColor || '#FF4D6D'}CC)`
                  }}
                />
              )}
              
              {/* Content Area */}
              <div className="p-8 space-y-8 flex-1 flex flex-col justify-center">
                {/* Title */}
                {layerStates?.title?.visible !== false && greetingData.title && (
                  <div
                    className={`
                      group cursor-pointer transition-all duration-200 rounded-xl p-4 -m-4 relative
                      ${selectedElement === 'title' 
                        ? 'ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-lg transform scale-[1.02]' 
                        : 'hover:bg-gray-50/80 hover:shadow-md hover:transform hover:scale-[1.01]'
                      }
                      ${layerStates?.title?.locked ? 'cursor-not-allowed opacity-60' : ''}
                    `}
                    onClick={() => handleElementClick('title')}
                  >
                    {selectedElement === 'title' && (
                      <div className="absolute -top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        Title Selected
                      </div>
                    )}
                    <h1 className="text-3xl font-bold leading-tight" style={getTitleStyles()}>
                      {greetingData.title}
                    </h1>
                  </div>
                )}

                {/* Media */}
                {layerStates?.media?.visible !== false && greetingData.media && greetingData.media.length > 0 && (
                  <div
                    className={`
                      group cursor-pointer transition-all duration-200 rounded-xl relative flex justify-center
                      ${selectedElement === 'media' 
                        ? 'ring-2 ring-primary ring-offset-2 shadow-lg transform scale-[1.01]' 
                        : 'hover:ring-2 hover:ring-gray-300 hover:shadow-md hover:transform hover:scale-[1.005]'
                      }
                      ${layerStates?.media?.locked ? 'cursor-not-allowed opacity-60' : ''}
                    `}
                    onClick={() => handleElementClick('media')}
                  >
                    {selectedElement === 'media' && (
                      <div className="absolute -top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm z-10">
                        Media Selected
                      </div>
                    )}
                    <img 
                      src={greetingData.media[0].url} 
                      alt="" 
                      className="object-cover"
                      style={getMediaStyles()}
                    />
                  </div>
                )}

                {/* Empty Media Placeholder */}
                {layerStates?.media?.visible !== false && (!greetingData.media || greetingData.media.length === 0) && (
                  <div
                    className={`
                      group cursor-pointer transition-all duration-200 rounded-xl relative
                      ${selectedElement === 'media' 
                        ? 'ring-2 ring-primary ring-offset-2 shadow-lg transform scale-[1.01]' 
                        : 'hover:ring-2 hover:ring-gray-300 hover:shadow-md hover:transform hover:scale-[1.005]'
                      }
                      ${layerStates?.media?.locked ? 'cursor-not-allowed opacity-60' : ''}
                    `}
                    onClick={() => handleElementClick('media')}
                  >
                    {selectedElement === 'media' && (
                      <div className="absolute -top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm z-10">
                        Media Selected
                      </div>
                    )}
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-3">🖼️</div>
                        <p className="text-sm font-medium">Click to add media</p>
                        <p className="text-xs text-gray-400 mt-1">Images, videos, or GIFs</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message */}
                {layerStates?.message?.visible !== false && greetingData.message && (
                  <div
                    className={`
                      group cursor-pointer transition-all duration-200 rounded-xl p-4 -m-4 relative
                      ${selectedElement === 'message' 
                        ? 'ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-lg transform scale-[1.01]' 
                        : 'hover:bg-gray-50/80 hover:shadow-md hover:transform hover:scale-[1.005]'
                      }
                      ${layerStates?.message?.locked ? 'cursor-not-allowed opacity-60' : ''}
                    `}
                    onClick={() => handleElementClick('message')}
                  >
                    {selectedElement === 'message' && (
                      <div className="absolute -top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        Message Selected
                      </div>
                    )}
                    <p className="text-lg" style={getMessageStyles()}>
                      {greetingData.message}
                    </p>
                  </div>
                )}

                {/* Questions */}
                {layerStates?.questions?.visible !== false && greetingData.questions && greetingData.questions.length > 0 && (
                  <div
                    className={`
                      group cursor-pointer transition-all duration-200 rounded-xl p-4 -m-4 border-t border-gray-100 pt-6 relative
                      ${selectedElement === 'questions' 
                        ? 'ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-lg' 
                        : 'hover:bg-gray-50/80 hover:shadow-md'
                      }
                      ${layerStates?.questions?.locked ? 'cursor-not-allowed opacity-60' : ''}
                    `}
                    onClick={() => handleElementClick('questions')}
                  >
                    {selectedElement === 'questions' && (
                      <div className="absolute -top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        Questions Selected
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        💭 Interactive Question
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner">
                      <p className="text-gray-700 font-medium">{greetingData.questions[0] || "What's your favorite memory with me?"}</p>
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                {layerStates?.cta?.visible !== false && (
                  <div
                    className={`
                      group cursor-pointer transition-all duration-200 rounded-xl p-3 -m-3 relative
                      ${selectedElement === 'cta' 
                        ? 'ring-2 ring-primary ring-offset-2 shadow-lg transform scale-[1.02]' 
                        : 'hover:shadow-md hover:transform hover:scale-[1.01]'
                      }
                      ${layerStates?.cta?.locked ? 'cursor-not-allowed opacity-60' : ''}
                    `}
                    onClick={() => handleElementClick('cta')}
                  >
                    {selectedElement === 'cta' && (
                      <div className="absolute -top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        CTA Selected
                      </div>
                    )}
                    <button 
                      className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-90 hover:transform hover:scale-[1.02] shadow-lg"
                      style={{ backgroundColor: greetingData.customizations?.accentColor || '#FF4D6D' }}
                    >
                      Share Your Response
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Branding */}
              {greetingData.customizations?.showBranding && (
                <div className="px-8 py-4 bg-gradient-to-t from-gray-50 to-transparent border-t border-gray-100/50 flex-shrink-0">
                  <p className="text-xs text-gray-500 text-center font-medium">
                    Made with ❤️ using GiftRed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
