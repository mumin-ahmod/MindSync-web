
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, CheckSquare, Dumbbell, HeartPulse, ListChecks, Leaf, PlayCircle, Sparkles, Target, Timer as TimerIcon, TrendingUp, Users, Wind } from "lucide-react";
import { sampleProgressData, sampleMeditations, sampleWorkouts } from "@/lib/placeholder-data";
import Image from "next/image";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { StatCard } from "@/components/shared/StatCard";
import { BookmarkButton } from "@/components/shared/BookmarkButton";

export default function HomePage() {
  const { totalMeditationTime, totalWorkoutTime, currentStreak, longestStreak, activityLog } = sampleProgressData;
  const recentActivity = activityLog.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-sm">
        <MountainIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to MindSync
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Your personal space for mindfulness, meditation, and well-being.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/meditations">
              <Leaf className="mr-2 h-5 w-5" /> Explore Meditations
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/workouts">
              <Dumbbell className="mr-2 h-5 w-5" /> Discover Workouts
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <SectionTitle title="Your Progress" icon={TrendingUp} description="Keep track of your mindfulness journey." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Meditation Time" value={`${Math.floor(totalMeditationTime / 60)}h ${totalMeditationTime % 60}m`} icon={Leaf} description="Total time spent in meditation" />
          <StatCard title="Workout Time" value={`${Math.floor(totalWorkoutTime / 60)}h ${totalWorkoutTime % 60}m`} icon={Dumbbell} description="Total time spent on workouts" />
          <StatCard title="Current Streak" value={`${currentStreak} days`} icon={Sparkles} description="Consecutive days of activity" />
          <StatCard title="Longest Streak" value={`${longestStreak} days`} icon={Target} description="Your best streak so far" />
        </div>
      </section>

      <section>
        <SectionTitle title="Recent Activity" icon={ListChecks} description="What you've been up to lately." />
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {activity.type === 'meditation' && <Leaf className="h-5 w-5 text-primary" />}
                    {activity.type === 'workout' && <Dumbbell className="h-5 w-5 text-primary" />}
                    {activity.type === 'custom' && <CheckSquare className="h-5 w-5 text-primary" />}
                    {activity.name}
                  </CardTitle>
                  <CardDescription>
                    {new Date(activity.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Duration: {activity.duration} minutes</p>
                  {activity.notes && <p className="text-sm mt-1 italic">Notes: {activity.notes}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No recent activity logged yet. Start a session to see your progress!</p>
        )}
      </section>
      
      <section>
        <SectionTitle title="Quick Start" icon={PlayCircle} description="Jump right into an activity." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Leaf className="h-6 w-6 text-primary" /> Start Meditating</CardTitle>
              <CardDescription>Choose from our library of guided meditations.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image src="https://placehold.co/600x300.png" alt="Meditating person" data-ai-hint="meditation nature" width={600} height={300} className="rounded-md object-cover aspect-video" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/meditations">Browse Meditations <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Dumbbell className="h-6 w-6 text-primary" /> Begin Workout</CardTitle>
              <CardDescription>Find exercises tailored to your fitness level.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <Image src="https://placehold.co/600x300.png" alt="Person working out" data-ai-hint="fitness exercise" width={600} height={300} className="rounded-md object-cover aspect-video" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/workouts">Explore Workouts <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TimerIcon className="h-6 w-6 text-primary" /> Use Timer</CardTitle>
              <CardDescription>Set a custom timer for your sessions.</CardDescription>
            </CardHeader>
             <CardContent className="flex-grow">
               <Image src="https://placehold.co/600x300.png" alt="Timer interface" data-ai-hint="stopwatch timer" width={600} height={300} className="rounded-md object-cover aspect-video" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/timer">Go to Timer <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Using MountainIcon for logo placeholder as in Navbar.
function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
