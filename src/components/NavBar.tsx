// src/components/NavBar.tsx
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/80 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500">
              <Shield className="h-4 w-4 text-white" />
            </span>
            <span className="font-bold text-lg text-slate-50">SheShield</span>
          </Link>

          
        </div>
      </div>
    </nav>
  );
}