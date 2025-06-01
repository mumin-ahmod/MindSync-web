
"use client";

import { useState, useEffect } from 'react';
import { MeditationCard } from "@/components/features/meditations/MeditationCard";
import { WorkoutCard } from "@/components/features/workouts/WorkoutCard";
import { sampleMeditations, sampleWorkouts, sampleProgressData } from "@/lib/placeholder-data";
import type { Meditation, Workout } from "@/types";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bookmark, Leaf, Dumbbell } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BookmarksPage() {
  const [bookmarkedMeditations, setBookmarkedMeditations] = useState<Meditation[]>([]);
  const [bookmarkedWorkouts, setBookmarkedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    // In a real app, this data would be fetched or come from a global state/context
    const medIds = new Set(sampleProgressData.bookmarkedMeditations);
    const workoutIds = new Set(sampleProgressData.bookmarkedWorkouts);
    
    setBookmarkedMeditations(sampleMeditations.filter(m => medIds.has(m.id)));
    setBookmarkedWorkouts(sampleWorkouts.filter(w => workoutIds.has(w.id)));
  }, []);

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Your Bookmarks"
        description="Revisit your favorite meditations and workouts anytime."
        icon={Bookmark}
      />

      <Tabs defaultValue="meditations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="meditations" className="py-3 text-base">
            <Leaf className="mr-2 h-5 w-5" /> Meditations ({bookmarkedMeditations.length})
          </TabsTrigger>
          <TabsTrigger value="workouts" className="py-3 text-base">
            <Dumbbell className="mr-2 h-5 w-5" /> Workouts ({bookmarkedWorkouts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meditations">
          {bookmarkedMeditations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedMeditations.map((meditation) => (
                <MeditationCard key={meditation.id} meditation={meditation} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p className="text-lg mb-2">You haven&apos;t bookmarked any meditations yet.</p>
              <Button asChild>
                <Link href="/meditations">Explore Meditations</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="workouts">
          {bookmarkedWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-muted-foreground">
              <p className="text-lg mb-2">You haven&apos;t bookmarked any workouts yet.</p>
              <Button asChild>
                <Link href="/workouts">Explore Workouts</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
