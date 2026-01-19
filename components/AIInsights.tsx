
import React, { useState, useEffect } from 'react';
import { Habit, Entry, InsightData } from '../types';
import { getAIInsights } from '../services/geminiService';

interface AIInsightsProps {
  habits: Habit[];
  entries: Entry[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ habits, entries }) => {
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    if (habits.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAIInsights(habits, entries);
      setInsight(data);
    } catch (err) {
      setError("Unable to generate insights at the moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (habits.length > 0 && !insight) {
      fetchInsights();
    }
  }, [habits.length]);

  if (habits.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
        <p className="text-slate-400">You need habits to get AI insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Smart Analysis</h3>
        </div>
        <button 
          onClick={fetchInsights} 
          disabled={loading}
          className="text-indigo-600 font-bold hover:underline disabled:opacity-50 text-sm"
        >
          {loading ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-slate-500 animate-pulse font-medium">Gemini is analyzing your patterns...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 text-rose-600">
          <p>{error}</p>
        </div>
      ) : insight ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Executive Summary</h4>
              <p className="text-xl text-slate-800 leading-relaxed font-medium">
                "{insight.summary}"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insight.recommendations.map((rec, i) => (
                <div key={i} className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold mb-4">
                    {i + 1}
                  </div>
                  <p className="text-indigo-900 font-bold leading-snug">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
              <svg className="w-10 h-10 text-indigo-400 mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H5.01704C4.46476 3 4.01704 3.44772 4.01704 4V15C4.01704 15.5523 4.46476 16 5.01704 16H8.01704C9.12161 16 10.017 16.8954 10.017 18V21H14.017Z" />
              </svg>
              <p className="text-2xl font-light italic leading-relaxed mb-6">
                {insight.motivationalQuote}
              </p>
              <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase">Your Mindset Catalyst</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <p className="text-slate-400">Click refresh to generate your first AI insights.</p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
