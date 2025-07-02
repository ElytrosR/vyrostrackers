export interface GameSession {
  id: string;
  title: string;
  counters: Record<string, number>;
  date: string;
}

export interface CounterConfig {
  id: string;
  name: string;
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'pink';
}

export type Theme = 'light' | 'dark';