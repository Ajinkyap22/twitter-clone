import React, { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {
    console.log(theme);
  },
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const [theme, setTheme] = useState("light-theme");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
