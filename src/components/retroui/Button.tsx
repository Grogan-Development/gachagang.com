import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-display font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,56,100,0.4)] active:translate-y-0.5",
        destructive:
          "bg-destructive text-white border-2 border-destructive hover:bg-destructive/90 active:translate-y-0.5",
        outline:
          "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background active:translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/90 active:translate-y-0.5",
        ghost:
          "hover:bg-muted hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        retro:
          "bg-background text-foreground border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-[2px_2px_0_0_var(--foreground)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1",
        "retro-pink":
          "bg-background text-primary border-2 border-primary shadow-[4px_4px_0_0_var(--primary)] hover:shadow-[2px_2px_0_0_var(--primary)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
