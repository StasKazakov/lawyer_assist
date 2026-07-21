"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import { RefObject } from "react";

type ComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export default function Composer({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  isLoading,
  textareaRef,
}: ComposerProps) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm transition-colors focus-within:border-primary/50">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Опишіть ситуацію, вкажіть номер справи або статтю закону..."
          rows={1}
          className="max-h-40 min-h-[44px] text-foreground placeholder:text-muted-foreground flex-1 resize-none border-0 bg-transparent px-2 py-2.5 text-[15px] shadow-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !value.trim()}
          className="h-9 w-9 shrink-0 cursor-pointer rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="mt-2 text-red-500 font-bold text-center text-ml text-muted-foreground">
        Тестова версія формує відповіді на основі 1000 судових справ
      </p>
    </form>
  );
}