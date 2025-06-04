import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronLeft, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { type InterviewFormData } from '@/types/interview';

interface Props {
  formData: InterviewFormData;
  onChange: (data: InterviewFormData) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function ScheduleInterview({
  formData,
  onChange,
  onSubmit,
  onBack,
  isLoading,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleDateSelect = (date: Date | undefined) => {
    onChange({
      ...formData,
      scheduledFor: date || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Interview Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !formData.scheduledFor && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.scheduledFor ? (
                    format(formData.scheduledFor, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.scheduledFor || undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingLink">Meeting Link</Label>
            <Input
              id="meetingLink"
              type="url"
              value={formData.meetingLink}
              onChange={(e) =>
                onChange({ ...formData, meetingLink: e.target.value })
              }
              placeholder="Enter video call link (e.g., Zoom, Google Meet)"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!formData.scheduledFor || !formData.meetingLink || isLoading}
        >
          {isLoading ? 'Scheduling...' : 'Schedule Interview'}
        </Button>
      </div>
    </form>
  );
} 