import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export const JoinMeetingBox: React.FC = () => {
  const [meetingUrl, setMeetingUrl] = useState('');

  const handleJoin = () => {
    if (!meetingUrl) return;
    
    // Add validation for supported meeting URLs (Google Meet, Zoom, Teams)
    const isValidUrl = /^(https?:\/\/)?(meet\.google\.com|zoom\.us|teams\.microsoft\.com)/i.test(meetingUrl);
    
    if (!isValidUrl) {
      alert('Please enter a valid Google Meet, Zoom, or Microsoft Teams URL');
      return;
    }

    // Handle joining the meeting
    window.open(meetingUrl, '_blank');
  };

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <h3 className="font-semibold">Join an ongoing call</h3>
      
      <div className="flex gap-2">
        <Input
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          placeholder="Paste link to a meeting in progress..."
          className="flex-1"
        />
        <Button
          onClick={handleJoin}
          disabled={!meetingUrl}
          className="bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Supports Google Meet, Zoom, and Microsoft Teams links
      </p>
    </div>
  );
}; 