import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { TestimonialBlock } from '../components/TestimonialBlock';
import { ClientLogoStrip } from '../components/ClientLogoStrip';
import { Sparkles } from 'lucide-react';

export const SignupScreen: React.FC = () => {
  const handleEmailSignup = (email: string) => {
    console.log('Email signup:', email);
    // Implement signup logic
  };

  const handleOAuthClick = (provider: 'google' | 'microsoft') => {
    console.log('OAuth signup:', provider);
    // Implement OAuth logic
  };

  const testimonial = {
    quote: "We're now able to deeply understand and optimize our hiring process.",
    subQuote: "Recruiters and interviewers get hours back in their week, and they can give candidates their 100% focus.",
    author: {
      name: "Alan Price",
      title: "Global Head of Talent Acquisition",
      company: "Deel"
    }
  };

  const clientLogos = [
    { src: '/logos/deel.svg', alt: 'Deel' },
    { src: '/logos/brex.svg', alt: 'Brex' },
    { src: '/logos/quora.svg', alt: 'Quora' },
    { src: '/logos/pure-storage.svg', alt: 'Pure Storage' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 via-accent/20 to-tertiary/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" 
            style={{ animationDuration: '8s' }}
          />
          <div 
            className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-tertiary/30 via-accent/20 to-primary/30 rounded-full blur-3xl transform translate-x-1/2 animate-pulse" 
            style={{ animationDuration: '10s', animationDelay: '1s' }}
          />
        </div>

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 inline-flex items-center gap-2 mb-8 shadow-sm hover:shadow-md transition-shadow">
            <img src="/clarivue_logo_transparent.png" alt="Clarivue" className="h-6 w-6" />
            <h1 className="text-text-primary font-semibold text-xl">Clarivue</h1>
          </div>

          <AuthCard 
            onEmailSignup={handleEmailSignup}
            onOAuthClick={handleOAuthClick}
          />
        </div>
      </div>

      {/* Right Section - Testimonial */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-xl">
          <TestimonialBlock {...testimonial} />
          <div className="mt-16">
            <ClientLogoStrip logos={clientLogos} />
          </div>
        </div>
      </div>
    </div>
  );
}; 