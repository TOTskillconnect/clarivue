import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JDPasteOrLinkForm } from '../components/JDPasteOrLinkForm';
import { CriteriaList } from '../components/CriteriaList';
import { PreviewDialog } from '../components/PreviewDialog';
import { type Criterion, type JDInput } from '@/types/hiring';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type Step = 'input' | 'review';

export function JDImportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  const handleJDSubmit = async (input: JDInput) => {
    try {
      setIsAnalyzing(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to analyze job description');

      const data = await response.json();
      setCriteria(data.criteria);
      setStep('review');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze job description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveCriteria = async () => {
    try {
      setIsSaving(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/save-criteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria }),
      });

      if (!response.ok) throw new Error('Failed to save criteria');

      const { roleId } = await response.json();

      toast({
        title: 'Success',
        description: 'Hiring criteria saved successfully!',
      });

      // Navigate to the role details page
      navigate(`/dashboard/hiring/roles/${roleId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save criteria. Please try again.',
        variant: 'destructive',
      });
      setIsPreviewOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 'input' ? 'Import Job Description' : 'Review Criteria'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'input' ? (
            <div className="space-y-4">
              <JDPasteOrLinkForm onSubmit={handleJDSubmit} />
              {isAnalyzing && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Analyzing job description...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <CriteriaList
                criteria={criteria}
                onChange={setCriteria}
              />
              <div className="flex justify-end">
                <Button onClick={() => setIsPreviewOpen(true)}>
                  Review & Save
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <PreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        criteria={criteria}
        onConfirm={handleSaveCriteria}
        isLoading={isSaving}
      />
    </div>
  );
} 