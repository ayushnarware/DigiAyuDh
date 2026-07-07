'use client';

import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'cyan';
  compact?: boolean;
  onClick?: () => void;
  miniChart?: boolean;
}

const colorClasses = {
  blue: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
  purple: 'bg-purple-500/10 text-purple-600 border-purple-200/50',
  green: 'bg-green-500/10 text-green-600 border-green-200/50',
  orange: 'bg-orange-500/10 text-orange-600 border-orange-200/50',
  red: 'bg-red-500/10 text-red-600 border-red-200/50',
  cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-200/50',
};

const accentColors = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
  cyan: 'text-cyan-600',
};

export function ModernKPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = 'neutral',
  color = 'blue',
  compact = false,
  onClick,
  miniChart = false,
}: KPICardProps) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  const hasChange = change !== undefined;

  if (compact) {
    return (
      <Card className={`border cursor-pointer transition-all hover:shadow-md hover:border-foreground/50 ${colorClasses[color]}`} onClick={onClick}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
              <p className="text-lg sm:text-2xl font-bold mt-1 truncate">{value}</p>
              {hasChange && (
                <div className="flex items-center gap-1 mt-2">
                  {isPositive && <TrendingUp className="w-3 h-3 text-green-600" />}
                  {isNegative && <TrendingDown className="w-3 h-3 text-red-600" />}
                  <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {isPositive ? '+' : isNegative ? '' : ''}{change}% {changeLabel}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${accentColors[color]}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border cursor-pointer transition-all hover:shadow-lg hover:border-foreground/50 overflow-hidden ${colorClasses[color]}`} onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <div className={`p-2 rounded-lg bg-background`}>
            <Icon className={`w-5 h-5 ${accentColors[color]}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          {changeLabel && (
            <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
          )}
        </div>

        {hasChange && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="w-4 h-4 text-green-600" />}
              {isNegative && <TrendingDown className="w-4 h-4 text-red-600" />}
              <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`}>
                {isPositive ? '+' : isNegative ? '-' : ''}{Math.abs(change)}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}

        {miniChart && (
          <div className="pt-2 h-10 flex items-end justify-between gap-1">
            {[65, 72, 68, 75, 82, 78, 85, 92].map((v, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t bg-current opacity-60 hover:opacity-100 transition-opacity`}
                style={{ height: `${(v / 100) * 100}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
