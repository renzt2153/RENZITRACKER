
import React, { useMemo } from 'react';
import { Habit, Entry } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';

interface AnalyticsProps {
  habits: Habit[];
  entries: Entry[];
}

const Analytics: React.FC<AnalyticsProps> = ({ habits, entries }) => {
  const last7Days = useMemo(() => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

  const chartData = useMemo(() => {
    return last7Days.map(date => {
      const dayData: any = { date: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }) };
      habits.forEach(habit => {
        const entry = entries.find(e => e.habitId === habit.id && e.date === date);
        // Normalize as percentage of goal for easier comparison
        dayData[habit.name] = entry ? Math.min((entry.value / habit.goal) * 100, 100) : 0;
      });
      return dayData;
    });
  }, [habits, entries, last7Days]);

  if (habits.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
        <p className="text-slate-400">Create habits to see analytics data.</p>
      </div>
    );
  }

  const colors = ['#4f46e5', '#f43f5e', '#10b981', '#f59e0b', '#7c3aed', '#0ea5e9'];

  return (
    <div className="space-y-8">
      {/* Overview Chart */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Past 7 Days Success Rate (%)</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                {habits.map((h, i) => (
                  <linearGradient key={h.id} id={`color${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              {habits.map((habit, i) => (
                <Area
                  key={habit.id}
                  type="monotone"
                  dataKey={habit.name}
                  stroke={colors[i % colors.length]}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={`url(#color${i})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit, i) => {
          const completionCount = entries.filter(e => e.habitId === habit.id && e.value >= habit.goal).length;
          return (
            <div key={habit.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${habit.color}`} />
                  <h4 className="font-bold text-slate-800">{habit.name}</h4>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase">Lifetime Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-2xl font-black text-indigo-600">{completionCount}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase mt-1">Goal Reached</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-2xl font-black text-slate-700">
                    {entries.filter(e => e.habitId === habit.id).length}
                  </p>
                  <p className="text-xs font-bold text-slate-500 uppercase mt-1">Total Logs</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analytics;
