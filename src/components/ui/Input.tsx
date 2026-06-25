'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// INPUT COMPONENT
// ============================================

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      id,
      ...props
    }
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const sizeStyles = {
      sm: 'h-8 text-xs px-3',
      md: 'h-11 text-sm px-4',
      lg: 'h-14 text-base px-5',
    };

    const iconSizes = {
      sm: 'left-3',
      md: 'left-4',
      lg: 'left-5',
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
            )}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'flex w-full rounded-xl',
              'bg-white border border-slate-200',
              'text-slate-900 placeholder:text-slate-400',
              'transition-all duration-150',
              sizeStyles[inputSize],
              leftIcon && 'pl-11',
              error
                ? 'border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'hover:border-slate-300 focus:ring-4 focus:ring-blue-500/10',
              props.disabled && 'bg-slate-50 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============================================
// TEXTAREA COMPONENT
// ============================================

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  textareaSize?: 'sm' | 'md' | 'lg';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, hint, textareaSize = 'md', id, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const sizeStyles = {
      sm: 'min-h-[80px] text-sm p-3',
      md: 'min-h-[120px] text-sm p-4',
      lg: 'min-h-[160px] text-base p-5',
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'flex w-full rounded-xl resize-y',
            'bg-white border border-slate-200',
            'text-slate-900 placeholder:text-slate-400',
            sizeStyles[textareaSize],
            error
              ? 'border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'hover:border-slate-300 focus:ring-4 focus:ring-blue-500/10',
            props.disabled && 'bg-slate-50 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============================================
// SELECT COMPONENT
// ============================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  selectSize?: 'sm' | 'md' | 'lg';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, hint, options, placeholder, selectSize = 'md', id, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const sizeStyles = {
      sm: 'h-8 text-xs px-3',
      md: 'h-11 text-sm px-4',
      lg: 'h-14 text-base px-5',
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={inputId}
          className={cn(
            'flex w-full appearance-none bg-no-repeat bg-right-12',
            'bg-white border border-slate-200 rounded-xl',
            'text-slate-900 cursor-pointer',
            sizeStyles[selectSize],
            'transition-all duration-150',
            error
              ? 'border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'hover:border-slate-300 focus:ring-4 focus:ring-blue-500/10',
            props.disabled && 'bg-slate-50 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Input, Textarea, Select };
export type { InputProps, TextareaProps, SelectProps, SelectOption };
