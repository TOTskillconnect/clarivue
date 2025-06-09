import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Plus, Trash } from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  description: string;
  weight: number;
}

interface ScorecardFormData {
  title: string;
  description: string;
  metrics: Metric[];
}

export function NewScorecard() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/dashboard/scorecards';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScorecardFormData>({
    title: '',
    description: '',
    metrics: [{ id: '1', name: '', description: '', weight: 1 }],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetricChange = (index: number, field: keyof Metric, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) =>
        i === index ? { ...metric, [field]: value } : metric
      ),
    }));
  };

  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        {
          id: String(prev.metrics.length + 1),
          name: '',
          description: '',
          weight: 1,
        },
      ],
    }));
  };

  const removeMetric = (index: number) => {
    if (formData.metrics.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title) {
        setError('Please enter a scorecard title');
        return;
      }

      if (formData.metrics.some(m => !m.name)) {
        setError('Please fill in all metric names');
        return;
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/scorecards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create scorecard');
      }

      const newScorecard = await response.json();
      
      // If we were redirected from interview setup, return there with the new scorecard ID
      if (returnTo.startsWith('/dashboard/interviews/schedule')) {
        navigate(`${returnTo}/${newScorecard.id}`);
      } else {
        navigate(returnTo);
      }
    } catch (error) {
      setError('Failed to create scorecard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Create New Scorecard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scorecard Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Scorecard Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter scorecard title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter scorecard description"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Metrics</h3>
              <Button
                variant="outline"
                onClick={addMetric}
                type="button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Metric
              </Button>
            </div>

            {formData.metrics.map((metric, index) => (
              <Card key={metric.id}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`metric-${index}-name`}>Metric Name *</Label>
                        <Input
                          id={`metric-${index}-name`}
                          value={metric.name}
                          onChange={(e) => handleMetricChange(index, 'name', e.target.value)}
                          placeholder="Enter metric name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`metric-${index}-description`}>Description</Label>
                        <Textarea
                          id={`metric-${index}-description`}
                          value={metric.description}
                          onChange={(e) => handleMetricChange(index, 'description', e.target.value)}
                          placeholder="Enter metric description"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`metric-${index}-weight`}>Weight</Label>
                        <Input
                          id={`metric-${index}-weight`}
                          type="number"
                          min="1"
                          max="5"
                          value={metric.weight}
                          onChange={(e) => handleMetricChange(index, 'weight', Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeMetric(index)}
                      disabled={formData.metrics.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Create Scorecard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 