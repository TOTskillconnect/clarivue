import React from 'react';

interface Logo {
  src: string;
  alt: string;
}

interface ClientLogoStripProps {
  logos: Logo[];
}

export const ClientLogoStrip: React.FC<ClientLogoStripProps> = ({ logos }) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {logos.map((logo, index) => (
        <div 
          key={index}
          className="flex items-center justify-center grayscale opacity-50 hover:opacity-100 transition-opacity"
        >
          <img src={logo.src} alt={logo.alt} className="h-8" />
        </div>
      ))}
    </div>
  );
}; 