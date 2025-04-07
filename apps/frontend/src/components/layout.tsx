import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-900">
      {children}
    </div>
  );
}