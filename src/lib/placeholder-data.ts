
import type { Meditation, Workout, Category, Intensity, MuscleGroup, ProgressData, NavItem, ActivityLogItem } from '@/types';
import { Brain, Dumbbell, Timer as TimerIcon, Bookmark as BookmarkIcon, TrendingUp, Sparkles, Leaf, Activity, ListChecks, UserCircle, Settings, Wind, ShieldCheck, Zap, Flame, Feather, Users, Award, CalendarDays, Target, Moon, Smile, PlayCircle, Edit3, BookOpen, CheckSquare } from 'lucide-react';

export const navLinks: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: TrendingUp },
  { href: '/meditations', label: 'Meditations', icon: Leaf },
  { href: '/workouts', label: 'Workouts', icon: Dumbbell },
  { href: '/timer', label: 'Timer', icon: TimerIcon },
  { href: '/record', label: 'Log Session', icon: Edit3 },
  { href: '/bookmarks', label: 'Bookmarks', icon: BookmarkIcon },
];

export const meditationCategories: Category[] = [
  { id: 'stress-relief', name: 'Stress Relief', icon: Wind },
  { id: 'focus', name: 'Focus', icon: Target },
  { id: 'sleep', name: 'Sleep', icon: Moon },
  { id: 'happiness', name: 'Happiness', icon: Smile },
];

export const workoutIntensities: Intensity[] = [
  { id: 'low', name: 'Low', icon: Feather },
  { id: 'medium', name: 'Medium', icon: Zap },
  { id: 'high', name: 'High', icon: Flame },
];

export const workoutMuscleGroups: MuscleGroup[] = [
  { id: 'full-body', name: 'Full Body', icon: Users },
  { id: 'upper-body', name: 'Upper Body', icon: Dumbbell },
  { id: 'lower-body', name: 'Lower Body', icon: Activity },
  { id: 'core', name: 'Core', icon: ShieldCheck },
];


export const sampleMeditations: Meditation[] = [
  {
    id: 'med1',
    title: 'Morning Calm',
    description: 'Start your day with a peaceful 10-minute guided meditation to center yourself and set a positive tone.',
    category: meditationCategories[0],
    duration: 10,
    audioUrl: '/audio/morning_calm.mp3',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'sunrise meditation',
    bookmarked: false,
  },
  {
    id: 'med2',
    title: 'Deep Focus Flow',
    description: 'Enhance your concentration and productivity with this 15-minute session designed to sharpen your mind.',
    category: meditationCategories[1],
    duration: 15,
    audioUrl: '/audio/deep_focus.mp3',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'zen pebbles',
    bookmarked: true,
  },
  {
    id: 'med3',
    title: 'Sleep Sanctuary',
    description: 'Drift into a restful and rejuvenating sleep with this 20-minute guided meditation for ultimate relaxation.',
    category: meditationCategories[2],
    duration: 20,
    audioUrl: '/audio/sleep_sanctuary.mp3',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'night sky',
    bookmarked: false,
  },
  {
    id: 'med4',
    title: 'Joyful Moments',
    description: 'Cultivate happiness and gratitude with this uplifting 12-minute meditation to brighten your perspective.',
    category: meditationCategories[3],
    duration: 12,
    audioUrl: '/audio/joyful_moments.mp3',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'smiling person',
    bookmarked: false,
  },
];

