
import React from 'react';
import { NavigationTab } from '../types';
import { LayoutDashboard, ListTodo, BarChart3, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: NavigationTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: NavigationTab.HABITS, label: 'Habits', icon: ListTodo },
    { id: NavigationTab.ANALYTICS, label: 'Analytics', icon: BarChart3 },
    { id: NavigationTab.AI_INSIGHTS, label: 'AI Insights', icon: Sparkles },
  ];

  return (
    <>
      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden px-4 py-2 flex justify-around items-center shadow-lg">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'
            }`}
          >
            <item.icon size={24} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">
        <div className="p-8">
          <h1 className="text-2xl font-bold bg-indigo-600 bg-clip-text text-transparent inline-block">Trackly</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-medium">Powering your growth</p>
            <p className="text-[10px] text-slate-400 mt-1">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

// Mock Lucide components for the environment since they might not be globally available
const LayoutDashboard = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const ListTodo = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 3 2 2 4-4" /><path d="m3 12 2 2 4-4" /><path d="m3 21 2 2 4-4" />
    <path d="M13 5h8" /><path d="M13 14h8" /><path d="M13 23h8" />
  </svg>
);

const BarChart3 = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
  </svg>
);

const Sparkles = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M3 5h4" /><path d="M21 17v4" /><path d="M19 19h4" />
  </svg>
);

export default Navigation;
