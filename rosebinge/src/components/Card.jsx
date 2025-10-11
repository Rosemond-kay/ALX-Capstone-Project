import React from "react";

/**
 * Card component for containing content
 */
export function Card({ children, className = "", onClick, ...props }) {
  const classes = `rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`;

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

/**
 * Card content wrapper
 */
export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Card header wrapper
 */
export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Card title
 */
export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3 className={`font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
}
