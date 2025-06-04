import React from 'react';

interface TestimonialBlockProps {
  quote: string;
  subQuote?: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  quote,
  subQuote,
  author
}) => {
  return (
    <div className="max-w-lg">
      <blockquote className="text-3xl font-medium text-text-primary mb-6">
        "{quote}"
      </blockquote>
      {subQuote && (
        <p className="text-xl text-text-secondary mb-8">
          {subQuote}
        </p>
      )}
      
      <div className="flex items-center gap-4 mb-16">
        {author.avatar ? (
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-border" />
        )}
        <div>
          <p className="font-medium text-text-primary">{author.name}</p>
          <p className="text-text-secondary">{author.title}</p>
          <p className="text-text-secondary">{author.company}</p>
        </div>
      </div>
    </div>
  );
}; 