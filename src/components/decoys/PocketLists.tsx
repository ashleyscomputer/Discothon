import { useState } from "react";
import { Plus, Search, Trash2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GuardianWidget } from "../GuardianWidget";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  list: string;
}

export default function PocketLists() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", text: "Buy groceries", completed: false, list: "Personal" },
    { id: "2", text: "Call dentist", completed: true, list: "Personal" },
    { id: "3", text: "Finish report", completed: false, list: "Work" },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
          list: "Personal",
        },
        ...todos,
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-4 py-4">
        <h1 className="text-2xl font-bold mb-3">Pocket Lists</h1>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-10" />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <Card className="p-4 border-primary/20 bg-secondary/30">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              className="flex-1"
            />
            <Button onClick={addTodo} size="icon" className="shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <div className="space-y-2">
          {todos.map((todo, index) => (
            <Card
              key={todo.id}
              className="group hover:shadow-[var(--shadow-soft)] transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 p-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="shrink-0"
                />

                <span
                  className={`flex-1 transition-all ${
                    todo.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {todo.text}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12">
            <Circle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No tasks yet. Add one above!
            </p>
          </div>
        )}
      </main>

      <GuardianWidget />
    </div>
  );
}
