import React from 'react';
import { Link } from 'react-router-dom';

export const OnboardingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-accent/20 to-tertiary/30 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent" />
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block mb-8">
          <h1 className="text-text-primary font-semibold text-xl">Clarivue</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Get started for free</h2>
          <p className="text-text-secondary mb-8">AI note-taker for recruiters and interviewers</p>

          {/* OAuth Buttons */}
          <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-between px-6 py-3 border border-border rounded-lg hover:bg-surface transition-colors">
              <div className="flex items-center">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" />
                <span className="text-text-primary">Continue with Google</span>
              </div>
              <span className="text-text-secondary">→</span>
            </button>

            <button className="w-full flex items-center justify-between px-6 py-3 border border-border rounded-lg hover:bg-surface transition-colors">
              <div className="flex items-center">
                <img src="/microsoft-icon.svg" alt="Microsoft" className="w-5 h-5 mr-3" />
                <span className="text-text-primary">Continue with Microsoft</span>
              </div>
              <span className="text-text-secondary">→</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-text-secondary text-sm">Or work email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="your@work.email"
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary"
            />
            <button className="w-full bg-primary hover:bg-accent text-white font-medium py-3 rounded-lg transition-colors">
              Sign up
            </button>
          </div>

          {/* Features List */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-status-success/20 flex items-center justify-center">
                <span className="text-status-success text-sm">✓</span>
              </div>
              <span>Works seamlessly alongside your existing tools</span>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-status-success/20 flex items-center justify-center">
                <span className="text-status-success text-sm">✓</span>
              </div>
              <span>Up and running in 3 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-status-success/20 flex items-center justify-center">
                <span className="text-status-success text-sm">✓</span>
              </div>
              <span>No credit card required</span>
            </div>
          </div>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <span className="text-text-secondary">Got questions? </span>
            <Link to="/contact" className="text-primary hover:text-accent">Talk to a Clarivue expert</Link>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center text-sm text-text-secondary">
            <p>
              By signing up, I agree to Clarivue's{' '}
              <Link to="/terms" className="text-primary hover:text-accent">Terms of Service</Link>,{' '}
              <Link to="/privacy" className="text-primary hover:text-accent">Privacy Policy</Link>, and{' '}
              <Link to="/dpa" className="text-primary hover:text-accent">Data Processing Agreement</Link>.
            </p>
          </div>

          {/* Compliance Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-text-secondary text-sm">
            <span>SOC 2 Type II</span>
            <span>GDPR</span>
            <span>CCPA</span>
            <span>LGPD</span>
            <span>PIPEDA</span>
          </div>

          {/* Security Note */}
          <div className="mt-4 flex justify-center items-center gap-2 text-status-success text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span>Secured by 256-bit AES and 256-bit SSL/TLS encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 