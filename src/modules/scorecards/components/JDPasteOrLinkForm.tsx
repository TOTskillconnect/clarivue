import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { type JDInput } from '@/types/hiring';

interface Props {
  onSubmit: (input: JDInput) => void;
  isLoading?: boolean;
}

export function JDPasteOrLinkForm({ onSubmit, isLoading }: Props) {
  const [activeTab, setActiveTab] = useState<'paste' | 'link'>('paste');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: activeTab,
      text: activeTab === 'paste' ? text : link,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'paste' | 'link')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="paste">Paste Job Description</TabsTrigger>
              <TabsTrigger value="link">Link to Job Post</TabsTrigger>
            </TabsList>
            <TabsContent value="paste" className="space-y-4">
              <Textarea
                placeholder="Paste the job description here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
            </TabsContent>
            <TabsContent value="link" className="space-y-4">
              <Input
                type="url"
                placeholder="Enter job posting URL"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (!text && !link)}
            >
              {isLoading ? 'Analyzing...' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
} 