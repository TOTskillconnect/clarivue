import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import '@/styles/app.css';

export function SetupScorecard() {
  const { criteriaId } = useParams();

  // Mock data - replace with actual data fetching
  const criteria = {
    id: criteriaId,
    jobTitle: 'Senior Marketing Specialist',
    company: 'Nova Scotia Power',
    categories: [
      {
        name: 'Context Fit',
        weight: 30,
        criteria: [
          {
            name: 'Industry Knowledge',
            weight: 40,
            description: 'Understanding of utility industry and energy sector'
          }
        ]
      },
      {
        name: 'Technical Skills',
        weight: 40,
        criteria: [
          {
            name: 'Marketing Strategy',
            weight: 35,
            description: 'Experience in developing and implementing marketing strategies'
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          asChild
          className="clarivue-nav-link"
        >
          <Link to="/dashboard/scorecards">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scorecards
          </Link>
        </Button>
      </div>

      <Card className="clarivue-card">
        <CardHeader className="clarivue-header">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-900">Setup Scorecard</h1>
            <p className="text-gray-500">Configure your interview scorecard criteria</p>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {criteria.categories.map((category) => (
              <div key={category.name} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="clarivue-button-outline-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Criterion
                  </Button>
                </div>
                <div className="grid gap-4">
                  {category.criteria.map((criterion) => (
                    <div
                      key={criterion.name}
                      className="p-4 rounded-lg bg-gradient-to-r from-[#7FDCD7]/5 to-[#ACBAFF]/5 border border-[#7FDCD7]/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{criterion.name}</h3>
                        <div className="text-sm font-medium text-gray-500">
                          Weight: {criterion.weight}%
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{criterion.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              className="clarivue-button-outline-secondary"
            >
              Save as Draft
            </Button>
            <Button
              className="clarivue-button-primary"
            >
              Finalize Scorecard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 