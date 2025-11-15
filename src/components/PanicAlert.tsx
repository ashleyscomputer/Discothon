import { useState, useEffect } from "react";
import { Shield, MapPin, Camera, Users, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PanicAlertProps {
  onCancel: () => void;
  onReturnToDecoy: () => void;
}

export default function PanicAlert({ onCancel, onReturnToDecoy }: PanicAlertProps) {
  const [countdown, setCountdown] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState("Acquiring location...");

  useEffect(() => {
    if (countdown > 0 && !isActive) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isActive) {
      activateAlert();
    }
  }, [countdown, isActive]);

  useEffect(() => {
    // Simulate location acquisition
    setTimeout(() => {
      setLocation("123 Main St, City, State");
    }, 2000);
  }, []);

  const activateAlert = () => {
    setIsActive(true);
    // Here we would trigger actual alert mechanisms
  };

  const handleCancel = () => {
    onCancel();
  };

  if (isActive) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <div className="bg-gradient-to-br from-success/20 to-success/10 border-b border-success/30 px-4 py-3 flex items-center justify-between backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse shadow-[0_0_12px_hsl(var(--success))]" />
            <span className="text-sm font-medium text-success">Alert Active</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReturnToDecoy}
            className="text-xs hover:bg-success/10"
          >
            Return to Cover
          </Button>
        </div>

        <div className="p-4 space-y-4 max-w-2xl mx-auto">
          <Card className="p-6 border-success/30 bg-gradient-to-br from-success/10 to-success/5 shadow-[var(--shadow-medium)] animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 rounded-xl bg-success/20 shrink-0 shadow-[0_0_20px_hsl(var(--success)/0.3)]">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-success mb-2 text-lg">Alert Sent Successfully</h3>
                <p className="text-sm text-muted-foreground">
                  Your trusted contacts have been notified and are tracking your location in real-time.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Current Location</h4>
                <p className="text-sm text-muted-foreground mb-3">{location}</p>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Updates every 30 seconds</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-success font-medium">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              Notified Contacts
            </h4>
            <div className="space-y-2">
              {["Emergency Contact 1", "Emergency Contact 2", "Local Authorities"].map((contact, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-sm font-medium">{contact}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs text-success font-medium">Notified</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              Evidence Vault
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="w-full justify-start gap-2 h-12 hover:bg-secondary/50 transition-colors">
                <Camera className="w-5 h-5" />
                Capture Photo
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-12 hover:bg-secondary/50 transition-colors">
                <Camera className="w-5 h-5" />
                Record Audio
              </Button>
            </div>
          </Card>

          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive h-12 font-medium"
            onClick={handleCancel}
          >
            Cancel Alert
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/20 via-destructive/15 to-destructive/10 flex items-center justify-center p-6 animate-fade-in">
      <Card className="w-full max-w-md p-8 text-center space-y-6 border-destructive/30 shadow-[var(--shadow-strong)] bg-card/95 backdrop-blur-sm animate-scale-in">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center shadow-[var(--shadow-medium)]">
            <AlertTriangle className="w-12 h-12 text-destructive animate-pulse" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3">Emergency Alert</h2>
          <p className="text-muted-foreground text-sm">
            Alert will be sent to your trusted contacts in
          </p>
        </div>

        <div className="space-y-4 py-2">
          <div className="text-7xl font-bold text-destructive tabular-nums tracking-tight">{countdown}</div>
          <div className="px-4">
            <Progress value={(10 - countdown) * 10} className="h-3 shadow-inner" />
          </div>
          <p className="text-xs text-muted-foreground">seconds remaining</p>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 font-semibold text-base border-2 hover:bg-secondary"
            onClick={handleCancel}
          >
            Cancel Alert
          </Button>
          <p className="text-xs text-muted-foreground px-4">
            Press cancel within {countdown} seconds to abort the emergency alert
          </p>
        </div>
      </Card>
    </div>
  );
}
