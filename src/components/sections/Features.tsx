
import { 
  Image, 
  Video, 
  Music, 
  MessageCircle, 
  Share2, 
  Palette, 
  Sparkles, 
  Users,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Rich Customization',
    description: 'Personalize every element - colors, fonts, layouts, and animations to match your style.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Image,
    title: 'Media Upload & AI',
    description: 'Upload your photos or generate stunning visuals with AI-powered image creation.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Video,
    title: 'Video Integration',
    description: 'Add video messages, background clips, or AI-generated video content.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Music,
    title: 'Audio Enhancement',
    description: 'Include voice notes, background music, or ambient sounds for emotional impact.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    icon: MessageCircle,
    title: 'Interactive Questions',
    description: 'Add custom questions that recipients can answer, creating two-way conversations.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share via personalized links, social media, or custom domains for professional use.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Magic',
    description: 'Generate content, suggest improvements, and create stunning visuals automatically.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    icon: Users,
    title: 'Multi-Recipient',
    description: 'Send the same greeting to multiple people while keeping it personal.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Create beautiful greetings in minutes, not hours. Optimized for speed and simplicity.',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Create Magic</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to help you create unforgettable digital experiences 
            that go beyond traditional messaging.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold font-quicksand text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 to-occasion-valentine/10 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold font-quicksand text-gray-900 mb-4">
            Ready to Create Something Amazing?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their messages 
            into memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 glow-hover">
              Start Creating Now
              <Sparkles className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 rounded-full border border-primary text-primary hover:bg-primary-light transition-all duration-300">
              Explore Templates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
