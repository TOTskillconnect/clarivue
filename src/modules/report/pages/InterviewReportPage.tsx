import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Share2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SummaryTab } from '../components/SummaryTab';
import { ScorecardTab } from '../components/ScorecardTab';
import { TranscriptTab } from '../components/TranscriptTab';
import { useReportStore } from '@/modules/report/store/reportStore';
import { Report } from '../types';

// Add CSS keyframes for animations
const styles = `
  @keyframes shine {
    from {
      background-position: 200% center;
    }
    to {
      background-position: -200% center;
    }
  }
  
  @keyframes borderGlow {
    0%, 100% {
      border-color: rgba(127, 220, 215, 0.2);
    }
    50% {
      border-color: rgba(172, 186, 255, 0.6);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .gradient-btn {
    background: linear-gradient(135deg, #7FDCD7 0%, #ACBAFF 100%);
    transition: all 0.3s ease;
  }
  
  .gradient-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .glossy-card {
    position: relative;
    overflow: hidden;
    background: white;
    border: 1px solid transparent;
    animation: borderGlow 3s ease-in-out infinite;
  }

  .glossy-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(127, 220, 215, 0.1),
      rgba(172, 186, 255, 0.1),
      transparent
    );
    animation: shimmer 3s infinite;
    transform: skewX(-15deg);
  }

  .glossy-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 20%,
      transparent 40%,
      transparent 100%
    );
    pointer-events: none;
  }

  .gradient-tab {
    position: relative;
  }

  .gradient-tab::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(135deg, #7FDCD7 0%, #ACBAFF 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .gradient-tab.active::after {
    opacity: 1;
  }
`;

type TabId = 'summary' | 'scorecard' | 'transcript';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'scorecard', label: 'Scorecard' },
  { id: 'transcript', label: 'Transcript' },
];

export const InterviewReportPage: React.FC = () => {
  const { reportId } = useParams();
  const { reports } = useReportStore();
  const [activeTab, setActiveTab] = useState<TabId>('summary');
  const [recommendation, setRecommendation] = useState<'yes' | 'maybe' | 'no' | null>(null);
  
  const report = reports.find(r => r.id === reportId) as Report;
  
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Report Not Found</h2>
          <p className="text-gray-500">The requested report could not be found.</p>
        </div>
      </div>
    );
  }

  const [strengths, setStrengths] = useState(
    report.strengths?.map((text: string, index: number) => ({
      id: `strength-${index}`,
      text
    })) || []
  );

  const [concerns, setConcerns] = useState(
    report.concerns?.map((text: string, index: number) => ({
      id: `concern-${index}`,
      text
    })) || []
  );

  const handleReorderStrengths = (items: Array<{ id: string; text: string }>) => {
    setStrengths(items);
  };

  const handleReorderConcerns = (items: Array<{ id: string; text: string }>) => {
    setConcerns(items);
  };

  const handleRemoveStrength = (id: string) => {
    setStrengths(strengths.filter((item: { id: string; text: string }) => item.id !== id));
  };

  const handleRemoveConcern = (id: string) => {
    setConcerns(concerns.filter((item: { id: string; text: string }) => item.id !== id));
  };

  const handleUpdateStrength = (id: string, text: string) => {
    setStrengths(strengths.map((item: { id: string; text: string }) => 
      item.id === id ? { ...item, text } : item
    ));
  };

  const handleUpdateConcern = (id: string, text: string) => {
    setConcerns(concerns.map((item: { id: string; text: string }) => 
      item.id === id ? { ...item, text } : item
    ));
  };

  const handleAddStrength = (text: string) => {
    setStrengths([...strengths, {
      id: `strength-${Date.now()}`,
      text
    }]);
  };

  const handleAddConcern = (text: string) => {
    setConcerns([...concerns, {
      id: `concern-${Date.now()}`,
      text
    }]);
  };

  const handleRegenerateWordCloud = () => {
    // TODO: Implement word cloud regeneration
    console.log('Regenerating word cloud...');
  };

  const handleScoreChange = (criterionId: string, newScore: number) => {
    // TODO: Implement score change
    console.log('Score changed:', criterionId, newScore);
  };

  const handleExplanationChange = (criterionId: string, newExplanation: string) => {
    // TODO: Implement explanation change
    console.log('Explanation changed:', criterionId, newExplanation);
  };

  const handleAutoScore = (criterionId: string) => {
    // TODO: Implement auto scoring
    console.log('Auto scoring criterion:', criterionId);
  };

  const handleRecommendationChange = (newRecommendation: 'yes' | 'maybe' | 'no') => {
    setRecommendation(recommendation === newRecommendation ? null : newRecommendation);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <SummaryTab
            report={report}
            strengths={strengths}
            concerns={concerns}
            onReorderStrengths={handleReorderStrengths}
            onReorderConcerns={handleReorderConcerns}
            onRemoveStrength={handleRemoveStrength}
            onRemoveConcern={handleRemoveConcern}
            onUpdateStrength={handleUpdateStrength}
            onUpdateConcern={handleUpdateConcern}
            onAddStrength={handleAddStrength}
            onAddConcern={handleAddConcern}
            onRegenerateWordCloud={handleRegenerateWordCloud}
          />
        );
      case 'scorecard':
        return (
          <ScorecardTab
            report={report}
            onScoreChange={handleScoreChange}
            onExplanationChange={handleExplanationChange}
            onAutoScore={handleAutoScore}
          />
        );
      case 'transcript':
        return (
          <TranscriptTab
            report={report}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gray-50">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/brand/clarivue_icon_gradient.png" alt="Clarivue" className="h-8 w-8" />
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{report.candidate?.name || 'Candidate'}</h1>
                  <p className="text-sm text-gray-500">{report.candidate?.role || 'Role'} Interview</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <time className="text-sm text-gray-500">
                  Mar 15, 2024
                </time>
                <div className="h-4 w-px bg-gray-200" />
                <Button variant="outline" size="sm" className="gradient-btn text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="gradient-btn text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center gap-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'relative h-12 text-sm font-medium transition-all gradient-tab',
                      'hover:text-[#04ADA4]',
                      activeTab === tab.id ? 'active text-[#04ADA4]' : 'text-gray-600'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    "border",
                    recommendation === 'yes' 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                  )}
                  onClick={() => handleRecommendationChange('yes')}
                >
                  Yes
                </button>
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    "border",
                    recommendation === 'maybe' 
                      ? "bg-amber-50 text-amber-700 border-amber-200" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                  )}
                  onClick={() => handleRecommendationChange('maybe')}
                >
                  Maybe
                </button>
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    "border",
                    recommendation === 'no' 
                      ? "bg-red-50 text-red-700 border-red-200" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                  )}
                  onClick={() => handleRecommendationChange('no')}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {renderActiveTab()}
        </main>
      </div>
    </>
  );
}; 