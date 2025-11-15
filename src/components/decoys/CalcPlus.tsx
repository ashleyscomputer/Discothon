import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Delete } from "lucide-react";

interface CalcPlusProps {
  onTriggerPanic?: () => void;
}

export default function CalcPlus({ onTriggerPanic }: CalcPlusProps) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

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

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue !== null && operation && !newNumber) {
      handleEquals();
    } else {
      setPreviousValue(current);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = previousValue + current;
        break;
      case "-":
        result = previousValue - current;
        break;
      case "×":
        result = previousValue * current;
        break;
      case "÷":
        result = current !== 0 ? previousValue / current : 0;
        break;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const buttonClass = "h-16 text-lg font-semibold transition-all active:scale-95";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card px-4 py-4">
        <h1 
          className="text-2xl font-bold text-center"
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
        >
          Calc+
        </h1>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <Card className="mb-4 p-6 bg-secondary/50">
          <div className="text-right">
            {operation && previousValue !== null && (
              <div className="text-sm text-muted-foreground mb-1">
                {previousValue} {operation}
              </div>
            )}
            <div className="text-4xl font-bold break-all">{display}</div>
          </div>
        </Card>

        <div className="grid grid-cols-4 gap-3 flex-1">
          <Button
            variant="secondary"
            onClick={handleClear}
            className={buttonClass}
          >
            AC
          </Button>
          <Button
            variant="secondary"
            onClick={() => setDisplay((parseFloat(display) * -1).toString())}
            className={buttonClass}
          >
            +/-
          </Button>
          <Button
            variant="secondary"
            onClick={() => setDisplay((parseFloat(display) / 100).toString())}
            className={buttonClass}
          >
            %
          </Button>
          <Button
            className={`${buttonClass} bg-primary hover:bg-primary/90`}
            onClick={() => handleOperation("÷")}
          >
            ÷
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleNumber(num.toString())}
              className={buttonClass}
            >
              {num}
            </Button>
          ))}
          <Button
            className={`${buttonClass} bg-primary hover:bg-primary/90`}
            onClick={() => handleOperation("×")}
          >
            ×
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleNumber(num.toString())}
              className={buttonClass}
            >
              {num}
            </Button>
          ))}
          <Button
            className={`${buttonClass} bg-primary hover:bg-primary/90`}
            onClick={() => handleOperation("-")}
          >
            -
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleNumber(num.toString())}
              className={buttonClass}
            >
              {num}
            </Button>
          ))}
          <Button
            className={`${buttonClass} bg-primary hover:bg-primary/90`}
            onClick={() => handleOperation("+")}
          >
            +
          </Button>

          <Button
            variant="outline"
            onClick={() => handleNumber("0")}
            className={`${buttonClass} col-span-2`}
          >
            0
          </Button>
          <Button
            variant="outline"
            onClick={handleDecimal}
            className={buttonClass}
          >
            .
          </Button>
          <Button
            className={`${buttonClass} bg-accent hover:bg-accent/90`}
            onClick={handleEquals}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}
