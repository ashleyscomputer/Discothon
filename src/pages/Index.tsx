import { useState } from "react";
import DecoySelector from "@/components/DecoySelector";
import Notely from "@/components/decoys/Notely";
import CalcPlus from "@/components/decoys/CalcPlus";
import PocketLists from "@/components/decoys/PocketLists";
import BudgetBuddy from "@/components/decoys/BudgetBuddy";
import StudyTimer from "@/components/decoys/StudyTimer";
import PanicAlert from "@/components/PanicAlert";
import PanicButton from "@/components/PanicButton";

export default function Index() {
  const [selectedDecoy, setSelectedDecoy] = useState<string | null>(null);
  const [panicActive, setPanicActive] = useState(false);

  const handleSelectDecoy = (decoyId: string) => {
    setSelectedDecoy(decoyId);
  };

  const handleTriggerPanic = () => {
    setPanicActive(true);
  };

  const handleCancelPanic = () => {
    setPanicActive(false);
  };

  const handleReturnToDecoy = () => {
    setPanicActive(false);
  };

  if (panicActive) {
    return (
      <PanicAlert
        onCancel={handleCancelPanic}
        onReturnToDecoy={handleReturnToDecoy}
      />
    );
  }

  if (!selectedDecoy) {
    return <DecoySelector onSelectDecoy={handleSelectDecoy} />;
  }

  const renderDecoy = () => {
    switch (selectedDecoy) {
      case "notely":
        return <Notely onTriggerPanic={handleTriggerPanic} />;
      case "calc":
        return <CalcPlus onTriggerPanic={handleTriggerPanic} />;
      case "lists":
        return <PocketLists onTriggerPanic={handleTriggerPanic} />;
      case "budget":
        return <BudgetBuddy onTriggerPanic={handleTriggerPanic} />;
      case "timer":
        return <StudyTimer onTriggerPanic={handleTriggerPanic} />;
      default:
        return <DecoySelector onSelectDecoy={handleSelectDecoy} />;
    }
  };

  return (
    <>
      {renderDecoy()}
      <PanicButton onTrigger={handleTriggerPanic} />
    </>
  );
}
