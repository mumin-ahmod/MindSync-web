"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Edit3, CheckCircle, RotateCcw, CalendarDays, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sampleMeditations, sampleWorkouts } from '@/lib/placeholder-data'; // For pre-filling names/durations
import type { RecordedSession } from '@/types';

type SessionType = "meditation" | "workout" | "custom";

export default function RecordSessionPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [sessionType, setSessionType] = useState<SessionType>( (searchParams.get('type') as SessionType) || 'custom');
  const [sessionName, setSessionName] = useState(searchParams.get('name') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '10'); // in minutes
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  useEffect(() => {
    const typeParam = searchParams.get('type') as SessionType;
    const idParam = searchParams.get('id');
    const nameParam = searchParams.get('name');
    const durationParam = searchParams.get('duration');

    if (typeParam) setSessionType(typeParam);
    if (nameParam) setSessionName(nameParam);
    else if (idParam && typeParam === 'meditation') {
        const med = sampleMeditations.find(m => m.id === idParam);
        if (med) setSessionName(med.title);
    } else if (idParam && typeParam === 'workout') {
        const work = sampleWorkouts.find(w => w.id === idParam);
        if (work) setSessionName(work.title);
    }
    if (durationParam) setDuration(durationParam);

  }, [searchParams]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sessionName.trim()) {
        toast({ title: "Name Required", description: "Please enter a name for your session.", variant: "destructive" });
        return;
    }
    const durationMinutes = parseInt(duration);
    if (isNaN(durationMinutes) || durationMinutes <=0) {
        toast({ title: "Invalid Duration", description: "Please enter a valid duration greater than 0.", variant: "destructive" });
        return;
    }

    const newSession: Partial<RecordedSession> = { // Using Partial as ID, startTime, endTime are typically server-generated
      type: sessionType,
      name: sessionName,
      duration: durationMinutes, // Assuming duration is in minutes for logging
      notes: notes,
      // In a real app, date would be combined with time and converted to Date object
    };

    console.log("Session Logged:", newSession); // Placeholder for actual save logic
    toast({
      title: "Session Logged!",
      description: `${sessionName} (${durationMinutes} min) has been successfully logged.`,
      action: <CheckCircle className="h-5 w-5 text-green-500" />,
    });
    // Reset form or redirect
    handleReset();
  };

  const handleReset = () => {
    setSessionType('custom');
    setSessionName('');
    setDuration('10');
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <SectionTitle title="Log New Session" icon={Edit3} description="Record your completed meditations, workouts, or custom activities." />
      
      <Card className="w-full max-w-lg shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>Fill in the information about your activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sessionType">Session Type</Label>
              <Select value={sessionType} onValueChange={(value: SessionType) => setSessionType(value)}>
                <SelectTrigger id="sessionType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="workout">Workout</SelectItem>
                  <SelectItem value="custom">Custom Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionName">Session Name</Label>
              <Input 
                id="sessionName" 
                value={sessionName} 
                onChange={(e) => setSessionName(e.target.value)} 
                placeholder={sessionType === 'custom' ? "e.g., Evening Walk, Journaling" : "Name of meditation/workout"}
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-muted-foreground"/> Date</Label>
                <Input 
                    id="date" 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-1"><Clock className="h-4 w-4 text-muted-foreground"/> Duration (minutes)</Label>
                <Input 
                    id="duration" 
                    type="number" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                    placeholder="e.g., 30" 
                    min="1"
                    required 
                />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Any thoughts, feelings, or details about the session..." 
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" size="lg" className="w-full sm:flex-1 shadow-md">
              <CheckCircle className="mr-2 h-5 w-5" /> Log Session
            </Button>
            <Button type="button" onClick={handleReset} variant="outline" size="lg" className="w-full sm:flex-1 shadow-md">
               <RotateCcw className="mr-2 h-5 w-5" /> Reset Form
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
