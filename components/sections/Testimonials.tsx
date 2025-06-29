
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Mom & Teacher",
    content: "GiftRed transformed how I celebrate my students' birthdays. The interactive elements make each greeting so special!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=100&h=100&fit=crop&auto=format"
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    content: "Our team uses GiftRed for client appreciation. The professional templates and custom domains make us look amazing.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
  },
  {
    name: "Emily Rodriguez",
    role: "Event Planner",
    content: "The AI-generated visuals and video integration saved me hours. My clients absolutely love the personalized touch.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See why creators, families, and businesses choose GiftRed to make their messages memorable.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-occasion-birthday fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-sm text-gray-600">Greetings Sent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">15K+</div>
            <div className="text-sm text-gray-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
            <div className="text-sm text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
