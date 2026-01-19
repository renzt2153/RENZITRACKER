
import React from 'react';
import { NavigationTab } from '../types';

interface HeaderProps {
  activeTab: NavigationTab;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD: return "Today's Progress";
      case NavigationTab.HABITS: return "Manage Habits";
      case NavigationTab.ANALYTICS: return "Growth Analytics";
      case NavigationTab.AI_INSIGHTS: return "AI Recommendations";
      default: return "Trackly";
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD: return "Track your activity for today and stay on top of your goals.";
      case NavigationTab.HABITS: return "Create and customize what matters to you most.";
      case NavigationTab.ANALYTICS: return "Visualize your progress over the past weeks and months.";
      case NavigationTab.AI_INSIGHTS: return "Smart analysis powered by Gemini to optimize your performance.";
      default: return "";
    }
  };

  return (
    <header className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900">{getTitle()}</h2>
      <p className="text-slate-500 mt-2 font-medium">{getSubtitle()}</p>
    </header>
  );
};

export default Header;
