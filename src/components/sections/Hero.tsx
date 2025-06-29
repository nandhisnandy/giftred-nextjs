
import { useState, useEffect } from 'react';
import { Play, ArrowRight, Sparkles, Star, Heart, Users } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "memorable digital greetings",
    "emotional moments that last", 
    "interactive experiences",
    "personalized celebrations"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateGreeting = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-templates'));
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-occasion-valentine/5 overflow-hidden py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-occasion-birthday/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-occasion-valentine/15 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-occasion-friendship/10 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center bg-white shadow-lg rounded-full px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              <span>Transform your messages into moments</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold font-quicksand text-gray-900 leading-tight">
                Don't just send a{' '}
                <span className="relative">
                  <span className="gradient-text">message</span>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-occasion-valentine rounded-full"></div>
                </span>
              </h1>
              
              <div className="h-16 flex items-center">
                <h2 className="text-2xl md:text-3xl font-semibold font-quicksand text-gray-700">
                  Create{' '}
                  <span className="text-primary transition-all duration-500">
                    {texts[currentText]}
                  </span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Design stunning multimedia greetings with templates, AI-generated content, 
                and interactive elements. Perfect for birthdays, anniversaries, and every special moment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <PrimaryButton 
                size="lg" 
                glow 
                className="group text-base px-6 py-3"
                onClick={handleCreateGreeting}
              >
                <Heart className="mr-2 h-5 w-5 group-hover:animate-heart-beat" />
                Create Your First Greeting
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </PrimaryButton>
              
              <SecondaryButton size="lg" className="group text-base px-6 py-3">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </SecondaryButton>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-gray-900">50K+</span>
                  <Heart className="h-4 w-4 text-primary ml-1" />
                </div>
                <div className="text-xs text-gray-600">Greetings Created</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-gray-900">99%</span>
                  <Star className="h-4 w-4 text-occasion-birthday ml-1" />
                </div>
                <div className="text-xs text-gray-600">Happy Recipients</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-gray-900">15K+</span>
                  <Users className="h-4 w-4 text-occasion-friendship ml-1" />
                </div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Preview */}
          <div className="relative animate-slide-in-up">
            <div className="relative">
              {/* Main Preview Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="space-y-4">
                  {/* Browser Header */}
                  <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500">giftred.com/s/birthday-surprise</span>
                    </div>
                  </div>
                  
                  {/* Greeting Content */}
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <h3 className="text-2xl font-bold font-quicksand gradient-text mb-2">
                        Happy Birthday Sarah! 🎂
                      </h3>
                      <div className="absolute -top-1 -right-1">
                        <div className="w-4 h-4 bg-occasion-birthday rounded-full animate-bounce"></div>
                      </div>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-occasion-birthday/10 to-occasion-valentine/10 rounded-xl p-4 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-occasion-birthday"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=200&fit=crop&auto=format"
                        alt="Birthday celebration"
                        className="w-full h-32 object-cover rounded-lg mb-3 shadow-md"
                      />
                      <p className="text-gray-700 text-sm leading-relaxed">
                        "Another year of amazing memories together! 
                        Can't wait to celebrate many more! 🎉"
                      </p>
                      
                      {/* Interactive Element Preview */}
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">💭 What's your favorite memory with me?</p>
                        <div className="bg-gray-50 rounded-lg p-2 text-left">
                          <span className="text-xs text-gray-500">Recipient can respond here...</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors">
                        Share Response
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Features Preview */}
                    <div className="flex justify-center space-x-4 text-xs text-gray-600 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span>Interactive</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="h-3 w-3 text-primary" />
                        <span>Media Rich</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-primary" />
                        <span>Shareable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-occasion-birthday/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-occasion-valentine/20 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
