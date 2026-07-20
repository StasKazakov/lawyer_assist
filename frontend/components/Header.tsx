import { Scale } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <Scale className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-3xl font-semibold tracking-tight text-foreground">
          Копійочка AI-асистент
        </span>
      </header>
  )
}

export default Header