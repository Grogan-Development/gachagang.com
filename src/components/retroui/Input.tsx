import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", placeholder = "Enter text", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={cn(
          "px-4 py-2 w-full rounded border-2 border-black shadow-md transition focus:outline-none focus:shadow-sm bg-background text-foreground",
          props["aria-invalid"] &&
            "border-destructive text-destructive shadow-sm shadow-destructive",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
