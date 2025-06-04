import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  MessageSquare,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutGrid },
  { name: 'Reports', href: '/app/reports', icon: FileText },
  { name: 'Conversations', href: '/app/conversations', icon: MessageSquare },
  { name: 'Team', href: '/app/team', icon: Users },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export const DashboardLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link to="/app/dashboard">
              <img
                src="/logo.svg"
                alt="Clarivue"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-gray-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="/avatars/user.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">john@example.com</div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; 