import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { StepOneWhoYouAre } from '../components/StepOneWhoYouAre';
import { StepTwoInterviewStyle } from '../components/StepTwoInterviewStyle';
import { StepThreeHelpFocus } from '../components/StepThreeHelpFocus';
import { StepFourSetup } from '../components/StepFourSetup';
import { StepFivePremium } from '../components/StepFivePremium';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export interface OnboardingData {
  role?: string;
  workStyle?: string;
  companySize?: string;
  referralSource?: string;
  interviewStyle?: string;
  helpAreas?: string[];
  calendarIntegration?: string;
  autoJoin?: boolean;
  notifyBefore?: boolean;
}

export const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneWhoYouAre
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <StepTwoInterviewStyle
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <StepThreeHelpFocus
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <StepFourSetup
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <StepFivePremium
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep}>
      <div className="max-w-2xl mx-auto">
        {currentStep > 1 && (
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-8 -ml-2 gap-2 text-muted-foreground hover:bg-[#caa1e8] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        {renderStep()}
      </div>
    </OnboardingLayout>
  );
}; 