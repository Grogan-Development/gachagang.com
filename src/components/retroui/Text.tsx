import { ElementType, HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    as: {
      p: "font-sans text-base leading-relaxed",
      li: "font-sans text-base",
      a: "font-sans text-base hover:text-primary transition-colors underline-offset-4 hover:underline",
      span: "font-sans text-base",
      h1: "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase",
      h2: "font-display text-3xl md:text-4xl font-bold tracking-tight uppercase",
      h3: "font-display text-2xl font-semibold tracking-tight",
      h4: "font-display text-xl font-semibold tracking-tight",
      h5: "font-display text-lg font-medium",
      h6: "font-display text-base font-medium uppercase tracking-wide",
    },
  },
  defaultVariants: {
    as: "p",
  },
});

interface TextProps
  extends Omit<HTMLAttributes<HTMLElement>, "className">,
    VariantProps<typeof textVariants> {
  className?: string;
}

export const Text = (props: TextProps) => {
  const { className, as, ...otherProps } = props;
  const Tag: ElementType = as || "p";

  return (
    <Tag className={cn(textVariants({ as }), className)} {...otherProps} />
  );
};
