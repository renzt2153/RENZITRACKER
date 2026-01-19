
import React, { useState } from 'react';
import { Habit } from '../types';

interface HabitListProps {
  habits: Habit[];
  onAddHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onAddHabit, onDeleteHabit }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('1');
  const [unit, setUnit] = useState('times');
  const [color, setColor] = useState('bg-indigo-600');
  const [icon, setIcon] = useState('activity');

  const colors = [
    'bg-indigo-600', 'bg-rose-500', 'bg-emerald-500', 
    'bg-amber-500', 'bg-violet-600', 'bg-sky-500'
  ];

  const icons = ['activity', 'book', 'coffee', 'droplet', 'target'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddHabit({
      id: crypto.randomUUID(),
      name: name.trim(),
      goal: Number(goal),
      unit,
      color,
      icon,
      createdAt: Date.now()
    });

    setName('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Your Tracked Habits</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-2 hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span>{showForm ? 'Cancel' : '+ New Habit'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Habit Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Drink Water"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Daily Goal</label>
                  <input 
                    type="number" 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Unit</label>
                  <input 
                    type="text" 
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. glasses"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Pick a Color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(c => (
                    <button 
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-10 h-10 rounded-full transition-transform ${c} ${color === c ? 'ring-4 ring-slate-200 scale-110' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Icon</label>
                <div className="flex gap-2">
                  {icons.map(i => (
                    <button 
                      key={i}
                      type="button"
                      onClick={() => setIcon(i)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${icon === i ? 'bg-indigo-50 border-indigo-600 text-indigo-600' : 'bg-white border-slate-200 text-slate-400'}`}
                    >
                      <HabitIcon name={i} size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Create Habit
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Habit</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Goal</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {habits.map((habit) => (
              <tr key={habit.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg text-white ${habit.color}`}>
                      <HabitIcon name={habit.icon} size={16} />
                    </div>
                    <span className="font-bold text-slate-700">{habit.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                  {habit.goal} {habit.unit}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDeleteHabit(habit.id)}
                    className="text-rose-500 hover:text-rose-700 p-2 font-bold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {habits.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                  No habits created yet. Click "+ New Habit" to start.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HabitIcon = ({ name, size = 24 }: { name: string, size?: number }) => {
  const props = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" as "round", strokeLinejoin: "round" as "round" };
  switch (name) {
    case 'activity': return <svg {...props} viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'book': return <svg {...props} viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case 'coffee': return <svg {...props} viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>;
    case 'droplet': return <svg {...props} viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>;
    case 'target': return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
    default: return <svg {...props} viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" /></svg>;
  }
};

export default HabitList;
