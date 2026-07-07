'use client';

import { useState, type ReactNode, createContext, useContext } from 'react';

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({ activeTab: '', setActiveTab: () => {} });

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className || ''}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={`flex border-b border-border ${className || ''}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, onClick }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => {
        context.setActiveTab(value);
        onClick?.();
      }}
      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = useContext(TabsContext);

  if (context.activeTab !== value) {
    return null;
  }

  return <div className="pt-6">{children}</div>;
}
