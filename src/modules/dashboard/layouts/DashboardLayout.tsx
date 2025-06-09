import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from '../components/SidebarNav';
import { FooterUsageBanner } from '../components/FooterUsageBanner';
import '@/styles/app.css';

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
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <SidebarNav user={user} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50/50">
        <main className="flex-1 p-8">
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