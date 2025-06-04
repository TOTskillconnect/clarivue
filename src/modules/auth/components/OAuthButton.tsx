import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OAuthButtonProps {
  provider: 'google' | 'microsoft';
  onClick?: () => void;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, onClick }) => {
  const providerData = {
    google: {
      icon: '/google-icon.svg',
      text: 'Continue with Google'
    },
    microsoft: {
      icon: '/microsoft-icon.svg',
      text: 'Continue with Microsoft'
    }
  };

  const { icon, text } = providerData[provider];

  return (
    <Button 
      onClick={onClick}
      variant="outline"
      className="w-full justify-between hover:bg-surface"
    >
      <div className="flex items-center">
        <img src={icon} alt={provider} className="w-5 h-5 mr-3" />
        <span>{text}</span>
      </div>
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}; 