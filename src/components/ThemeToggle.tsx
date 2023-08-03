// https://www.kevinzunigacuellar.com/blog/dark-mode-in-astro/
import { useEffect, useState } from "react";

export default function ThemeToggle({ classes }) {
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  localStorage.getItem("theme");

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
  }, [theme]);

  return (
    <button
      className={`hover:text-indigo-600 focus:text-indigo-600 transition-colors ${classes}`}
      onClick={handleClick}
    >
      {theme === "light" ? (
        <>
          <span className="sr-only">Enable dark theme</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 2h8v2h-2v2h-2V4H6V2ZM4 6V4h2v2H4Zm0 10H2V6h2v10Zm2 2H4v-2h2v2Zm2 2H6v-2h2v2Zm10 0v2H8v-2h10Zm2-2v2h-2v-2h2Zm-2-4v-2h2v-2h2v8h-2v-4h-2Zm-6 0h6v2h-6v-2Zm-2-2h2v2h-2v-2Zm0 0V6H8v6h2Zm8-10h2v2h2v2h-2v2h-2V6h-2V4h2V2Z"
            />
          </svg>
        </>
      ) : (
        <>
          <span className="sr-only">Enable light theme</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13 0h-2v4h2V0ZM0 11v2h4v-2H0Zm24 0v2h-4v-2h4ZM13 24h-2v-4h2v4ZM8 6h8v2H8V6ZM6 8h2v8H6V8Zm2 10v-2h8v2H8Zm10-2h-2V8h2v8Zm2-14h2v2h-2V2Zm0 2v2h-2V4h2Zm2 18h-2v-2h2v2Zm-2-2h-2v-2h2v2ZM4 2H2v2h2v2h2V4H4V2ZM2 22h2v-2h2v-2H4v2H2v2Z"
            />
          </svg>
        </>
      )}
    </button>
  );
}
