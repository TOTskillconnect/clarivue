import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock data - replace with actual data fetching
const mockConversations = [
  {
    id: '1',
    title: 'Frontend Developer Interview',
    participants: ['John Doe', 'Sarah Smith'],
    timestamp: '2024-03-20T10:00:00Z',
    sharedBy: 'Team Lead'
  },
  {
    id: '2',
    title: 'Product Manager Discussion',
    participants: ['Mike Johnson'],
    timestamp: '2024-03-19T15:30:00Z'
  }
];

export const ConversationList: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Conversations</h2>
        
        <Tabs defaultValue="my-conversations">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-conversations">My Conversations</TabsTrigger>
            <TabsTrigger value="shared">Shared with me</TabsTrigger>
            <TabsTrigger value="all">All Conversations</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Clarivue..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="my-conversations" className="mt-6">
            <div className="space-y-4">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => window.location.href = `/dashboard/conversations/${conversation.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{conversation.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {conversation.participants.join(', ')}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(conversation.timestamp)}
                    </div>
                  </div>
                  {conversation.sharedBy && (
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-accent/30 px-2 py-1 text-xs">
                        Shared by {conversation.sharedBy}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="mt-6">
            <div className="text-center text-muted-foreground py-8">
              No conversations have been shared with you yet.
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="text-center text-muted-foreground py-8">
              You don't have access to view all conversations.
              Contact your team admin to request access.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}; 