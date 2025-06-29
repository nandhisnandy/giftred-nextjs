
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

const CallToAction = () => {
  const handleCreateGreeting = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-templates'));
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-occasion-valentine relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-white border border-white/30">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Join thousands of happy users</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold font-quicksand text-white leading-tight">
            Ready to Create Something{' '}
            <span className="block text-white/90">Amazing?</span>
          </h2>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transform your next message into an unforgettable experience. 
            Start creating beautiful, interactive greetings in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <PrimaryButton 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 group"
              onClick={handleCreateGreeting}
            >
              <Heart className="mr-2 h-5 w-5 group-hover:animate-heart-beat" />
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </PrimaryButton>
            
            <SecondaryButton 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
            >
              View All Templates
            </SecondaryButton>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm">Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm">Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
