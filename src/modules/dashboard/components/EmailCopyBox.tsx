import React, { useState } from 'react';
import { Copy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const EmailCopyBox: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const clarivueEmail = 'notes@clarivue.ai';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(clarivueEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">Invite Clarivue to capture conversations</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add this email to your video call invites so Clarivue can join automatically.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-md p-3">
          <span className="text-sm font-medium">{clarivueEmail}</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-10 w-10",
            copied && "bg-[#7FDCD7] text-white border-[#7FDCD7]"
          )}
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 