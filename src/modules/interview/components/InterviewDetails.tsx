import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { type InterviewFormData } from '@/types/interview';

interface Props {
  formData: InterviewFormData;
  onChange: (data: InterviewFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InterviewDetails({
  formData,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
            <Label htmlFor="candidateName">Candidate Name</Label>
            <Input
              id="candidateName"
              value={formData.candidateName}
              onChange={(e) =>
                onChange({ ...formData, candidateName: e.target.value })
              }
              placeholder="Enter candidate's full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidateEmail">Candidate Email</Label>
            <Input
              id="candidateEmail"
              type="email"
              value={formData.candidateEmail}
              onChange={(e) =>
                onChange({ ...formData, candidateEmail: e.target.value })
              }
              placeholder="Enter candidate's email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                onChange({ ...formData, notes: e.target.value })
              }
              placeholder="Add any notes about the candidate or interview"
              className="h-32"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Next: Schedule Interview
        </Button>
      </div>
    </form>
  );
} 