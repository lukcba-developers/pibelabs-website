import { motion } from "framer-motion";
import { ReactNode } from "react";

/* ============================================
   Card Component (Molecule) - Enhanced Hierarchy
   ============================================ */

interface CardProps {
  children: ReactNode;
  variant?: "default" | "featured" | "ghost";
  hover?: boolean;
  className?: string;
}

const Card = ({
  children,
  variant = "default",
  hover = true,
  className = "",
}: CardProps) => {
  const variants = {
    default: "bg-dark-secondary border-2 border-gray-700 hover:border-gray-600",
    featured:
      "bg-dark-secondary border-2 border-cyan-neon shadow-[0_0_20px_rgba(0,217,255,0.4)]",
    ghost: "bg-dark-secondary/50 border border-gray-800 hover:border-gray-700",
  };

  const hoverClass = hover
    ? "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] hover:border-cyan-bright hover:z-10"
    : "";

  return (
    <motion.div
      className={`
        ${variants[variant]}
        rounded-xl p-6 transition-all duration-300
        ${hoverClass}
        ${className}
      `}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
