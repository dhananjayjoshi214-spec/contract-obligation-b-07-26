/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        sidebar: "hsl(var(--sidebar))",
        "sidebar-foreground": "hsl(var(--sidebar-foreground))",
        "sidebar-muted": "hsl(var(--sidebar-muted))",
        "sidebar-hover": "hsl(var(--sidebar-hover))",
        "sidebar-border": "hsl(var(--sidebar-border))",
        "success-bg": "hsl(var(--success-bg))",
        "success-text": "hsl(var(--success-text))",
        "success-border": "hsl(var(--success-border))",
        "warning-bg": "hsl(var(--warning-bg))",
        "warning-text": "hsl(var(--warning-text))",
        "warning-border": "hsl(var(--warning-border))",
        "info-bg": "hsl(var(--info-bg))",
        "info-text": "hsl(var(--info-text))",
        "info-border": "hsl(var(--info-border))",
      },
    },
  },
  plugins: [],
};
