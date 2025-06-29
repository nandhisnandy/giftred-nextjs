
import { useState } from 'react';
import { greetingTemplates, getTemplatesByCategory } from '@/data/templates';
import { OccasionType } from '@/types/greeting';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Heart, Cake, Gift, Users, Trophy, Flower, ArrowRight, Star } from 'lucide-react';

const occasionIcons = {
  birthday: Cake,
  anniversary: Heart,
  valentine: Gift,
  friendship: Users,
  congratulations: Trophy,
  sympathy: Flower,
  custom: Gift
};

const occasionColors = {
  birthday: 'bg-occasion-birthday',
  anniversary: 'bg-occasion-anniversary',
  valentine: 'bg-occasion-valentine',
  friendship: 'bg-occasion-friendship',
  congratulations: 'bg-occasion-birthday',
  sympathy: 'bg-occasion-sympathy',
  custom: 'bg-primary'
};

const occasionDescriptions = {
  birthday: 'Celebrate another year of joy',
  anniversary: 'Honor your special moments',
  valentine: 'Express your deepest love',
  friendship: 'Appreciate amazing friendships',
  congratulations: 'Celebrate achievements',
  sympathy: 'Share comfort and support',
  custom: 'Create something unique'
};

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState<OccasionType>('birthday');
  const categories = ['birthday', 'anniversary', 'valentine', 'friendship', 'congratulations', 'sympathy', 'custom'];
  
  const filteredTemplates = getTemplatesByCategory(selectedCategory);

  const handleUseTemplate = (templateId: string) => {
    console.log('Use template:', templateId);
    window.dispatchEvent(new CustomEvent('navigate-to-editor', { detail: { templateId } }));
  };

  return (
    <section id="templates" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6">
            <Star className="h-4 w-4 mr-2" />
            <span>Choose from {greetingTemplates.length}+ beautiful templates</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
            Find Your <span className="gradient-text">Perfect Template</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every occasion deserves a unique touch. Our professionally designed templates 
            capture the perfect emotion for your special moment.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = occasionIcons[category as keyof typeof occasionIcons];
            const isActive = selectedCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as OccasionType)}
                className={`
                  group flex flex-col items-center space-y-2 px-6 py-4 rounded-2xl font-medium transition-all duration-300 min-w-[120px]
                  ${isActive 
                    ? `${occasionColors[category as keyof typeof occasionColors]} text-white shadow-lg transform scale-105` 
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200 hover:border-primary/30'
                  }
                `}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary'} transition-colors`} />
                <span className="capitalize font-semibold">{category}</span>
                <span className={`text-xs ${isActive ? 'text-white/90' : 'text-gray-500'} text-center leading-tight`}>
                  {occasionDescriptions[category as keyof typeof occasionDescriptions]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <div 
              key={template.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Template Preview */}
              <div className="relative overflow-hidden">
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Color Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.accentColor }}
                  />
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-gray-700 capitalize">{selectedCategory}</span>
                  </div>
                </div>

                {/* Quick Preview Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-white transition-colors">
                    Quick Preview
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold font-quicksand text-gray-900">
                    {template.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-occasion-birthday">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.slice(0, 3).map((feature) => (
                    <span 
                      key={feature}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="text-xs text-gray-500 px-3 py-1 font-medium">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>

                <PrimaryButton 
                  className="w-full group"
                  onClick={() => handleUseTemplate(template.id)}
                >
                  Use This Template
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
