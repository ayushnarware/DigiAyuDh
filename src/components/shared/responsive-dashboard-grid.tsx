'use client';

import type { ReactNode } from 'react';

interface ResponsiveDashboardGridProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveDashboardGrid({ children, className = '' }: ResponsiveDashboardGridProps) {
  return (
    <div className={`grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {children}
    </div>
  );
}

export function ResponsiveChartsGrid({ children, className = '' }: ResponsiveDashboardGridProps) {
  return (
    <div className={`grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2 ${className}`}>
      {children}
    </div>
  );
}

export function ResponsiveFullGrid({ children, className = '' }: ResponsiveDashboardGridProps) {
  return (
    <div className={`grid gap-4 md:gap-6 grid-cols-1 ${className}`}>
      {children}
    </div>
  );
}

// Mobile-first responsive container
export function DashboardContainer({ children, className = '' }: ResponsiveDashboardGridProps) {
  return (
    <div className={`space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${className}`}>
      {children}
    </div>
  );
}

// Section header for dashboard sections
export function DashboardSection({
  title,
  subtitle,
  action,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold truncate">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground truncate mt-1">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
}
