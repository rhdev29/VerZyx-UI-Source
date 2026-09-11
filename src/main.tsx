import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import Navbar from "./components/layout/Navbar";
import "./styles/style.css"
import "./styles/responsive.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main> 
        <App />
      </main>
    </BrowserRouter>
  </StrictMode>
)
