import React from "react";

/**
 * Badge component for displaying labels and tags
 */
export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center rounded-md px-2.5 py-0.5 transition-colors";

  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border bg-transparent",
    destructive: "bg-destructive text-destructive-foreground",
  };

  const classes = `${baseStyles} ${
    variants[variant] || variants.default
  } ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
