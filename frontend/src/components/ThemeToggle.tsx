import { useTheme } from "../context/Theme.context";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 cursor-pointer left-6 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
