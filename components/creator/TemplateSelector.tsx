import { useState } from 'react';
import { greetingTemplates, getTemplatesByCategory } from '@/data/templates';
import { OccasionType } from '@/types/greeting';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SecondaryButton } from '@/components/ui/secondary-button';
import { ArrowLeft, ArrowRight, Clock, Star, Search, Filter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  onBack?: () => void;
}

const TemplateSelector = ({ onTemplateSelect, onBack }: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<OccasionType>('birthday');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['birthday', 'anniversary', 'valentine', 'friendship', 'congratulations', 'sympathy', 'custom'];
  
  const filteredTemplates = getTemplatesByCategory(selectedCategory).filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <div>
                  <h1 className="text-3xl font-bold font-quicksand text-gray-900">
                    Choose Your <span className="gradient-text">Template</span>
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Select the perfect starting point for your greeting
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                {filteredTemplates.length} templates available
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Filter by occasion:</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as OccasionType)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize
                  ${selectedCategory === category
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredTemplates.map((template, index) => (
              <div 
                key={template.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-primary/20"
                onClick={() => onTemplateSelect(template.id)}
              >
                {/* Preview Image */}
                <div className="relative">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedCategory}
                    </span>
                  </div>
                  
                  {/* Color Indicator */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: template.accentColor }}
                    />
                  </div>

                  {/* Hover Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <ArrowRight className="h-5 w-5 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold font-quicksand text-gray-900 text-sm">
                      {template.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-occasion-birthday">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-medium">4.9</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.features.slice(0, 2).map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>5 min setup</span>
                    </div>
                    <span>{Math.floor(Math.random() * 1000) + 100} uses</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No templates found for "{searchTerm}" in {selectedCategory}</div>
              <SecondaryButton onClick={() => setSearchTerm('')}>
                Clear Search
              </SecondaryButton>
            </div>
          )}

          {/* Quick Start Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold font-quicksand text-gray-900 mb-4 text-center">
                Not sure which template?
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Get personalized template recommendations based on your occasion and preferences.
              </p>
              <PrimaryButton 
                onClick={() => onTemplateSelect('smart-recommend')}
                className="w-full"
              >
                Get Smart Recommendation
              </PrimaryButton>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold font-quicksand text-gray-900 mb-4 text-center">
                Start from scratch
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Begin with a blank canvas and create something completely unique with full creative control.
              </p>
              <SecondaryButton 
                onClick={() => onTemplateSelect('custom-blank')}
                className="w-full"
              >
                Start with Blank Canvas
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TemplateSelector;
