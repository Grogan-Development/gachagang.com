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
          "px-4 py-2.5 w-full rounded border-2 border-input bg-background text-foreground font-mono text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)] placeholder:text-muted-foreground",
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
