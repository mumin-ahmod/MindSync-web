import { sampleWorkouts } from "@/lib/placeholder-data";
import type { Workout, WorkoutStep } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Zap, Users, PlayCircle, Dumbbell, ListChecks, CheckCircle2, Repeat, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookmarkButton } from "@/components/shared/BookmarkButton";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const workout = sampleWorkouts.find(w => w.id === params.id);

  if (!workout) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Workout not found</h1>
        <p className="text-muted-foreground mt-2">
          The workout you are looking for does not exist or may have been removed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/workouts">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workouts
          </Link>
        </Button>
      </div>
    );
  }

  // Calculate estimated duration if possible (simplified)
  const estimatedDuration = workout.steps.reduce((total, step) => {
    if (step.duration) {
      const match = step.duration.match(/(\d+)(s|min)/);
      if (match) {
        const value = parseInt(match[1]);
        return total + (match[2] === 's' ? value / 60 : value);
      }
    }
    return total + 1; // Assume 1 min per rep-based exercise for a rough estimate
  }, 0);


  return (
    <div className="space-y-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/workouts">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workouts
        </Link>
      </Button>

      <SectionTitle title={workout.title} icon={Dumbbell} />
      
      <Card className="overflow-hidden shadow-xl">
         <div className="grid md:grid-cols-2">
          <div className="relative w-full h-64 md:h-auto">
            <Image
              src={workout.coverImageUrl}
              alt={workout.title}
              layout="fill"
              objectFit="cover"
              className="md:rounded-l-lg"
              data-ai-hint={workout.coverImageHint || "fitness action"}
            />
            <div className="absolute top-4 right-4">
               <BookmarkButton itemId={workout.id} initialBookmarked={workout.bookmarked} size="lg" />
             </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-sm py-1 px-3 flex items-center gap-1">
                        <workout.intensity.icon className="h-4 w-4" /> {workout.intensity.name} Intensity
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-1 px-3 flex items-center gap-1">
                        <workout.muscleGroup.icon className="h-4 w-4" /> {workout.muscleGroup.name}
                    </Badge>
                    {estimatedDuration > 0 && (
                         <Badge variant="secondary" className="text-sm py-1 px-3 flex items-center gap-1">
                            <Clock className="h-4 w-4" /> ~{Math.ceil(estimatedDuration)} min
                        </Badge>
                    )}
                </div>
              <CardDescription className="text-lg leading-relaxed">
                {workout.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 flex-grow">
              {/* Content here if needed before steps */}
            </CardContent>

            <CardFooter className="p-0 mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="w-full sm:w-auto flex-grow">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Workout
              </Button>
               <Button variant="outline" size="lg" className="w-full sm:w-auto flex-grow" asChild>
                 <Link href={`/record?type=workout&id=${workout.id}&name=${encodeURIComponent(workout.title)}&duration=${Math.ceil(estimatedDuration)}`}>
                    <ListChecks className="mr-2 h-5 w-5" />
                    Log this Workout
                 </Link>
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Workout Steps</CardTitle>
        </CardHeader>
        <CardContent>
          {workout.steps.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {workout.steps.map((step: WorkoutStep, index: number) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg hover:no-underline">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{index + 1}. {step.name}</span>
                        {(step.reps || step.duration) && (
                             <Badge variant="outline" className="ml-auto text-sm">
                                {step.reps && <><Repeat className="h-3 w-3 mr-1"/> {step.reps}</>}
                                {step.duration && <><Clock className="h-3 w-3 mr-1"/> {step.duration}</>}
                            </Badge>
                        )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 text-muted-foreground">
                    {step.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No steps defined for this workout.</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
