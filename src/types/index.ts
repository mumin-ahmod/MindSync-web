import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Intensity extends Category {}
export interface MuscleGroup extends Category {}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: number; // in minutes
  audioUrl?: string;
  coverImageUrl: string;
  coverImageHint?: string;
  bookmarked: boolean;
}

export interface WorkoutStep {
  name: string;
  duration?: string;
  reps?: string;
  description: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  intensity: Intensity;
  muscleGroup: MuscleGroup;
  steps: WorkoutStep[];
  coverImageUrl: string;
  coverImageHint?: string;
  bookmarked: boolean;
}

export interface ActivityLogItem {
  id: string;
  date: string;
  type: 'meditation' | 'workout' | 'custom';
  duration: number; // minutes
  name: string;
  notes?: string;
}

export interface ProgressData {
  totalMeditationTime: number;
  totalWorkoutTime: number;
  currentStreak: number;
  longestStreak: number;
  activityLog: ActivityLogItem[];
  bookmarkedMeditations: string[];
  bookmarkedWorkouts: string[];
}

export interface TimerSettings {
  duration: number; // in seconds
  mode: 'countdown' | 'countup';
}

export interface RecordedSession {
  id: string;
  type: 'meditation' | 'workout' | 'custom';
  name?: string; 
  startTime?: Date; // Make optional as it might be logged post-activity
  endTime?: Date;   // Make optional
  duration: number; // in seconds or minutes, clarify consistency. Let's use minutes to align with ActivityLogItem.
  notes?: string;
}
