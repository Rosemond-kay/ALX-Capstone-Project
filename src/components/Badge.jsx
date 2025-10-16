import React from "react";

/**
 * Badge component for displaying labels and tags
 */
export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium transition-colors";

  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-900",
    outline: "border border-gray-300 bg-transparent text-gray-800",
    destructive: "bg-red-600 text-white",
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
