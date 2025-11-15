import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
}

interface BudgetBuddyProps {
  onTriggerPanic?: () => void;
}

export default function BudgetBuddy({ onTriggerPanic }: BudgetBuddyProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Salary",
      amount: 3000,
      type: "income",
      category: "Work",
      date: new Date(),
    },
    {
      id: "2",
      description: "Groceries",
      amount: 150,
      type: "expense",
      category: "Food",
      date: new Date(),
    },
    {
      id: "3",
      description: "Gas",
      amount: 50,
      type: "expense",
      category: "Transport",
      date: new Date(),
    },
  ]);
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

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const budgetUsed = totalExpenses / totalIncome * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/50 via-background to-background">
      <header className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
        <h1
          className="text-2xl font-bold mb-6"
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
        >
          Budget Buddy
        </h1>

        <div className="space-y-4">
          <Card className="p-5 bg-white/10 backdrop-blur-sm border-white/20 text-primary-foreground">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Current Balance</span>
              <Wallet className="w-4 h-4 opacity-90" />
            </div>
            <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-success/20 backdrop-blur-sm border-success/30 text-primary-foreground">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs opacity-90">Income</span>
              </div>
              <div className="text-xl font-bold">${totalIncome.toFixed(2)}</div>
            </Card>

            <Card className="p-4 bg-destructive/20 backdrop-blur-sm border-destructive/30 text-primary-foreground">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs opacity-90">Expenses</span>
              </div>
              <div className="text-xl font-bold">${totalExpenses.toFixed(2)}</div>
            </Card>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4 -mt-4">
        <Card className="p-4 shadow-[var(--shadow-medium)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Budget Usage</span>
            <span className="text-sm text-muted-foreground">{budgetUsed.toFixed(0)}%</span>
          </div>
          <Progress value={budgetUsed} className="h-2" />
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <Card
              key={transaction.id}
              className="p-4 hover:shadow-[var(--shadow-soft)] transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.category}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.type === "income" ? "text-success" : "text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
