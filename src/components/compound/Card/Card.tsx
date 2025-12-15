import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import type { BaseComponentProps } from "@/types";

interface CardContextType {
  variant: "default" | "glass" | "gradient";
  hoverable: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card compound components must be used within Card");
  }
  return context;
};

interface CardProps extends BaseComponentProps {
  variant?: "default" | "glass" | "gradient";
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  variant = "default",
  hoverable = false,
  onClick,
  className = "",
}: CardProps) => {
  const baseClasses = "rounded-xl overflow-hidden transition-all duration-300";
  const variantClasses = {
    default: "bg-dark-secondary border border-cyan-neon/20",
    glass: "bg-dark-secondary/40 backdrop-blur-md border border-cyan-neon/10",
    gradient:
      "bg-gradient-to-br from-cyan-neon/10 to-magenta-neon/10 border border-cyan-neon/20",
  };
  const hoverClasses = hoverable
    ? "hover:border-cyan-neon/50 hover:shadow-glow-cyan"
    : "";

  return (
    <CardContext.Provider value={{ variant, hoverable }}>
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
        onClick={onClick}
        whileHover={hoverable ? { y: -4 } : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    </CardContext.Provider>
  );
};

Card.Header = ({ children, className = "" }: BaseComponentProps) => (
  <div className={`px-6 py-4 border-b border-cyan-neon/10 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = "" }: BaseComponentProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }: BaseComponentProps) => (
  <div
    className={`px-6 py-4 border-t border-cyan-neon/10 flex justify-end gap-3 ${className}`}
  >
    {children}
  </div>
);

export default Card;
