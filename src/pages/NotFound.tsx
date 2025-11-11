import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-neon/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[150px] md:text-[200px] font-orbitron font-bold bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">
          Página No Encontrada
        </h2>
        <p className="text-lg text-gray-400 font-poppins mb-8">
          La página que buscas no existe o fue movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-rajdhani font-bold rounded-xl"
          >
            <Home size={20} />
            Volver al Inicio
          </a>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-rajdhani font-bold rounded-xl"
          >
            <ArrowLeft size={20} />
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
