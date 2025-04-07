// src/components/ProtectedRoute.tsx
import { useUser } from "@/context/UserContext";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const userContext = useUser();

  if (!userContext?.user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}