import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import RouteMeta from "./components/General/RouteMeta";
import ScrollManager from "./components/General/ScrollManager";
import ToastViewport from "./components/General/ToastViewport";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <RouteMeta />
      <App />
      <ToastViewport />
    </BrowserRouter>
  </StrictMode>
);