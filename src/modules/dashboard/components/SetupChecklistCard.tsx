import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Monitor, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface SetupChecklistCardProps {
  user: {
    connectedCalendar: boolean;
    phoneLinked: boolean;
    calendlyIntegrated: boolean;
  };
}

export const SetupChecklistCard: React.FC<SetupChecklistCardProps> = ({
  user: initialUser
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  // Check if all required steps are completed
  const isOnboardingComplete = 
    user.connectedCalendar && 
    user.phoneLinked && 
    user.calendlyIntegrated;

  // Redirect to dashboard home when onboarding is complete
  useEffect(() => {
    if (isOnboardingComplete) {
      // Add a small delay to show completion state
      const timeout = setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isOnboardingComplete, navigate]);

  const handleSkipCalendar = () => {
    setUser(prev => ({ ...prev, connectedCalendar: true }));
  };

  const handleSkipPhone = () => {
    setUser(prev => ({ ...prev, phoneLinked: true }));
  };

  const handleSkipCalendly = () => {
    setUser(prev => ({ ...prev, calendlyIntegrated: true }));
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && countryCode) {
      setUser(prev => ({ ...prev, phoneLinked: true }));
    }
  };

  const steps = [
    {
      id: 'calendar',
      title: 'Connect your calendar',
      description: 'Connect your Google or Microsoft calendar',
      icon: Monitor,
      completed: user.connectedCalendar,
      action: (
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.location.href = '/auth/google'}
          >
            <img src="/icons/google.svg" alt="Google" className="h-4 w-4 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.location.href = '/auth/microsoft'}
          >
            <img src="/icons/microsoft.svg" alt="Microsoft" className="h-4 w-4 mr-2" />
            Continue with Microsoft
          </Button>
          <button
            className="text-xs text-muted-foreground hover:underline mt-2"
            onClick={handleSkipCalendar}
          >
            I don't use a calendar (remove this step)
          </button>
        </div>
      )
    },
    {
      id: 'phone',
      title: 'Connect your phone number',
      description: "We'll help you use Clarivue for phone-based interviews",
      icon: Phone,
      completed: user.phoneLinked,
      action: (
        <form onSubmit={handlePhoneSubmit} className="space-y-2">
          <div className="flex gap-2">
            <select
              className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+91">+91</option>
            </select>
            <Input
              type="tel"
              placeholder="(555) 555-0123"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:underline"
              onClick={handleSkipPhone}
            >
              I don't call candidates over the phone
            </button>
            <Button type="submit" size="sm" disabled={!phoneNumber}>
              Verify
            </Button>
          </div>
        </form>
      )
    },
    {
      id: 'calendly',
      title: 'Enable Calendly integration',
      description: 'Allow Clarivue to see and customize which events Clarivue joins',
      icon: Calendar,
      completed: user.calendlyIntegrated,
      action: (
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = '/integrations/calendly'}
          >
            Connect Calendly
          </Button>
          <button
            className="text-xs text-muted-foreground hover:underline"
            onClick={handleSkipCalendly}
          >
            I don't have a Calendly account
          </button>
        </div>
      )
    }
  ];

  return (
    <div className={cn(
      "bg-card rounded-lg border p-6",
      isOnboardingComplete && "bg-[#7FDCD7]/10"
    )}>
      <h3 className="font-semibold mb-4">
        {isOnboardingComplete ? 'Setup Complete!' : 'Finish setting up your account'}
      </h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "relative pl-8",
              index !== steps.length - 1 && "pb-6 border-l ml-4"
            )}
          >
            {/* Step indicator */}
            <div
              className={cn(
                "absolute left-0 p-1 rounded-full border-2",
                step.completed
                  ? "bg-[#7FDCD7] border-[#04ADA4]"
                  : "bg-background border-muted"
              )}
            >
              <step.icon className="h-4 w-4" />
            </div>

            {/* Step content */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {!step.completed && step.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 