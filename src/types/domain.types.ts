export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  badge?: string;
  accent: 'purple' | 'green' | 'blue' | 'red' | 'amber' | 'cyan';
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  featured?: boolean;
  gradient?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric?: string;
  metricLabel?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  progress: number;
  dueDate: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  status: 'active' | 'away' | 'offline';
}
