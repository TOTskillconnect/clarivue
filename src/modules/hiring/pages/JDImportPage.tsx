import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JDPasteOrLinkForm } from '@/modules/scorecards/components/JDPasteOrLinkForm';
import { MetricsList } from '@/modules/scorecards/components/MetricsList';
import { type Metric } from '@/types/interview';
import { type JDInput } from '@/types/hiring';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function JDImportPage() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { toast } = useToast();

  const handleJDSubmit = async (input: JDInput) => {
    try {
      setIsAnalyzing(true);
      const response = await fetch('/api/criteria/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job description');
      }

      const data = await response.json();
      
      // Navigate to the scorecard page with the analyzed data
      navigate('/dashboard/hiring/scorecard/new', {
        state: { analyzedData: data }
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze job description. Please try again.',
        variant: 'destructive',
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <JDPasteOrLinkForm
              onSubmit={handleJDSubmit}
              isLoading={isAnalyzing}
            />
            {isAnalyzing && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Analyzing job description...</span>
              </div>
            )}
            {!isAnalyzing && metrics.length > 0 && (
              <div className="space-y-4">
                <MetricsList
                  metrics={metrics}
                  onChange={setMetrics}
                />
                <div className="flex justify-end">
                  <Button onClick={() => console.log('Save metrics:', metrics)}>
                    Save Metrics
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 