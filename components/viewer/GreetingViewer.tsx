import { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

interface GreetingViewerProps {
  greetingId: string;
  onBack?: () => void;
}

// Mock greeting data - in real app this would come from props or API
const mockGreeting = {
  id: 'demo-greeting',
  title: 'Happy Birthday Sarah! 🎂',
  message: 'Another year of amazing memories together! Can\'t wait to celebrate many more with you. You bring so much joy and laughter into our lives. Hope your special day is filled with all your favorite things!',
  media: [
    {
      type: 'image',
      url: '/api/placeholder/400/300',
      alt: 'Birthday celebration'
    }
  ],
  questions: [
    {
      id: '1',
      text: 'What\'s your favorite memory with me?',
      required: false
    }
  ],
  customizations: {
    accentColor: '#FFB400',
    fontFamily: 'Quicksand',
    backgroundColor: '#FFFFFF',
    layout: 'standard',
    showBranding: true
  },
  viewCount: 127,
  senderName: 'Alex',
  hasAudio: true
};

const GreetingViewer = ({ greetingId, onBack }: GreetingViewerProps) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    // Mark as viewed after 2 seconds
    const timer = setTimeout(() => {
      if (!hasViewed) {
        setHasViewed(true);
        // In real app, this would increment view count in database
        console.log('Greeting viewed:', greetingId);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [greetingId, hasViewed]);

  const handleResponseSubmit = () => {
    // In real app, this would save responses to database
    console.log('Responses submitted:', responses);
    alert('Thank you for your response! ❤️');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockGreeting.title,
        text: 'Check out this special greeting created for me!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCreateYourOwn = () => {
    if (onBack) {
      onBack();
    } else {
      window.dispatchEvent(new CustomEvent('navigate-to-templates'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-occasion-birthday/5">
      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 py-12">
        {/* Greeting Card */}
        <div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in-up"
          style={{ fontFamily: mockGreeting.customizations.fontFamily }}
        >
          {/* Header Accent */}
          <div 
            className="h-2"
            style={{ backgroundColor: mockGreeting.customizations.accentColor }}
          />

          {/* Audio Controls */}
          {mockGreeting.hasAudio && (
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-primary" />
                    ) : (
                      <Play className="h-5 w-5 text-primary" />
                    )}
                  </button>
                  <span className="text-sm text-gray-600">
                    {isPlaying ? 'Playing background music...' : 'Click to play background music'}
                  </span>
                </div>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-gray-600 hover:text-primary transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-8 md:p-12 text-center space-y-8">
            {/* Title with Animation */}
            <h1 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 animate-fade-in">
              {mockGreeting.title}
            </h1>

            {/* Media */}
            {mockGreeting.media.map((item, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              >
                {item.type === 'image' && (
                  <img 
                    src={item.url}
                    alt={item.alt}
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-lg"
                  />
                )}
              </div>
            ))}

            {/* Message */}
            <div 
              className="max-w-2xl mx-auto p-6 rounded-2xl animate-fade-in"
              style={{ 
                backgroundColor: `${mockGreeting.customizations.accentColor}15`,
                animationDelay: '0.6s'
              }}
            >
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                {mockGreeting.message}
              </p>
            </div>

            {/* Sender */}
            <div 
              className="animate-fade-in"
              style={{ animationDelay: '0.9s' }}
            >
              <p className="text-gray-600">
                With love from <span className="font-semibold text-gray-900">{mockGreeting.senderName}</span>
              </p>
            </div>

            {/* Interactive Questions */}
            {mockGreeting.questions.length > 0 && (
              <div 
                className="animate-fade-in"
                style={{ animationDelay: '1.2s' }}
              >
                {!showQuestions ? (
                  <PrimaryButton 
                    onClick={() => setShowQuestions(true)}
                    className="group"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                    Respond to Message
                  </PrimaryButton>
                ) : (
                  <div className="max-w-lg mx-auto bg-gray-50 rounded-2xl p-6 space-y-6">
                    <h3 className="text-xl font-semibold font-quicksand text-gray-900">
                      Share Your Thoughts
                    </h3>
                    
                    {mockGreeting.questions.map((question) => (
                      <div key={question.id} className="text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {question.text}
                        </label>
                        <textarea
                          value={responses[question.id] || ''}
                          onChange={(e) => setResponses(prev => ({
                            ...prev,
                            [question.id]: e.target.value
                          }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Type your response..."
                        />
                      </div>
                    ))}

                    <div className="flex space-x-3">
                      <PrimaryButton onClick={handleResponseSubmit} className="flex-1">
                        Send Response
                      </PrimaryButton>
                      <SecondaryButton onClick={() => setShowQuestions(false)}>
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: '1.5s' }}
            >
              <SecondaryButton onClick={handleShare} className="group">
                <Share2 className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Share This Greeting
              </SecondaryButton>
              
              <PrimaryButton onClick={handleCreateYourOwn} className="group">
                <Heart className="mr-2 h-5 w-5 group-hover:animate-heart-beat" />
                Create Your Own
              </PrimaryButton>
            </div>

            {/* View Counter */}
            <div 
              className="text-sm text-gray-500 animate-fade-in"
              style={{ animationDelay: '1.8s' }}
            >
              ❤️ Viewed {mockGreeting.viewCount} times
            </div>
          </div>

          {/* Footer */}
          {mockGreeting.customizations.showBranding && (
            <div className="px-8 py-4 bg-gray-50 text-center border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Made with ❤️ using{' '}
                <a href="/" className="text-primary hover:underline font-medium">
                  GiftRed
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Create Your Own CTA */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-quicksand text-gray-900 mb-4">
              Want to create something like this?
            </h3>
            <p className="text-gray-600 mb-6">
              GiftRed makes it easy to create beautiful, interactive greetings 
              that capture emotions and create lasting memories.
            </p>
            <PrimaryButton size="lg" glow onClick={handleCreateYourOwn}>
              Start Creating for Free
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingViewer;
