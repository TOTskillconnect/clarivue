import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { type InterviewFormData } from '@/types/interview';

interface Props {
  isLoading?: boolean;
  onSubmit: (data: Pick<InterviewFormData, 'scheduledFor' | 'meetingLink'>) => void;
  onBack: () => void;
}

export function ScheduleInterview({ isLoading, onSubmit, onBack }: Props) {
  const [formData, setFormData] = useState<{
    scheduledFor: Date | undefined;
    meetingLink: string;
    error?: string;
  }>({
    scheduledFor: undefined,
    meetingLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.scheduledFor) {
        setFormData(prev => ({ ...prev, error: 'Please select a date' }));
        return;
      }

      // Clear any previous errors
      setFormData(prev => ({ ...prev, error: undefined }));

      // Validate meeting link if provided
      if (formData.meetingLink && !isValidUrl(formData.meetingLink)) {
        setFormData(prev => ({ ...prev, error: 'Please enter a valid meeting link' }));
        return;
      }

      onSubmit({
        scheduledFor: formData.scheduledFor.toISOString(),
        meetingLink: formData.meetingLink,
      });
    } catch (error) {
      setFormData(prev => ({ ...prev, error: 'An error occurred. Please try again.' }));
    }
  };

  const isValidUrl = (url: string) => {
    try {
      if (!url) return true; // Empty URL is valid as it's optional
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Interview Date</Label>
          <div className="border rounded-lg p-4">
            <DayPicker
              mode="single"
              selected={formData.scheduledFor}
              onSelect={(date) => setFormData(prev => ({ ...prev, scheduledFor: date || undefined, error: undefined }))}
              disabled={{ before: new Date() }}
              showOutsideDays
              className="mx-auto"
            />
          </div>
          {formData.scheduledFor && (
            <p className="text-sm text-muted-foreground">
              Selected date: {format(formData.scheduledFor, 'PPP')}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingLink">Meeting Link</Label>
          <Input
            id="meetingLink"
            value={formData.meetingLink}
            onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value, error: undefined }))}
            placeholder="Enter meeting link (optional)"
            className={formData.error && formData.meetingLink ? 'border-red-500' : ''}
          />
        </div>

        {formData.error && (
          <p className="text-sm text-red-500">{formData.error}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!formData.scheduledFor || isLoading}
        >
          {isLoading ? 'Scheduling...' : 'Schedule Interview'}
        </Button>
      </div>
    </form>
  );
} 