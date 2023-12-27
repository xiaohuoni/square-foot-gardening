import { Markdown } from 'alita';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

const base = clsx('px-4 rounded-xl w-fit inline-block');
const variants = cva(base, {
  variants: {
    variant: {
      default: 'bg-blue-500 text-white',
      assistant: 'bg-zinc-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Message = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof variants> & { parse?: boolean }
>(({ className, variant, children, parse = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(variants({ className, variant }))}
      {...props}
    >
      {parse ? <Markdown>{children}</Markdown> : children}
    </div>
  );
});

export { Message };
