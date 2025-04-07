import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 py-3 bg-slate-700 text-white shadow-md border-0 border-slate-400">
      <h1 className="h-9 px-4 text-xl font-semibold flex items-center">Onex</h1>
      <Button variant="ghost" className="text-xl font-semibold text-white">
        Log Out
      </Button>
    </header>
  );
}