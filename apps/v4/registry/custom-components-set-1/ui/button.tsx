import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

export function Button({
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <button
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  )
}
