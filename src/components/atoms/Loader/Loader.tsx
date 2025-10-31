import { FC } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  message?: string;
}

export const Loader: FC<LoaderProps> = ({ message = 'Cargando...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e27]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <img
            src="/assets/images/pibelabs-loader-spinner.svg"
            alt="Loading"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-cyan-400 font-rajdhani text-lg md:text-xl font-medium"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
};
