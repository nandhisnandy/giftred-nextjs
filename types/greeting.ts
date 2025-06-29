
export interface GreetingTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  accentColor: string;
  features: string[];
}

export interface GreetingData {
  id: string;
  templateId: string;
  title: string;
  message: string;
  media: MediaItem[];
  questions: Question[];
  customizations: Customizations;
  shareUrl: string;
  viewCount: number;
  createdAt: string;
  responses?: Response[];
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  filename: string;
  size: number;
}

export interface Question {
  id: string;
  text: string;
  required: boolean;
}

export interface Response {
  id: string;
  questionId: string;
  answer: string;
  respondentName?: string;
  createdAt: string;
}

export interface Customizations {
  accentColor: string;
  fontFamily: string;
  backgroundColor: string;
  layout: 'standard' | 'minimal' | 'cinematic';
  showBranding: boolean;
}

export type OccasionType = 'birthday' | 'anniversary' | 'valentine' | 'friendship' | 'congratulations' | 'sympathy' | 'custom';
