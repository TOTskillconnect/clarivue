export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member';
  seat: 'Free' | 'Pro';
  usage: {
    current: number;
    limit: number;
  };
  isCapturingEnabled: boolean;
  lastConversation?: {
    date: Date;
    title: string;
  };
  status: 'active' | 'archived';
}

export interface TeamUsage {
  totalConversations: number;
  monthlyLimit: number;
  members: {
    active: number;
    archived: number;
  };
}

export interface ProUsage {
  assigned: number;
  totalSeats: number;
}

export interface TeamStats {
  conversations: {
    pastMonth: number;
    pastWeek: number;
    yesterday: number;
    today: number;
  };
} 