
import React, { useState, useEffect, useMemo } from 'react';
import { Habit, Entry, NavigationTab } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import HabitList from './components/HabitList';
import Analytics from './components/Analytics';
import AIInsights from './components/AIInsights';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('trackly_habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem('trackly_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);

  useEffect(() => {
    localStorage.setItem('trackly_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('trackly_entries', JSON.stringify(entries));
  }, [entries]);

  const addHabit = (habit: Habit) => {
    setHabits(prev => [habit, ...prev]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    setEntries(prev => prev.filter(e => e.habitId !== id));
  };

  const updateEntry = (habitId: string, date: string, value: number) => {
    setEntries(prev => {
      const existing = prev.find(e => e.habitId === habitId && e.date === date);
      if (existing) {
        return prev.map(e => (e.habitId === habitId && e.date === date ? { ...e, value } : e));
      }
      return [...prev, { id: crypto.randomUUID(), habitId, date, value }];
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard habits={habits} entries={entries} onUpdateEntry={updateEntry} />;
      case NavigationTab.HABITS:
        return <HabitList habits={habits} onAddHabit={addHabit} onDeleteHabit={deleteHabit} />;
      case NavigationTab.ANALYTICS:
        return <Analytics habits={habits} entries={entries} />;
      case NavigationTab.AI_INSIGHTS:
        return <AIInsights habits={habits} entries={entries} />;
      default:
        return <Dashboard habits={habits} entries={entries} onUpdateEntry={updateEntry} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-64 transition-all duration-300">
      <Navigation activeTab={activeTab} onNavigate={setActiveTab} />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Header activeTab={activeTab} />
        <main className="mt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