export const sampleWorkouts: Workout[] = [
  {
    id: 'work1',
    title: 'Full Body Blast',
    description: 'A quick and effective 20-minute full body workout designed to boost your energy and strength.',
    intensity: workoutIntensities[2], 
    muscleGroup: workoutMuscleGroups[0], 
    steps: [
      { name: 'Jumping Jacks', duration: '60s', description: 'Warm-up thoroughly.' },
      { name: 'Bodyweight Squats', reps: '3x12', description: 'Focus on form, chest up, back straight.' },
      { name: 'Push-ups', reps: '3x10', description: 'Modify on knees if needed. Keep core engaged.' },
      { name: 'Plank', duration: '2x30s', description: 'Maintain a straight line from head to heels.' },
      { name: 'Lunges', reps: '3x10 per leg', description: 'Step forward, ensuring knee stays behind toe.' },
    ],
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'fitness workout',
    bookmarked: true,
  },
  {
    id: 'work2',
    title: 'Gentle Morning Stretch',
    description: 'Wake up your body and mind with a 15-minute gentle stretching routine to improve flexibility.',
    intensity: workoutIntensities[0], 
    muscleGroup: workoutMuscleGroups[0], 
    steps: [
      { name: 'Neck Rolls', duration: '30s each side', description: 'Slow, controlled movements.' },
      { name: 'Shoulder Shrugs & Rolls', reps: '2x10', description: 'Release tension in shoulders.' },
      { name: 'Cat-Cow Stretch', reps: '10 cycles', description: 'Mobilize your spine gently.' },
      { name: 'Child\'s Pose', duration: '60s', description: 'Relax and breathe deeply.' },
      { name: 'Torso Twists (Seated)', reps: '2x8 per side', description: 'Gentle twists for spinal mobility.' },
    ],
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'yoga stretching',
    bookmarked: false,
  },
  {
    id: 'work3',
    title: 'Core Crusher Express',
    description: 'A 15-minute intense core workout to build abdominal strength and stability. Quick and effective.',
    intensity: workoutIntensities[2],
    muscleGroup: workoutMuscleGroups[3],
    steps: [
        { name: 'Crunches', reps: '3x20', description: 'Focus on controlled upper abdominal contraction.' },
        { name: 'Leg Raises', reps: '3x15', description: 'Keep lower back pressed to the floor.' },
        { name: 'Russian Twists', reps: '3x15 each side', description: 'Engage obliques, option to lift feet.' },
        { name: 'High Plank', duration: '2x45s', description: 'Hold strong, core tight, body straight.' },
    ],
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'abdominal exercise',
    bookmarked: false,
  },
  {
    id: 'work4',
    title: 'Upper Body Strength Builder',
    description: 'Build strength and definition in your upper body with this 25-minute targeted routine.',
    intensity: workoutIntensities[1], 
    muscleGroup: workoutMuscleGroups[1], 
    steps: [
        { name: 'Dumbbell Bench Press', reps: '3x10', description: 'Use appropriate weight, controlled motion.' },
        { name: 'Bent Over Rows (Dumbbell)', reps: '3x12 per arm', description: 'Keep your back straight, pull to chest.' },
        { name: 'Overhead Press (Dumbbell)', reps: '3x10', description: 'Engage shoulders, press upwards.' },
        { name: 'Bicep Curls (Dumbbell)', reps: '3x12 per arm', description: 'Focus on bicep contraction, avoid swinging.' },
        { name: 'Tricep Dips (Bench/Chair)', reps: '3x10-12', description: 'Lower body until elbows are at 90 degrees.' },
    ],
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverImageHint: 'weight lifting',
    bookmarked: true,
  },
];

export const sampleActivityLog: ActivityLogItem[] = [
    { id: 'log1', date: '2024-07-20', type: 'meditation', duration: 20, name: 'Sleep Sanctuary', notes: 'Felt very relaxed.' },
    { id: 'log2', date: '2024-07-20', type: 'workout', duration: 25, name: 'Upper Body Strength', notes: 'Challenging but good.' },
    { id: 'log3', date: '2024-07-19', type: 'meditation', duration: 15, name: 'Deep Focus Flow' },
    { id: 'log4', date: '2024-07-18', type: 'workout', duration: 20, name: 'Full Body Blast', notes: 'Pushed myself hard.' },
    { id: 'log5', date: '2024-07-17', type: 'meditation', duration: 10, name: 'Morning Calm' },
    { id: 'log6', date: '2024-07-16', type: 'custom', duration: 30, name: 'Evening Walk', notes: 'Enjoyed the fresh air.' },
];

export const sampleProgressData: ProgressData = {
  totalMeditationTime: 1250, 
  totalWorkoutTime: 850, 
  currentStreak: 14, 
  longestStreak: 30, 
  activityLog: sampleActivityLog,
  bookmarkedMeditations: sampleMeditations.filter(m => m.bookmarked).map(m => m.id),
  bookmarkedWorkouts: sampleWorkouts.filter(w => w.bookmarked).map(w => w.id),
};
