"use client";

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        borderRadius: "var(--radius-pill)",
        backgroundColor: "var(--color-surface)",
        transition: "var(--transition)"
      }}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <i className="ph-fill ph-moon" style={{ fontSize: "1.25rem" }}></i>
      ) : (
        <i className="ph-fill ph-sun" style={{ fontSize: "1.25rem", color: "#F5A623" }}></i>
      )}
    </button>
  );
}
