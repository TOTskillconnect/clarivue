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
    title: 'Interviews',
    icon: FileText,
    href: '/dashboard/hiring/criteria',
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
        'border-r bg-card flex flex-col transition-all duration-300',
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      )}
    >
      {/* Collapse Button */}
      <div className="p-4 flex justify-end border-b">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-teal-50/50 hover:text-teal-600"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/default.png" alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
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
                'hover:bg-teal-50/50 hover:text-teal-600',
                isActive ? 'bg-teal-50 text-teal-700' : 'text-muted-foreground',
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
      <div className="p-4 border-t space-y-2">
        {!isCollapsed && (
          <>
            <a
              href="https://help.clarivue.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-teal-50/50 hover:text-teal-600 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help Center</span>
            </a>
            <a
              href="mailto:support@clarivue.ai"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-teal-50/50 hover:text-teal-600 transition-colors"
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