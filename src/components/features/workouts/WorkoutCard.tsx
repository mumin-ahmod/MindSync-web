import type { Workout } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Zap, Users, PlayCircle, BarChart3 } from "lucide-react";
import { BookmarkButton } from "@/components/shared/BookmarkButton";
import { Badge } from "@/components/ui/badge";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-48">
        <Image
          src={workout.coverImageUrl}
          alt={workout.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={workout.coverImageHint || "fitness exercise"}
        />
         <div className="absolute top-2 right-2">
          <BookmarkButton itemId={workout.id} initialBookmarked={workout.bookmarked} />
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-headline tracking-tight">{workout.title}</CardTitle>
         <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
          <Badge variant="outline" className="flex items-center gap-1">
            <workout.intensity.icon className="h-4 w-4 text-primary" />
            {workout.intensity.name}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <workout.muscleGroup.icon className="h-4 w-4 text-primary" />
            {workout.muscleGroup.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <CardDescription className="line-clamp-3">{workout.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/workouts/${workout.id}`}>
            <PlayCircle className="mr-2 h-5 w-5" />
            View Workout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
