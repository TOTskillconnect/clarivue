import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type InterviewFormData } from '@/types/interview';

interface Props {
  onSubmit: (data: Pick<InterviewFormData, 'scheduledFor' | 'meetingLink'>) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function ScheduleInterview({ onSubmit, onBack, isLoading }: Props) {
  const [formData, setFormData] = useState({
    scheduledFor: '',
    meetingLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.scheduledFor && formData.meetingLink;

  // Calculate min date (today) and max date (3 months from now)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="scheduledFor">Interview Date</Label>
          <Input
            id="scheduledFor"
            type="date"
            value={formData.scheduledFor}
            onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
            min={formatDateForInput(today)}
            max={formatDateForInput(maxDate)}
            required
          />
        </div>

        <div>
          <Label htmlFor="meetingLink">Meeting Link</Label>
          <Input
            id="meetingLink"
            type="url"
            value={formData.meetingLink}
            onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
            placeholder="Enter video call link (e.g., Zoom, Google Meet)"
            required
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Scheduling...' : 'Schedule Interview'}
        </Button>
      </div>
    </form>
  );
} 