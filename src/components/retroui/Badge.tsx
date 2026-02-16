import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const badgeVariants = cva("font-display font-semibold rounded tracking-wide inline-flex items-center", {
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground border border-border",
      outline: "border-2 border-foreground text-foreground bg-transparent",
      solid: "bg-foreground text-background border-2 border-foreground",
      primary: "bg-primary text-primary-foreground border-2 border-primary",
      neon: "bg-accent text-accent-foreground border-2 border-accent shadow-[0_0_10px_rgba(255,215,0,0.5)]",
      "neon-pink": "bg-primary/20 text-primary border-2 border-primary shadow-[0_0_10px_rgba(255,56,100,0.3)]",
      destructive: "bg-destructive text-white border-2 border-destructive",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  children,
  size = "md",
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
