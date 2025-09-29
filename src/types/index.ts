// Google AI Studio types
export interface AIResponse {
  text: string;
  confidence?: number;
}

export interface MeetingSummary {
  id: string;
  title: string;
  summary: string;
  todoItems: TodoItem[];
  participants: string[];
  date: Date;
  duration: number; // in minutes
}

export interface TodoItem {
  id: string;
  text: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: Date;
}

export interface MeetingData {
  transcript: string;
  participants: string[];
  duration: number;
  title?: string;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component props types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}