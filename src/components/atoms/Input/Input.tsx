import { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { InputProps } from '@/types';

/* ============================================
   Input Component (Atom)
   ============================================ */

const Input = memo(
  forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    (
      {
        type = 'text',
        name,
        placeholder,
        value,
        defaultValue,
        disabled = false,
        required = false,
        error,
        label,
        className = '',
        onChange,
        onBlur,
      },
      ref
    ) => {
      const isTextarea = type === 'textarea';

      // Base styles
      const baseStyles = `
        w-full px-4 py-3
        bg-white border-2 rounded-lg
        font-poppins text-base
        transition-all duration-300
        placeholder:text-text-tertiary
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
      `;

      // Error/Normal state styles
      const stateStyles = error
        ? `
          border-red-500
          focus:border-red-500
          focus:ring-red-500
        `
        : `
          border-gray-300
          focus:border-cyan-neon
          focus:ring-cyan-neon
          hover:border-gray-400
        `;

      const combinedClassName = `
        ${baseStyles}
        ${stateStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ');

      const inputId = `input-${name}`;

      return (
        <div className="w-full">
          {label && (
            <label
              htmlFor={inputId}
              className="block mb-2 font-rajdhani font-medium text-text-primary"
            >
              {label}
              {required && <span className="text-magenta-neon ml-1">*</span>}
            </label>
          )}

          {isTextarea ? (
            <motion.textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              name={name}
              placeholder={placeholder}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              required={required}
              className={`${combinedClassName} min-h-[120px] resize-y`}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!error}
              aria-describedby={error ? `${inputId}-error` : undefined}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              id={inputId}
              name={name}
              placeholder={placeholder}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              required={required}
              className={combinedClassName}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!error}
              aria-describedby={error ? `${inputId}-error` : undefined}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {error && (
            <motion.p
              id={`${inputId}-error`}
              className="mt-2 text-sm text-red-500 font-poppins"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export default Input;
