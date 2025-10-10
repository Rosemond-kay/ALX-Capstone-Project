import React from "react";

/**
 * Button component with multiple variants and sizes
 */
export function Button({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-border bg-transparent hover:bg-muted",
    ghost: "hover:bg-muted hover:text-foreground",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-10 w-10",
  };

  const classes = `${baseStyles} ${variants[variant] || variants.default} ${
    sizes[size] || sizes.default
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
