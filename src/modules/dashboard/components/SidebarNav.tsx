import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  BarChart2,
  Users,
  HelpCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import '@/styles/app.css';

interface SidebarNavProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

const menuItems = [
  {
    title: 'Home',
    icon: Home,
    href: '/dashboard',
  },
  {
    title: 'Scorecards',
    icon: FileText,
    href: '/dashboard/scorecards',
  },
  {
    title: 'Reports',
    icon: BarChart2,
    href: '/dashboard/reports',
  },
  {
    title: 'Team',
    icon: Users,
    href: '/dashboard/team',
  }
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        'border-r border-[#7FDCD7]/10 bg-white flex flex-col transition-all duration-300 clarivue-shadow-sm',
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      )}
    >
      {/* Logo & Collapse Button */}
      <div className="p-2 flex items-center justify-between border-b border-[#7FDCD7]/10">
        {!isCollapsed ? (
          <>
            <div className="flex items-center">
              <div className="w-36 h-32 rounded-full bg-white flex items-center justify-center">
                <img src="/brand/clarivue_logo_transparent.png" alt="Clarivue" className="h-28 w-32" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#7FDCD7] hover:bg-[#7FDCD7]/10 hover:text-[#04ADA4]"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <Button
              variant="ghost"
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-[#7FDCD7]/10"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <img src="/brand/clarivue_icon_gradient.png" alt="Clarivue" className="h-8 w-8" />
            </Button>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="p-2 border-b border-[#7FDCD7]/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-[#7FDCD7]/20">
            <AvatarImage src="/brand/clarivue_icon_gradient.png" alt={user.name} />
            <AvatarFallback className="bg-[#7FDCD7]/10 text-[#04ADA4]">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                'hover:bg-[#7FDCD7]/10 hover:text-[#04ADA4]',
                isActive ? 'bg-[#7FDCD7]/10 text-[#04ADA4] font-medium' : 'text-gray-600',
                isCollapsed && 'justify-center'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer Links */}
      <div className="p-4 border-t border-[#7FDCD7]/10 space-y-2">
        {isCollapsed ? (
          <>
            <a
              href="https://help.clarivue.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-[#7FDCD7]/10 hover:text-[#04ADA4] transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
            </a>
            <a
              href="mailto:support@clarivue.ai"
              className="flex items-center justify-center px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-[#7FDCD7]/10 hover:text-[#04ADA4] transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </>
        ) : (
          <>
            <a
              href="https://help.clarivue.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-[#7FDCD7]/10 hover:text-[#04ADA4] transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help Center</span>
            </a>
            <a
              href="mailto:support@clarivue.ai"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-[#7FDCD7]/10 hover:text-[#04ADA4] transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Support</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}; 