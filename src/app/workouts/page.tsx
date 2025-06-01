"use client";

import { useState } from 'react';
import { WorkoutCard } from "@/components/features/workouts/WorkoutCard";
import { sampleWorkouts, workoutIntensities, workoutMuscleGroups } from "@/lib/placeholder-data";
import type { Workout, Intensity, MuscleGroup } from "@/types";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Zap, Users, Filter } from 'lucide-react'; // Added Filter icon
import { Button } from '@/components/ui/button';

export default function WorkoutsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');

  const filteredWorkouts = sampleWorkouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntensity = selectedIntensity === 'all' || workout.intensity.id === selectedIntensity;
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || workout.muscleGroup.id === selectedMuscleGroup;
    return matchesSearch && matchesIntensity && matchesMuscleGroup;
  });

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Workout Library"
        description="Explore exercises for all fitness levels and goals."
        icon={Dumbbell} 
      />

      <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-10 py-4 -mt-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select value={selectedIntensity} onValueChange={setSelectedIntensity}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" /> 
                <SelectValue placeholder="Filter by intensity" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Intensities</SelectItem>
              {workoutIntensities.map((intensity: Intensity) => (
                <SelectItem key={intensity.id} value={intensity.id}>
                  <div className="flex items-center gap-2">
                    <intensity.icon className="h-4 w-4" /> {intensity.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
            <SelectTrigger className="w-full">
               <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filter by muscle group" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Muscle Groups</SelectItem>
              {workoutMuscleGroups.map((group: MuscleGroup) => (
                <SelectItem key={group.id} value={group.id}>
                   <div className="flex items-center gap-2">
                    <group.icon className="h-4 w-4" /> {group.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout: Workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
         <p className="text-center text-muted-foreground py-10">
          No workouts found matching your criteria. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}

// Placeholder for Dumbbell if not already used. For SectionTitle icon.
const Dumbbell = Zap; 
