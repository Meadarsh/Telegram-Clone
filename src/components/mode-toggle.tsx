import { useTheme } from "@/components/theme-provider";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode, setTheme]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Switch checked={isDarkMode} onCheckedChange={handleToggle} />
  );
}
