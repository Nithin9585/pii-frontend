"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": theme === "dark" ? "#2A2A2A" : "#FFFFFF", // Dark and light mode bg color
          "--normal-text": theme === "dark" ? "#E0E0E0" : "#333333", // Dark and light mode text color
          "--normal-border": "2px solid #4CAF50", // Green border for all themes
          "--toast-radius": "10px", // Rounded corners
          "--toast-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow
          "--toast-padding": "16px", // Padding inside the toast
          "--toast-transition": "all 0.3s ease-in-out", // Smooth transitions for all properties
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
