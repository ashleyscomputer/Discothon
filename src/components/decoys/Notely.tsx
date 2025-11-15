import { useState } from "react";
import { Plus, Search, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

interface NotelyProps {
  onTriggerPanic?: () => void;
}

export default function Notely({ onTriggerPanic }: NotelyProps) {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Shopping List", content: "Milk, eggs, bread", timestamp: new Date() },
    { id: "2", title: "Meeting Notes", content: "Discuss Q4 goals", timestamp: new Date() },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
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

  const handleCreateNote = () => {
    if (newTitle.trim() || newContent.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newTitle.trim() || "Untitled",
        content: newContent,
        timestamp: new Date(),
      };
      setNotes([note, ...notes]);
      setNewTitle("");
      setNewContent("");
      setIsCreating(false);
    }
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCreating(false)}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border-0 bg-transparent text-lg font-semibold focus-visible:ring-0"
          />
          <Button onClick={handleCreateNote} size="sm" className="shrink-0">
            Save
          </Button>
        </header>
        <div className="p-4">
          <Textarea
            placeholder="Start typing..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="min-h-[calc(100vh-120px)] border-0 resize-none focus-visible:ring-0 text-base"
          />
        </div>
      </div>
    );
  }

  if (selectedNote) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedNote(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex-1 px-3">{selectedNote.title}</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </header>
        <div className="p-4">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {selectedNote.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 
            className="text-2xl font-bold"
            onTouchStart={handleLongPressStart}
            onTouchEnd={handleLongPressEnd}
            onMouseDown={handleLongPressStart}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
          >
            Notely
          </h1>
          <Button
            size="icon"
            onClick={() => setIsCreating(true)}
            className="rounded-full shadow-[var(--shadow-soft)]"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
          />
        </div>
      </header>

      <main className="p-4 space-y-3">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="p-4 cursor-pointer hover:shadow-[var(--shadow-soft)] transition-shadow"
            onClick={() => setSelectedNote(note)}
          >
            <h3 className="font-semibold mb-1">{note.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {note.content}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {note.timestamp.toLocaleDateString()}
            </p>
          </Card>
        ))}
      </main>
    </div>
  );
}
