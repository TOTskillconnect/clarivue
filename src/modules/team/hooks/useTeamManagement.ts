import { useState, useCallback } from 'react';
import { TeamMember, TeamUsage, ProUsage } from '../types';

export const useTeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Tobi Towoju',
      email: 'tobi@getmatchbox.org',
      role: 'Admin',
      seat: 'Free',
      usage: {
        current: 0,
        limit: 25
      },
      isCapturingEnabled: true,
      status: 'active'
    }
  ]);

  const [showArchived, setShowArchived] = useState(false);
  const [teamUsage, setTeamUsage] = useState<TeamUsage>({
    totalConversations: 0,
    monthlyLimit: 60,
    members: {
      active: 1,
      archived: 0
    }
  });

  const [proUsage, setProUsage] = useState<ProUsage>({
    assigned: 0,
    totalSeats: 0
  });

  const activeMembers = members.filter(m => m.status === 'active');
  const archivedMembers = members.filter(m => m.status === 'archived');

  const updateMember = useCallback((memberId: string, updates: Partial<TeamMember>) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, ...updates } : member
    ));
  }, []);

  const archiveMember = useCallback((memberId: string) => {
    updateMember(memberId, { status: 'archived' });
  }, [updateMember]);

  const unarchiveMember = useCallback((memberId: string) => {
    updateMember(memberId, { status: 'active' });
  }, [updateMember]);

  const inviteMember = useCallback((email: string, role: 'Admin' | 'Member' = 'Member') => {
    // In a real app, this would make an API call
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      seat: 'Free',
      usage: {
        current: 0,
        limit: 25
      },
      isCapturingEnabled: true,
      status: 'active'
    };
    setMembers(prev => [...prev, newMember]);
  }, []);

  const openInviteDialog = useCallback(() => {
    // This would be implemented with a modal dialog
    console.log('Open invite dialog');
  }, []);

  const openBuySeatsDialog = useCallback(() => {
    // This would be implemented with a modal dialog
    console.log('Open buy seats dialog');
  }, []);

  return {
    members,
    activeMembers,
    archivedMembers,
    showArchived,
    setShowArchived,
    teamUsage,
    proUsage,
    updateMember,
    archiveMember,
    unarchiveMember,
    inviteMember,
    openInviteDialog,
    openBuySeatsDialog
  };
}; 