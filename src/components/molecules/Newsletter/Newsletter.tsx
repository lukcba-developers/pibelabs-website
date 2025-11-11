import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor ingresa tu email");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success("¡Gracias por suscribirte! 🎉");
      setEmail("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-cyan-neon/10 to-magenta-neon/10 rounded-xl p-8 border border-cyan-neon/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-cyan-neon/20 rounded-lg">
          <Mail className="w-6 h-6 text-cyan-neon" />
        </div>
        <div>
          <h3 className="text-xl font-orbitron font-bold text-white mb-2">
            Newsletter Tech
          </h3>
          <p className="text-gray-300 text-sm">
            Recibe tips, recursos y novedades sobre desarrollo y tecnología
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-4 py-3 bg-dark-primary border-2 border-gray-700 focus:border-cyan-neon rounded-lg text-white placeholder:text-gray-500 font-poppins transition-all outline-none focus:ring-4 focus:ring-cyan-neon/20"
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-rajdhani font-bold rounded-lg shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          {isLoading ? "Enviando..." : "Suscribirme"}
          <ArrowRight size={18} />
        </motion.button>
      </form>

      <p className="text-xs text-gray-400 mt-3">
        📬 Sin spam. Cancela cuando quieras.
      </p>
    </motion.div>
  );
};

export default Newsletter;
