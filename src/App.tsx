import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORT YOUR PAGES AND DECOYS
import DecoySelector from "@/components/DecoySelector";
import Notely from "@/components/decoys/Notely";
import CalcPlus from "@/components/decoys/CalcPlus";
import BudgetBuddy from "@/components/decoys/BudgetBuddy";
import PocketLists from "@/components/decoys/PocketLists";
import StudyTimer from "@/components/decoys/StudyTimer";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Use DecoySelector for the home page */}
          <Route path="/" element={<DecoySelector />} />

          {/* Add a specific route for each decoy */}
          <Route path="/decoy/notely" element={<Notely />} />
          <Route path="/decoy/calcplus" element={<CalcPlus />} />
          <Route path="/decoy/budgetbuddy" element={<BudgetBuddy />} />
          <Route path="/decoy/pocketlists" element={<PocketLists />} />
          <Route path="/decoy/studytimer" element={<StudyTimer />} />
          
          {/* Your original catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;