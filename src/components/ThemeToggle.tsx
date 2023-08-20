// https://www.kevinzunigacuellar.com/blog/dark-mode-in-astro/
import { useEffect, useState } from "react";

export default function ThemeToggle({ classes }) {
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    // Fix hydration text mismatch
    // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
    setTheme(localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);

    // Create and send event
    const event = new Event("themeChanged");
    document.dispatchEvent(event);
  }, [theme]);

  return (
    <button
      className={`transition-colors hover:text-indigo-600 focus:text-indigo-600 ${classes}`}
      onClick={handleClick}
    >
      {theme === "light" ? (
        <>
          <span className="sr-only">Enable dark theme</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M7.85 3.015a5 5 0 1 1-4.585 7.712c1.403-.38 3.316-1.302 4.16-3.551c.552-1.474.584-2.938.425-4.16ZM13.456 8a6 6 0 0 0-6.21-5.996a.5.5 0 0 0-.475.592c.23 1.214.28 2.728-.283 4.228c-.8 2.134-2.802 2.84-4.077 3.071a.5.5 0 0 0-.361.71A6 6 0 0 0 13.456 8Z"
            />
          </svg>
        </>
      ) : (
        <>
          <span className="sr-only">Enable light theme</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1Zm0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0-1a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm6.5-1.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1ZM8 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 13ZM2.5 8.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1Zm.646-5.354a.5.5 0 0 1 .708 0l1 1a.5.5 0 1 1-.708.708l-1-1a.5.5 0 0 1 0-.708Zm.708 9.708a.5.5 0 1 1-.708-.707l1-1a.5.5 0 0 1 .708.707l-1 1Zm9-9.708a.5.5 0 0 0-.708 0l-1 1a.5.5 0 0 0 .708.708l1-1a.5.5 0 0 0 0-.708Zm-.708 9.708a.5.5 0 0 0 .708-.707l-1-1a.5.5 0 0 0-.708.707l1 1Z"
            />
          </svg>
        </>
      )}
    </button>
  );
}
