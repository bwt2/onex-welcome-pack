import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { createRoot } from "react-dom/client";
import { UserController } from "@/contexts/UserContext.tsx";
import { BrowserRouter } from "react-router";
import "@/index.css";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <BrowserRouter>
      <UserController>
        <App />
      </UserController>
    </BrowserRouter>
  </RelayEnvironmentProvider>
);
