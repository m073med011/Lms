import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Direction = "ltr" | "rtl";

type DirectionContextType = {
  direction: Direction;
  setDirection: (dir: Direction) => void;
};

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export const DirectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<Direction>(i18n.language === "ar" ? "rtl" : "ltr");

  useEffect(() => {
    const newDirection = i18n.language === "ar" ? "rtl" : "ltr";
    setDirection(newDirection);
    document.documentElement.setAttribute("dir", newDirection);
  }, [i18n.language]);

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
};
