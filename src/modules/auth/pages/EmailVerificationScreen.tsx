import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationState {
  email: string;
}

export const EmailVerificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as LocationState)?.email || '';
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isResending, setIsResending] = useState(false);

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate('/', { replace: true });
    }
  }, [email, navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    // Implement resend logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
  };

  // Add verification check
  useEffect(() => {
    const code = verificationCode.join('');
    if (code.length === 6) {
      // Simulate verification
      setTimeout(() => {
        navigate('/onboarding');
      }, 500);
    }
  }, [verificationCode, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#acbaff]/10 via-[#4b63eb]/5 to-[#acbaff]/10">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-6">
          <Button 
            onClick={() => navigate(-1)}
            variant="ghost"
            className="w-fit -ml-2 gap-2 text-muted-foreground hover:bg-[#caa1e8] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <CardTitle className="text-2xl">Verify your email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Please check your inbox for the verification code sent to{' '}
            <span className="text-foreground">{email}</span>
          </p>

          {/* Verification Code Inputs */}
          <div className="flex gap-2 justify-center relative">
            <div className="absolute -left-10 top-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#04ADA4]" />
              </div>
            </div>
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border rounded-lg text-lg font-medium focus:border-[#7FDCD7] focus:ring-1 focus:ring-[#7FDCD7] outline-none"
              />
            ))}
          </div>

          <Button
            onClick={handleResendCode}
            variant="link"
            disabled={isResending}
            className="w-full text-[#04ADA4] hover:text-[#7FDCD7] hover:no-underline"
          >
            {isResending ? 'Sending...' : 'Send a new code'}
          </Button>
        </CardContent>
      </Card>

      {/* Security Info */}
      <div className="mt-8 space-y-4 text-center">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {['SOC 2 Type II', 'GDPR', 'CCPA', 'LGPD', 'PIPEDA'].map((cert) => (
            <div key={cert} className="flex items-center gap-1">
              <span>✓</span>
              <span>{cert}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 text-xs text-[#04ADA4]">
          <span>🔒</span>
          <span>Secured by 256-bit AES and 256-bit SSL/TLS encryption</span>
        </div>
      </div>
    </div>
  );
}; 