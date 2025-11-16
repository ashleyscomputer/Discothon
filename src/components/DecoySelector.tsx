// 1. Import useNavigate
import { useNavigate } from "react-router-dom";
import {
  Shield,
  FileText,
  Calculator,
  ListTodo,
  DollarSign,
  Timer,
  AlertTriangle,
  BarChart3,
  HandHeart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "./NavBar";

interface DecoyOption {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>; // FIXED TYPE
  description: string;
  vibe: string;
  color: string;
}

const decoyOptions: DecoyOption[] = [
  {
    id: "notely",
    name: "Notely",
    icon: FileText,
    description: "Looks like a normal notes app for quick thoughts and lists.",
    vibe: "Perfect if you already live in your notes.",
    color: "from-sky-500/15 via-sky-500/5 to-sky-300/10",
  },
  {
    id: "calc",
    name: "Calc+",
    icon: Calculator,
    description: "Clean calculator for “I’m just doing my budget” energy.",
    vibe: "Great decoy for students or anyone who hates mental math.",
    color: "from-emerald-500/15 via-emerald-500/5 to-emerald-300/10",
  },
  {
    id: "lists",
    name: "Pocket Lists",
    icon: ListTodo,
    description: "Task & checklist style app for errands, chores and reminders.",
    vibe: "Blends in with productivity and study apps.",
    color: "from-amber-500/15 via-amber-500/5 to-amber-300/10",
  },
  {
    id: "budget",
    name: "Budget Buddy",
    icon: DollarSign,
    description: "Simple money tracker for expenses and goals.",
    vibe: "Looks like a finance/planning tool, not a panic button.",
    color: "from-teal-500/15 via-teal-500/5 to-teal-300/10",
  },
  {
    id: "timer",
    name: "Study Timer",
    icon: Timer,
    description: "Focus / pomodoro timer for study sessions and gym sets.",
    vibe: "Perfect for campus, libraries and shared spaces.",
    color: "from-purple-500/15 via-purple-500/5 to-purple-300/10",
  },
];

const decoyPaths: { [key: string]: string } = {
  notely: "/decoy/notely",
  calc: "/decoy/calcplus",
  lists: "/decoy/pocketlists",
  budget: "/decoy/budgetbuddy",
  timer: "/decoy/studytimer",
};

export default function DecoySelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">

        {/* Hero */}
        <header className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-1 text-xs font-medium text-slate-300 shadow-sm backdrop-blur">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500">
                <Shield className="h-3.5 w-3.5 text-white" />
              </span>
              <span>Stealth safety mode • Built for real South African contexts</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
                SheShield
              </span>{" "}
              looks ordinary on your phone.
            </h1>

            <p className="text-base sm:text-lg text-slate-300">
              Choose how SheShield should appear on your home screen. It will behave like a normal everyday app,
              while quietly carrying a hidden safety layer that only you know how to activate.
            </p>
          </div>

          <Card className="w-full max-w-md border-slate-700/80 bg-slate-900/80 p-5 lg:p-6 shadow-lg shadow-rose-500/10 backdrop-blur">
            <h2 className="mb-3 text-sm font-semibold text-slate-200 uppercase tracking-[0.15em]">
              How the disguise works
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-rose-300">1. Pick the “face” you want.</span>{" "}
                Notes, calculator, lists, budget or timer. That is what anyone looking at your phone will see.
              </p>
              <p>
                <span className="font-semibold text-rose-300">2. SheShield behaves like a real tool.</span>{" "}
                You can genuinely use it for notes, tasks or calculations so it never feels suspicious or fake.
              </p>
              <p>
                <span className="font-semibold text-rose-300">3. Safety is hidden behind subtle triggers.</span>{" "}
                A specific long-press, pattern or safe word silently arms the panic flow without changing what is
                visible on screen.
              </p>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Nothing here says “panic button” or “GBV app” on the surface. That language only exists in the secure
              setup and documentation, not on the survivor&apos;s screen.
            </p>
          </Card>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* 1) SOUTH AFRICAN STATS SECTION */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            The Reality We Face in South Africa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-rose-500/30 bg-rose-500/10 p-6 text-center">
              <AlertTriangle className="mx-auto h-10 w-10 text-rose-300 mb-3" />
              <h3 className="text-4xl font-bold text-white mb-2">10,516</h3>
              <p className="text-rose-100">Women reported raped in just 3 months (Q2 2023/24).</p>
            </Card>

            <Card className="border-rose-500/30 bg-rose-500/10 p-6 text-center">
              <BarChart3 className="mx-auto h-10 w-10 text-rose-300 mb-3" />
              <h3 className="text-4xl font-bold text-white mb-2">5x</h3>
              <p className="text-rose-100">
                South Africa's femicide rate is five times the global average.
              </p>
            </Card>

            <Card className="border-rose-500/30 bg-rose-500/10 p-6 text-center">
              <HandHeart className="mx-auto h-10 w-10 text-rose-300 mb-3" />
              <h3 className="text-4xl font-bold text-white mb-2">1 in 3</h3>
              <p className="text-rose-100">
                Women in SA have experienced physical or sexual violence in their lifetime.
              </p>
            </Card>
          </div>

          <p className="text-center text-sm text-slate-400 mt-4">
            *Stats based on SAPS Q2 2023/24 and HSRC 2024 reports.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2) WALL OF REMEMBRANCE */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-3">In Remembrance. In Resolve.</h2>
            <p className="text-slate-300 mb-6">
              We honour the lives lost to gender-based violence. Each name is a reminder of why we must act.
              This is a static memorial inspired by the vital work of pages like{" "}
              <span className="font-semibold text-rose-300">womanforchangesa</span>.
            </p>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {[ 
              { name: "Uyinene Mrwetyana", img: "400x400/94a3b8/e2e8f0?text=In+Memoriam", text: "A life of potential, stolen." },
              { name: "Tshegofatso Pule", img: "400x400/94a3b8/e2e8f0?text=In+Memoriam", text: "Remembered for her light." },
              { name: "Karabo Mokoena", img: "400x400/94a3b8/e2e8f0?text=In+Memoriam", text: "Her story sparked a movement." },
              { name: "Nosicelo Mtebeni", img: "400x400/94a3b8/e2e8f0?text=In+Memoriam", text: "A promising future cut short." },
              { name: "Jesse Hess", img: "400x400/94a3b8/e2e8f0?text=In+Memoriam", text: "A voice silenced too soon." },
            ].map((person) => (
              <Card
                key={person.name}
                className="flex-shrink-0 w-64 border-slate-700/80 bg-slate-900/80 shadow-lg backdrop-blur"
              >
                <img
                  src={`images/${person.img}`}
                  alt={`A memorial for ${person.name}`}
                  className="w-full h-56 object-cover rounded-t-lg"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.src =
                      "https://placehold.co/400x400/94a3b8/e2e8f0?text=In+Memoriam";
                  }}
                />
                <div className="p-4">
                  <h4 className="font-semibold text-white">{person.name}</h4>
                  <p className="text-sm text-slate-300">{person.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Decoy Options (unchanged) */}
        {/* ---------------------------------------------------------------- */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.1fr)] items-start">
          <div className="grid gap-5 sm:grid-cols-2">
            {decoyOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => navigate(decoyPaths[option.id])}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-950/95 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-rose-500/80 hover:shadow-xl hover:shadow-rose-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${option.color}`}
                    >
                      <Icon className="h-5 w-5 text-slate-50" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-50">{option.name}</h3>
                        <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300">
                          Safe disguise
                        </span>
                      </div>

                      <p className="text-xs text-slate-300/90">{option.description}</p>
                      <p className="text-[11px] text-slate-400">{option.vibe}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Tap to continue setup using this appearance.
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-3 text-xs border-slate-700/80 bg-slate-900/80 text-slate-100 group-hover:border-rose-400/80 group-hover:text-rose-100"
                    >
                      Use this look
                    </Button>
                  </div>

                  <span className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent opacity-0 group-hover:opacity-100" />
                </button>
              );
            })}
          </div>

          <Card className="border-slate-800/80 bg-slate-950/90 p-5 lg:p-6 backdrop-blur">
            <h2 className="mb-3 text-sm font-semibold text-slate-200 uppercase tracking-[0.16em]">
              Choose your disguise, not your danger
            </h2>
            <p className="mb-4 text-sm text-slate-300">
              This screen is intentionally calm and neutral. It talks about tools, productivity and money, not panic
              or violence.
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-rose-300">Future-proof.</span> New decoys can be added without changing
                  the safety logic behind the scenes.
                </span>
              </li>
            </ul>
          </Card>
        </section>

        <p className="mt-8 text-center text-[11px] text-slate-500 max-w-xl mx-auto">
          In a real deployment, this screen appears only once during setup.
        </p>
      </div>
    </div>
  );
}
