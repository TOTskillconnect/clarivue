import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, Save, Edit, ArrowLeft } from 'lucide-react';
import { useScorecardContext } from '@/contexts/ScorecardContext';
import { ScorecardCategoryPanel } from '@/modules/hiring/components/ScorecardCategoryPanel';
import { useToast } from '@/hooks/use-toast';
import { type ScorecardResponse } from '@/types/interview';
import { Loader2 } from 'lucide-react';
import '@/styles/scorecard.css';

export function ScorecardPage() {
  const { scorecardId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    scorecard,
    setScorecard,
    isEditing,
    setIsEditing,
    recalculateWeights,
    saveScorecard,
  } = useScorecardContext();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
    // If we have analyzed data from JD import, use it
    const analyzedData = location.state?.analyzedData;
    if (analyzedData) {
      setScorecard({
        id: scorecardId || 'new',
        jobTitle: analyzedData.job_title,
        categories: analyzedData.categories.map((category: { name: string; weight: number; criteria: Array<{ id: string; name: string; weight: number; description: string }> }) => ({
          id: category.name.toLowerCase().replace(/\s+/g, '-'),
          name: category.name,
          weight: category.weight,
          criteria: category.criteria.map((criterion: { id: string; name: string; weight: number; description: string }) => ({
            ...criterion,
            isEnabled: true,
          })),
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return;
    }

    // If scorecardId exists, load existing scorecard
    if (scorecardId && scorecardId !== 'new') {
      // TODO: Implement API call to load existing scorecard
      console.log('Loading scorecard:', scorecardId);
    }
  }, [scorecardId, location.state, setScorecard]);

  const handleAnalyzeJD = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a job description to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/criteria/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job description');
      }

      const result: ScorecardResponse = await response.json();
      setScorecard({
        id: scorecardId || 'new',
        jobTitle: result.job_title,
        categories: result.categories.map(category => ({
          id: category.name.toLowerCase().replace(/\s+/g, '-'),
          name: category.name,
          weight: category.weight,
          criteria: category.criteria.map(criterion => ({
            ...criterion,
            isEnabled: true,
          })),
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Failed to analyze job description:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze job description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveScorecard();
      toast({
        title: 'Success',
        description: 'Scorecard saved successfully',
      });
      setIsEditing(false);
      // Navigate to the saved scorecard's page
      if (scorecardId === 'new') {
        navigate(`/dashboard/hiring/scorecard/${scorecard?.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Failed to save scorecard:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save scorecard',
        variant: 'destructive',
      });
    }
  };

  const handleExport = () => {
    if (!scorecard) return;
    const json = JSON.stringify(scorecard, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scorecard-${scorecard.jobTitle.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin scorecard-loading" />
          <p className="text-lg font-medium text-gray-600">Analyzing job description...</p>
        </div>
      </div>
    );
  }

  if (!scorecard && scorecardId === 'new' && !location.state?.analyzedData) {
    return (
      <div className="container mx-auto py-12 px-4">
        <button 
          onClick={() => navigate(-1)}
          className="scorecard-back flex items-center gap-2 mb-6 hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <Card className="scorecard-card max-w-3xl mx-auto">
          <div className="scorecard-header">
            <h2 className="text-2xl font-semibold">Create New Scorecard</h2>
            <p className="text-gray-600 mt-2">
              Paste your job description below and we'll help you create a structured scorecard.
            </p>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-sm font-medium">
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-[300px] resize-none border-gray-200 focus:border-[#7FDCD7] focus:ring-[#7FDCD7]"
              />
            </div>
            <Button 
              onClick={handleAnalyzeJD} 
              className="scorecard-button-primary w-full py-6 text-lg font-medium"
            >
              Analyze Job Description
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!scorecard) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7FDCD7]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="scorecard-card">
        <div className="scorecard-header flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full scorecard-gradient">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{scorecard.jobTitle}</h1>
              <p className="text-gray-600">Hiring Scorecard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="border-[#ACBAFF] text-[#ACBAFF] hover:bg-[#ACBAFF] hover:text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExport}
                  className="border-[#7FDCD7] text-[#7FDCD7] hover:bg-[#7FDCD7] hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={recalculateWeights}
                  className="border-[#ACBAFF] text-[#ACBAFF] hover:bg-[#ACBAFF] hover:text-white"
                >
                  Rebalance Weights
                </Button>
                <Button 
                  onClick={handleSave}
                  className="scorecard-button-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            {scorecard.categories.map((category) => (
              <div key={category.id} className="scorecard-category p-4">
                <ScorecardCategoryPanel
                  category={category}
                  isEditing={isEditing}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
} 