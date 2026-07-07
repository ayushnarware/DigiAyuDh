import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/70',
        outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/70',
        danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
        dangerOutline: 'border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950',
        success: 'bg-green-600 text-white shadow-sm hover:bg-green-700 active:bg-green-800',
        warning: 'bg-amber-600 text-white shadow-sm hover:bg-amber-700 active:bg-amber-800',
        link: 'text-primary underline-offset-4 hover:underline',
        brand: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:from-violet-500 hover:to-purple-500',
        disabled: 'bg-muted text-muted-foreground cursor-not-allowed opacity-50',
      },
      size: {
        xs: 'h-8 px-2 text-xs',
        sm: 'h-9 px-3 text-xs',
        default: 'h-10 px-4 py-2 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
        iconSm: 'h-8 w-8',
        iconLg: 'h-12 w-12',
      },
      isLoading: {
        true: 'pointer-events-none opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      isLoading: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  isPermissionDisabled?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    isLoading = false,
    isPermissionDisabled = false,
    loadingText,
    icon,
    iconPosition = 'left',
    disabled,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading || isPermissionDisabled;
    const buttonVariant = isPermissionDisabled ? 'disabled' : variant;

    return (
      <Comp
        className={cn(buttonVariants({ variant: buttonVariant, size, isLoading, className }))}
        ref={ref}
        disabled={isDisabled}
        title={isPermissionDisabled ? 'You do not have permission to perform this action' : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText || children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
