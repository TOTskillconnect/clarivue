import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OAuthButton } from './OAuthButton';
import { FeatureList, Feature } from './FeatureList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Check } from "lucide-react";

interface AuthCardProps {
  onEmailSignup?: (email: string) => void;
  onOAuthClick?: (provider: 'google' | 'microsoft') => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ onEmailSignup, onOAuthClick }) => {
  const navigate = useNavigate();
  const features: Feature[] = [
    { text: 'Works seamlessly alongside your existing tools', type: 'integration' },
    { text: 'Up and running in 3 minutes', type: 'speed' },
    { text: 'No credit card required', type: 'free' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    onEmailSignup?.(email);
    navigate('/signup/form', { state: { email } });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Get started for free</CardTitle>
          <CardDescription>AI note-taker for recruiters and interviewers</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <OAuthButton provider="google" onClick={() => onOAuthClick?.('google')} />
            <OAuthButton provider="microsoft" onClick={() => onOAuthClick?.('microsoft')} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">Or work email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="your@work.email"
              className="w-full"
              required
            />
            <Button 
              type="submit"
              className="w-full clarivue-button-primary"
            >
              Sign up
            </Button>
          </form>

          {/* Features List */}
          <FeatureList features={features} />

          {/* Help Link */}
          <div className="text-center">
            <span className="text-muted-foreground">Got questions? </span>
            <Link to="/contact" className="text-primary hover:text-accent font-medium">
              Talk to a Clarivue expert
            </Link>
          </div>
        </CardContent>

        <CardFooter className="justify-center">
          <div className="text-center">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:text-accent font-medium">Log in</Link>
          </div>
        </CardFooter>
      </Card>

      {/* Legal Text */}
      <div className="text-center text-xs text-muted-foreground">
        By signing up, I agree to Clarivue's{' '}
        <Link to="/terms" className="text-primary hover:text-accent underline">Terms of Service</Link>,{' '}
        <Link to="/privacy" className="text-primary hover:text-accent underline">Privacy Policy</Link>, and{' '}
        <Link to="/dpa" className="text-primary hover:text-accent underline">Data Processing Agreement</Link>.
      </div>

      {/* Security Certifications */}
      <div className="space-y-2">
        <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          {['SOC 2 Type II', 'GDPR', 'CCPA', 'LGPD', 'PIPEDA'].map((cert) => (
            <div key={cert} className="flex items-center gap-1">
              <Check className="w-3 h-3 text-status-success" />
              <span>{cert}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-1.5 text-xs text-status-success">
          <Shield className="w-3 h-3" />
          <span>Secured by 256-bit AES and 256-bit SSL/TLS encryption</span>
        </div>
      </div>
    </div>
  );
}; 