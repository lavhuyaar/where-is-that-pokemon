import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Flip, ToastContainer } from "react-toastify";
import "./global.css";
import { MarkerProvider } from "./context/MarkerContext";
import { PokemonOptionsProvider } from "./context/PokemonOptionsContext";
import { TimeContextProvider } from "./context/TimerContext";
import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonOptionsProvider>
      <MarkerProvider>
        <BrowserRouter>
          <TimeContextProvider>
            <AppRoutes />
            <ToastContainer
              autoClose={1000}
              hideProgressBar
              theme="dark"
              transition={Flip}
              position="top-center"
            />
          </TimeContextProvider>
        </BrowserRouter>
      </MarkerProvider>
    </PokemonOptionsProvider>
  </StrictMode>
);
