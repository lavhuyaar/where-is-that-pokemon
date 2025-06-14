import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./global.css";
import AppRoutes from "./routes/AppRoutes";
import { MarkerProvider } from "./context/MarkerContext";
import { PokemonOptionsProvider } from "./context/PokemonOptionsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonOptionsProvider>
      <MarkerProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MarkerProvider>
    </PokemonOptionsProvider>
  </StrictMode>
);
