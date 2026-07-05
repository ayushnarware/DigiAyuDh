import { Link, useLocation } from 'react-router-dom';
import { Bell, ChevronRight, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { APP_CONFIG } from '@/config/app.config';
import { useAuth } from '@/contexts/auth.context';
import { cn } from '@/lib/utils';

interface PortalLayoutProps {
  children: React.ReactNode;
  navItems: { label: string; href: string }[];
  portalName: string;
}

export function PortalLayout({ children, navItems, portalName }: PortalLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const breadcrumbs = location.pathname.split('/').filter(Boolean);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 text-xs font-bold text-white">
            DA
          </div>
          <div>
            <p className="text-sm font-bold">{APP_CONFIG.name}</p>
            <p className="text-[10px] text-muted-foreground">{portalName}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
              {user?.avatar ?? 'U'}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-2 capitalize">
                {i > 0 && <ChevronRight className="size-3" />}
                {crumb.replace(/-/g, ' ')}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
