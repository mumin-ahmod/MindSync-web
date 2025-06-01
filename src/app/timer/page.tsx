"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Timer as TimerIcon, Play, Pause, RotateCcw, ArrowUp, ArrowDown, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

type TimerMode = "countdown" | "countup";

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>("countdown");
  const [durationInput, setDurationInput] = useState({ hours: 0, minutes: 10, seconds: 0 });
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds for countup
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const calculateTotalSeconds = useCallback(() => {
    return (durationInput.hours * 3600) + (durationInput.minutes * 60) + durationInput.seconds;
  }, [durationInput]);

  useEffect(() => {
    if (mode === "countdown") {
      setTimeLeft(calculateTotalSeconds());
    } else {
      setTimeLeft(0); // For count-up, target can be indefinite or set
    }
    setTimeElapsed(0); // Reset elapsed time when duration changes
  }, [durationInput, mode, calculateTotalSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (mode === "countdown") {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              setIsRunning(false);
              toast({ title: "Timer Finished!", description: "Your countdown has ended.", duration: 5000, action: <Bell className="h-5 w-5 text-primary" /> });
              return 0;
            }
            return prev - 1;
          });
        } else { // countup
          setTimeElapsed(prev => prev + 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, toast]);

  const handleInputChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value) || 0;
    setDurationInput(prev => ({ ...prev, [field]: Math.max(0, numValue) }));
  };

  const handleStartPause = () => {
    if (mode === "countdown" && calculateTotalSeconds() === 0 && !isRunning) {
        toast({ title: "Set Duration", description: "Please set a duration for the countdown timer.", variant: "destructive" });
        return;
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === "countdown") {
      setTimeLeft(calculateTotalSeconds());
    } else {
      setTimeLeft(0);
    }
    setTimeElapsed(0);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const displayTime = mode === "countdown" ? timeLeft : timeElapsed;

  return (
    <div className="space-y-8 flex flex-col items-center">
      <SectionTitle title="Custom Timer" icon={TimerIcon} description="Set your own pace for meditation or exercise." />
      
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {mode === "countdown" ? "Countdown Timer" : "Count-Up Timer"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className={cn(
              "text-6xl font-mono font-bold text-center py-8 rounded-lg transition-colors duration-300",
              isRunning && mode === 'countdown' && timeLeft < 10 && timeLeft > 0 ? "text-destructive animate-pulse" : "text-primary",
              isRunning && mode === 'countup' ? "text-accent" : ""
            )}
            role="timer"
            aria-live="assertive"
          >
            {formatTime(displayTime)}
          </div>

          {!isRunning && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Settings className="h-5 w-5 text-primary"/> Timer Settings</h3>
              <RadioGroup defaultValue="countdown" onValueChange={(value: TimerMode) => { setMode(value); handleReset(); }} className="flex space-x-4 justify-center">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="countdown" id="countdown" />
                  <Label htmlFor="countdown" className="flex items-center gap-1"><ArrowDown className="h-4 w-4"/>Countdown</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="countup" id="countup" />
                  <Label htmlFor="countup" className="flex items-center gap-1"><ArrowUp className="h-4 w-4"/>Count-Up</Label>
                </div>
              </RadioGroup>

              {mode === "countdown" && (
                <div className="grid grid-cols-3 gap-3 items-end">
                  <div>
                    <Label htmlFor="hours">Hours</Label>
                    <Input id="hours" type="number" min="0" value={durationInput.hours} onChange={(e) => handleInputChange('hours', e.target.value)} placeholder="HH" />
                  </div>
                  <div>
                    <Label htmlFor="minutes">Minutes</Label>
                    <Input id="minutes" type="number" min="0" max="59" value={durationInput.minutes} onChange={(e) => handleInputChange('minutes', e.target.value)} placeholder="MM" />
                  </div>
                  <div>
                    <Label htmlFor="seconds">Seconds</Label>
                    <Input id="seconds" type="number" min="0" max="59" value={durationInput.seconds} onChange={(e) => handleInputChange('seconds', e.target.value)} placeholder="SS" />
                  </div>
                </div>
              )}
               {mode === "countup" && (
                <p className="text-sm text-muted-foreground text-center">The timer will count up indefinitely until paused or reset.</p>
               )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleStartPause} size="lg" className="w-full sm:flex-1 shadow-md">
            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="outline" size="lg" className="w-full sm:flex-1 shadow-md">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
