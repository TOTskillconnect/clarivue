import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TestimonialBlock } from '../components/TestimonialBlock';
import { ClientLogoStrip } from '../components/ClientLogoStrip';
import { ArrowLeft } from 'lucide-react';

interface LocationState {
  email: string;
}

export const SignupFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as LocationState)?.email || '';

  // Redirect if no email
  React.useEffect(() => {
    if (!email) {
      navigate('/', { replace: true });
    }
  }, [email, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
    // Navigate to verification page with email
    navigate('/signup/verify', { state: { email } });
  };

  const testimonial = {
    quote: "We're now able to deeply understand and optimize our hiring process.",
    subQuote: "Recruiters and interviewers get hours back in their week, and they can give candidates their 100% focus.",
    author: {
      name: "Sarah Chen",
      title: "Head of Technical Recruiting",
      company: "Brex",
      avatar: "/avatars/sarah-chen.jpg"
    }
  };

  const clientLogos = [
    [
      { src: '/logos/deel.svg', alt: 'Deel' },
      { src: '/logos/brex.svg', alt: 'Brex' },
      { src: '/logos/quora.svg', alt: 'Quora' },
      { src: '/logos/pure-storage.svg', alt: 'Pure Storage' }
    ],
    [
      { src: '/logos/angellist.svg', alt: 'AngelList' },
      { src: '/logos/hellofresh.svg', alt: 'HelloFresh' },
      { src: '/logos/octopus.svg', alt: 'Octopus' },
      { src: '/logos/pleo.svg', alt: 'Pleo' }
    ],
    [
      { src: '/logos/hawkeye.svg', alt: 'Hawkeye' },
      { src: '/logos/on.svg', alt: 'On' },
      { src: '/logos/improbable.svg', alt: 'Improbable' },
      { src: '/logos/deliveroo.svg', alt: 'Deliveroo' }
    ]
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#acbaff]/10 via-[#4b63eb]/5 to-[#acbaff]/10">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Get started for free</CardTitle>
              <CardDescription>Ultimate AI assistant for recruiters and interviewers</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Work email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    disabled
                    className="bg-muted/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    First name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Last name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="pt-2 space-y-4">
                  <Button 
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="w-full gap-2 hover:bg-[#caa1e8] hover:text-white hover:border-[#caa1e8] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>

                  <Button 
                    type="submit"
                    className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
                  >
                    Create account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Terms and Security */}
          <div className="space-y-4">
            <p className="text-center text-xs text-muted-foreground">
              By signing up, I agree to Clarivue's{' '}
              <a href="/terms" className="text-primary hover:text-accent underline">Terms of Service</a>,{' '}
              <a href="/privacy" className="text-primary hover:text-accent underline">Privacy Policy</a>, and{' '}
              <a href="/dpa" className="text-primary hover:text-accent underline">Data Processing Agreement</a>.
            </p>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {['SOC 2 Type II', 'GDPR', 'CCPA', 'LGPD', 'PIPEDA'].map((cert) => (
                <div key={cert} className="flex items-center gap-1">
                  <span>✓</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 text-xs text-[#4ADE80]">
              <span>🔒</span>
              <span>Secured by 256-bit AES and 256-bit SSL/TLS encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Testimonial */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-16 bg-white">
        <div className="max-w-xl">
          <TestimonialBlock {...testimonial} />
          <div className="mt-16 space-y-12">
            {clientLogos.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-12 opacity-80">
                {row.map((logo) => (
                  <div key={logo.alt} className="flex items-center justify-center">
                    <img src={logo.src} alt={logo.alt} className="max-h-8 w-auto" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 