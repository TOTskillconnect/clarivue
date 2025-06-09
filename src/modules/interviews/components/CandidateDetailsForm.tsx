import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { type InterviewFormData } from '@/types/interview';

interface Props {
  initialData: InterviewFormData;
  onSubmit: (data: Pick<InterviewFormData, 'candidateName' | 'candidateEmail' | 'notes'>) => void;
}

export function CandidateDetailsForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    candidateName: initialData.candidateName,
    candidateEmail: initialData.candidateEmail,
    notes: initialData.notes,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.candidateName.trim() && formData.candidateEmail.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="candidateName">Candidate Name</Label>
          <Input
            id="candidateName"
            value={formData.candidateName}
            onChange={(e) => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
            placeholder="Enter candidate's full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="candidateEmail">Candidate Email</Label>
          <Input
            id="candidateEmail"
            type="email"
            value={formData.candidateEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))}
            placeholder="Enter candidate's email"
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Add any relevant notes about the candidate"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid}>
          Continue
        </Button>
      </div>
    </form>
  );
} 