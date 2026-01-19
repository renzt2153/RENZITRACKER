
export interface Habit {
  id: string;
  name: string;
  goal: number;
  unit: string;
  color: string;
  icon: string;
  createdAt: number;
}

export interface Entry {
  id: string;
  habitId: string;
  date: string; // ISO String YYYY-MM-DD
  value: number;
}

export interface InsightData {
  summary: string;
  recommendations: string[];
  motivationalQuote: string;
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  HABITS = 'habits',
  ANALYTICS = 'analytics',
  AI_INSIGHTS = 'ai_insights'
}
