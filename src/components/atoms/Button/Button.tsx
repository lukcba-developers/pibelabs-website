import { memo } from "react";
import { motion } from "framer-motion";
import type { ButtonProps } from "@/types";

/* ============================================
   Button Component (Atom)
   ============================================ */

const Button = memo<ButtonProps>(
  ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    type = "button",
    className = "",
    onClick,
    ariaLabel,
  }) => {
    // Base styles
    const baseStyles = `
    relative inline-flex items-center justify-center
    font-rajdhani font-semibold
    rounded-lg
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden
  `;

    // Variant styles
    const variantStyles = {
      primary: `
      bg-gradient-to-r from-cyan-neon to-magenta-neon
      text-white
      hover:shadow-glow-cyan
      focus:ring-cyan-neon
      before:absolute before:inset-0
      before:bg-white before:opacity-0
      before:transition-opacity before:duration-300
      hover:before:opacity-10
    `,
      secondary: `
      bg-dark-primary
      text-cyan-neon
      border-2 border-cyan-neon
      hover:bg-cyan-neon hover:text-dark-primary
      focus:ring-cyan-neon
    `,
      outline: `
      bg-transparent
      text-cyan-neon
      border-2 border-cyan-neon
      hover:bg-cyan-neon hover:text-dark-primary
      focus:ring-cyan-neon
    `,
      ghost: `
      bg-transparent
      text-text-primary
      hover:bg-gray-100
      focus:ring-gray-300
    `,
    };

    // Size styles
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <motion.button
        type={type}
        className={combinedClassName}
        disabled={disabled || loading}
        onClick={onClick}
        aria-label={ariaLabel}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Enviando...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export default Button;
