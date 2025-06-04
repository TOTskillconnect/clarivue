import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type JDInput } from '@/types/hiring';

interface Props {
  onSubmit: (input: JDInput) => Promise<void>;
  isLoading?: boolean;
}

export function JDPasteOrLinkForm({ onSubmit, isLoading = false }: Props) {
  const [tab, setTab] = useState<'paste' | 'link'>('paste');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'paste' && !text.trim()) return;
    if (tab === 'link' && !url.trim()) return;

    onSubmit({
      text: tab === 'paste' ? text : '',
      url: tab === 'link' ? url : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={tab} onValueChange={(value) => setTab(value as 'paste' | 'link')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paste">Paste JD</TabsTrigger>
          <TabsTrigger value="link">Add Link</TabsTrigger>
        </TabsList>
        <TabsContent value="paste" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jd-text">Job Description</Label>
            <Textarea
              id="jd-text"
              placeholder="Paste the job description here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px]"
              required={tab === 'paste'}
            />
          </div>
        </TabsContent>
        <TabsContent value="link" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jd-url">Job Posting URL</Label>
            <Input
              id="jd-url"
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required={tab === 'link'}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze JD'}
        </Button>
      </div>
    </form>
  );
} 