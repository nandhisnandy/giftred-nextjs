
import { GreetingTemplate } from '../types/greeting';

export const greetingTemplates: GreetingTemplate[] = [
  // Birthday Templates
  {
    id: 'birthday-cake-pop',
    name: 'Cake Pop Celebration',
    category: 'birthday',
    description: 'Animated cake with fireworks and confetti',
    preview: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&auto=format',
    accentColor: '#FFB400',
    features: ['Confetti Animation', 'Photo Collage', 'Music Integration']
  },
  {
    id: 'birthday-memory-wall',
    name: 'Memory Wall',
    category: 'birthday',
    description: 'Vertical photo reel with memories',
    preview: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop&auto=format',
    accentColor: '#FFB400',
    features: ['Photo Slideshow', 'Memory Timeline', 'Voice Notes']
  },
  {
    id: 'birthday-dynamic-wall',
    name: 'Dynamic Celebration',
    category: 'birthday',
    description: 'Interactive birthday wishes wall',
    preview: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop&auto=format',
    accentColor: '#FFB400',
    features: ['Interactive Elements', 'Wish Collection', 'Live Updates']
  },

  // Anniversary Templates
  {
    id: 'anniversary-story-scroll',
    name: 'Love Story Scroll',
    category: 'anniversary',
    description: 'Romantic timeline of your journey together',
    preview: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&h=200&fit=crop&auto=format',
    accentColor: '#845EC2',
    features: ['Timeline Layout', 'Romantic Animations', 'Photo Journey']
  },
  {
    id: 'anniversary-cinematic',
    name: 'Cinematic Overlay',
    category: 'anniversary',
    description: 'Movie-style video presentation',
    preview: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=200&fit=crop&auto=format',
    accentColor: '#845EC2',
    features: ['Video Background', 'Cinematic Effects', 'Music Score']
  },
  {
    id: 'anniversary-couple-collage',
    name: 'Couple Collage',
    category: 'anniversary',
    description: 'Beautiful photo mosaic of memories',
    preview: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=200&fit=crop&auto=format',
    accentColor: '#845EC2',
    features: ['Photo Mosaic', 'Heart Animations', 'Custom Messages']
  },

  // Valentine's Templates
  {
    id: 'valentine-love-letter',
    name: 'Love Letter Typewriter',
    category: 'valentine',
    description: 'Vintage typewriter effect with romantic message',
    preview: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=200&fit=crop&auto=format',
    accentColor: '#F94C66',
    features: ['Typewriter Animation', 'Vintage Design', 'Romantic Music']
  },
  {
    id: 'valentine-animated-hearts',
    name: 'Animated Hearts',
    category: 'valentine',
    description: 'Floating hearts with loving messages',
    preview: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=300&h=200&fit=crop&auto=format',
    accentColor: '#F94C66',
    features: ['Heart Animations', 'Floating Effects', 'Love Quotes']
  },
  {
    id: 'valentine-shared-playlist',
    name: 'Shared Playlist',
    category: 'valentine',
    description: 'Musical love story with playlist',
    preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop&auto=format',
    accentColor: '#F94C66',
    features: ['Music Player', 'Song Lyrics', 'Audio Messages']
  },

  // Friendship Templates
  {
    id: 'friendship-yearbook',
    name: 'Yearbook Memories',
    category: 'friendship',
    description: 'School yearbook style friendship memories',
    preview: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=300&h=200&fit=crop&auto=format',
    accentColor: '#00C9A7',
    features: ['Yearbook Layout', 'Fun Stickers', 'Memory Quotes']
  },
  {
    id: 'friendship-emoji-chat',
    name: 'Emoji Chat Style',
    category: 'friendship',
    description: 'Fun chat interface with emojis',
    preview: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop&auto=format',
    accentColor: '#00C9A7',
    features: ['Chat Interface', 'Emoji Reactions', 'GIF Support']
  },
  {
    id: 'friendship-appreciation',
    name: 'Appreciation Layout',
    category: 'friendship',
    description: 'Heartfelt appreciation message board',
    preview: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop&auto=format',
    accentColor: '#00C9A7',
    features: ['Appreciation Board', 'Friend Highlights', 'Thank You Notes']
  },

  // Congratulations Templates
  {
    id: 'congrats-trophy-burst',
    name: 'Trophy Burst',
    category: 'congratulations',
    description: 'Animated trophy with celebration effects',
    preview: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=300&h=200&fit=crop&auto=format',
    accentColor: '#FFB400',
    features: ['Trophy Animation', 'Burst Effects', 'Achievement Board']
  },
  {
    id: 'congrats-firework-text',
    name: 'Firework Text',
    category: 'congratulations',
    description: 'Text with firework background animation',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format',
    accentColor: '#FFB400',
    features: ['Firework Effects', 'Dynamic Text', 'Celebration Sounds']
  },

  // Sympathy Templates
  {
    id: 'sympathy-minimal-wall',
    name: 'Minimalist Message',
    category: 'sympathy',
    description: 'Clean, respectful message layout',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format&sat=-100',
    accentColor: '#C0A9BD',
    features: ['Minimal Design', 'Soft Colors', 'Peaceful Music']
  },
  {
    id: 'sympathy-soft-collage',
    name: 'Soft Photo Collage',
    category: 'sympathy',
    description: 'Gentle photo collection with memories',
    preview: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=200&fit=crop&auto=format&sat=-100',
    accentColor: '#C0A9BD',
    features: ['Gentle Transitions', 'Memory Photos', 'Comforting Messages']
  },

  // Custom Template
  {
    id: 'custom-blank',
    name: 'Blank Canvas',
    category: 'custom',
    description: 'Start from scratch with complete customization',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop&auto=format',
    accentColor: '#FF4D6D',
    features: ['Full Customization', 'Drag & Drop', 'All Media Types']
  }
];

export const getTemplatesByCategory = (category: string) => {
  return greetingTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return greetingTemplates.find(template => template.id === id);
};
