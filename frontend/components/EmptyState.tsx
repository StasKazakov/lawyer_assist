import { Scale } from "lucide-react";
import Composer from "@/components/Composer";
import type { RefObject } from "react";

type EmptyStateProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export function EmptyState(props: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
            <Scale className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Чим я можу допомогти?
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Пошук та аналіз законодавства й судової практики
          </p>
        </div>

        <Composer {...props} />
      </div>
    </div>
  );
}