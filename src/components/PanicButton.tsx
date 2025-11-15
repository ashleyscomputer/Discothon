import { useState } from "react";
import { Shield, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanicButtonProps {
  onTrigger: () => void;
}

export default function PanicButton({ onTrigger }: PanicButtonProps) {
  const [pressCount, setpressCount] = useState(0);
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);

  const handleVolumePress = () => {
    if (resetTimer) clearTimeout(resetTimer);
    
    const newCount = pressCount + 1;
    setpressCount(newCount);

    if (newCount >= 2) {
      onTrigger();
      setpressCount(0);
    } else {
      const timer = setTimeout(() => setpressCount(0), 2000);
      setResetTimer(timer);
    }
  };

  return (
    <>
      {/* Floating Panic Button - looks like a volume control */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          onClick={handleVolumePress}
          size="icon"
          className="h-14 w-14 rounded-full shadow-[var(--shadow-strong)] bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border-2 border-border group transition-all duration-300"
          title="Double-tap for emergency"
        >
          {pressCount > 0 ? (
            <Shield className="w-6 h-6 text-primary animate-pulse" />
          ) : (
            <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
        </Button>
        
        {pressCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold animate-scale-in shadow-[var(--shadow-glow)]">
            {pressCount}
          </div>
        )}
      </div>

      {/* Visual indicator */}
      {pressCount > 0 && (
        <div className="fixed bottom-24 right-6 z-40 animate-fade-in">
          <div className="bg-card border border-primary/30 rounded-lg px-4 py-2 shadow-[var(--shadow-medium)]">
            <p className="text-xs font-medium text-primary">
              Tap once more to activate
            </p>
          </div>
        </div>
      )}
    </>
  );
}
