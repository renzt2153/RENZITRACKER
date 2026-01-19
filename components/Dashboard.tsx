
import React from 'react';
import { Habit, Entry } from '../types';

interface DashboardProps {
  habits: Habit[];
  entries: Entry[];
  onUpdateEntry: (habitId: string, date: string, value: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, entries, onUpdateEntry }) => {
  const today = new Date().toISOString().split('T')[0];

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No habits tracked yet</h3>
        <p className="text-slate-500 max-w-xs text-center mt-2">Go to the 'Habits' tab to start tracking your first activity.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map((habit) => {
        const entry = entries.find(e => e.habitId === habit.id && e.date === today);
        const progress = entry ? (entry.value / habit.goal) * 100 : 0;
        const cappedProgress = Math.min(progress, 100);

        return (
          <div key={habit.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${habit.color.replace('bg-', 'bg-opacity-10 text-')} ${habit.color}`}>
                <HabitIcon name={habit.icon} />
              </div>
              <span className="text-sm font-bold text-slate-400">Target: {habit.goal} {habit.unit}</span>
            </div>
            
            <h4 className="text-xl font-bold text-slate-800 mb-1">{habit.name}</h4>
            <div className="flex items-end justify-between mb-4">
              <span className="text-2xl font-black text-indigo-600">
                {entry?.value || 0}
                <span className="text-sm font-medium text-slate-400 ml-1">/{habit.goal} {habit.unit}</span>
              </span>
              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full transition-all duration-500 ease-out ${habit.color}`} 
                style={{ width: `${cappedProgress}%` }}
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => onUpdateEntry(habit.id, today, Math.max(0, (entry?.value || 0) - 1))}
                className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors border border-slate-200"
              >
                -
              </button>
              <button 
                onClick={() => onUpdateEntry(habit.id, today, (entry?.value || 0) + 1)}
                className="flex-[2] py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm"
              >
                + Log Progress
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const HabitIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'activity': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'book': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'coffee': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8a3 3 0 01-3 3H5a2 2 0 01-2-2V7a2 2 0 012-2h10a3 3 0 013 3z M21 8a2 2 0 01-2 2h-1V6h1a2 2 0 012 2z M6 15h10M6 19h10" /></svg>;
    case 'droplet': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-5 8-11 8-11s8 6 8 11z" /></svg>;
    default: return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
};

export default Dashboard;
