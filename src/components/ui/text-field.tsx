import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, error, hint, trailing, id, className, ...props },
    ref,
  ) {
    const inputId = id ?? props.name;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-ink-muted"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : hintId}
            className={cn(
              "field-input",
              trailing ? "pr-12" : undefined,
              className,
            )}
            {...props}
          />
          {trailing ? (
            <div className="absolute inset-y-0 right-1.5 flex items-center">
              {trailing}
            </div>
          ) : null}
        </div>

        {error ? (
          <p id={errorId} className="text-sm text-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-ink-subtle">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
