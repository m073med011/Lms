import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { DirectionProvider } from "./context/DirectionContext";


import "./i18n"; // Import i18n configuration
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <I18nextProvider i18n={i18n}>
      <DirectionProvider>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
    </DirectionProvider>
    </I18nextProvider>
  </StrictMode>
);
