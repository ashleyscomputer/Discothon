import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GuardianWidget } from '../GuardianWidget';

interface StudyTimerProps {
  onTriggerPanic?: () => void;
}

export default function StudyTimer({ onTriggerPanic }: StudyTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const totalSeconds = mode === "focus" ? 25 * 60 : 5 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  const handleLongPressStart = () => {
    const timer = setTimeout(() => {
      onTriggerPanic?.();
    }, 2000);
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    if (mode === "focus") {
      setSessionsCompleted(sessionsCompleted + 1);
      setMode("break");
      setMinutes(5);
    } else {
      setMode("focus");
      setMinutes(25);
    }
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === "focus" ? 25 : 5);
    setSeconds(0);
  };

  const switchMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setIsActive(false);
    setMinutes(newMode === "focus" ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <header className="border-b bg-card/50 backdrop-blur-sm px-4 py-4">
        <h1
          className="text-2xl font-bold text-center"
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
        >
          Study Timer
        </h1>
      </header>

      <main className="p-6 max-w-md mx-auto space-y-6">
        <div className="flex gap-2 justify-center">
          <Button
            variant={mode === "focus" ? "default" : "outline"}
            onClick={() => switchMode("focus")}
            className="gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Focus
          </Button>
          <Button
            variant={mode === "break" ? "default" : "outline"}
            onClick={() => switchMode("break")}
            className="gap-2"
          >
            <Coffee className="w-4 h-4" />
            Break
          </Button>
        </div>

        <Card className="p-8 text-center space-y-6 shadow-[var(--shadow-medium)] bg-gradient-to-br from-card to-secondary/30">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {mode === "focus" ? "Focus Time" : "Break Time"}
            </div>
            <div className="text-7xl font-bold tabular-nums">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex gap-3 justify-center">
            <Button
              size="lg"
              onClick={toggleTimer}
              className="gap-2 px-8"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={resetTimer}
              className="gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Sessions Completed Today
              </div>
              <div className="text-2xl font-bold text-primary">
                {sessionsCompleted}
              </div>
            </div>
            <div className="p-4 rounded-full bg-primary/10">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3 text-center">
          <Card className="p-3">
            <div className="text-xs text-muted-foreground mb-1">Focus</div>
            <div className="font-semibold">25 min</div>
          </Card>
          <Card className="p-3">
            <div className="text-xs text-muted-foreground mb-1">Break</div>
            <div className="font-semibold">5 min</div>
          </Card>
          <Card className="p-3">
            <div className="text-xs text-muted-foreground mb-1">Sessions</div>
            <div className="font-semibold">{sessionsCompleted}</div>
          </Card>
        </div>
      </main>
      <GuardianWidget />
    </div>
  );
}
