import { type Metric } from '@/types/interview';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface Props {
  metrics: Metric[];
  onChange: (metrics: Metric[]) => void;
}

export function MetricsList({ metrics, onChange }: Props) {
  const handleMetricChange = (index: number, field: keyof Metric, value: string | number) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index] = {
      ...updatedMetrics[index],
      [field]: value,
    };
    onChange(updatedMetrics);
  };

  const handleRemoveMetric = (index: number) => {
    onChange(metrics.filter((_, i) => i !== index));
  };

  const handleAddMetric = () => {
    onChange([
      ...metrics,
      {
        id: String(metrics.length + 1),
        name: '',
        description: '',
        weight: 1,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={metric.name}
                    onChange={(e) => handleMetricChange(index, 'name', e.target.value)}
                    placeholder="Enter metric name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={metric.description}
                    onChange={(e) => handleMetricChange(index, 'description', e.target.value)}
                    placeholder="Enter metric description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight</label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={metric.weight}
                    onChange={(e) => handleMetricChange(index, 'weight', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMetric(index)}
                disabled={metrics.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={handleAddMetric}
      >
        Add Metric
      </Button>
    </div>
  );
} 