import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from '../components/SidebarNav';
import { FooterUsageBanner } from '../components/FooterUsageBanner';

export function DashboardLayout() {
  // Mock user state - replace with actual state management
  const user = {
    onboardingComplete: false,
    minutesRemaining: 25,
    name: 'Tobi Towoju',
    email: 'tobi@getmatchbox.org',
    avatar: '/avatars/default.png'
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <SidebarNav user={user} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer Banner */}
        {user.minutesRemaining < 60 && (
          <FooterUsageBanner 
            minutesRemaining={user.minutesRemaining}
          />
        )}
      </div>
    </div>
  );
} 