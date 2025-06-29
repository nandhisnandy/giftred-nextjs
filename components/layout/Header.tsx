
import { useState, useEffect } from 'react';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCreateGreeting = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-templates'));
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm'
      }
    `}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary group-hover:animate-heart-beat transition-all" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-occasion-birthday rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold font-quicksand gradient-text">
                GiftRed
              </span>
              <div className="text-xs text-gray-500 -mt-1">Create moments</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('templates')}
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Templates
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Pricing
            </button>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                Resources
                <ChevronDown className="h-4 w-4 ml-1 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                    Help Center
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                    Blog
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                    Community
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <SecondaryButton size="sm">Sign In</SecondaryButton>
            <PrimaryButton size="sm" glow onClick={handleCreateGreeting}>
              Create Greeting
            </PrimaryButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
            <nav className="py-4 px-6 space-y-4">
              <button 
                onClick={() => scrollToSection('templates')}
                className="block w-full text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
              >
                Templates
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
              >
                Pricing
              </button>
              <a href="#" className="block text-gray-700 hover:text-primary transition-colors font-medium py-2">
                Help Center
              </a>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                <SecondaryButton size="sm">Sign In</SecondaryButton>
                <PrimaryButton size="sm" glow onClick={handleCreateGreeting}>
                  Create Greeting
                </PrimaryButton>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
