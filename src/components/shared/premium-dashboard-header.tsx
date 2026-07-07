'use client';

import { Search, Bell, MessageSquare, Moon, Sun, Globe, User, Command, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PremiumHeaderProps {
  title?: string;
  subtitle?: string;
  companyName?: string;
  showClock?: boolean;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export function PremiumDashboardHeader({
  title = 'Dashboard',
  subtitle = 'Welcome back',
  companyName = 'DigiAyuDh',
  showClock = true,
  onThemeToggle,
  isDarkMode = false,
}: PremiumHeaderProps) {
  const [time, setTime] = useState<string>('');
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    if (!showClock) return;

    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [showClock]);

  // Command palette shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(!showCommandPalette);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [showCommandPalette]);

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      {/* Main Header */}
      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Welcome Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold truncate">{title}</h1>
              {showClock && time && (
                <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Clock className="w-3 h-3" />
                  {time}
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {subtitle} • {companyName}
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="hidden sm:flex flex-1 sm:flex-none items-center relative max-w-xs">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search..."
                className="pl-10 pr-4 h-9 text-sm bg-muted/50 border-muted-foreground/20"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MessageSquare className="w-4 h-4" />
            </Button>

            {/* Command Palette */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hidden sm:flex"
              onClick={() => setShowCommandPalette(!showCommandPalette)}
              title="Cmd+K"
            >
              <Command className="w-4 h-4" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onThemeToggle}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Language */}
            <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
              <Globe className="w-4 h-4" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Header - Breadcrumbs/Navigation */}
      <div className="px-4 py-2 sm:px-6 lg:px-8 border-t border-border/50 bg-muted/30 hidden sm:block">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Platform</span>
            <span>/</span>
            <span className="font-medium text-foreground">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
