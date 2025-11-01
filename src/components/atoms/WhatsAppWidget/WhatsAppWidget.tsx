import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  position?: 'left' | 'right';
}

const WhatsAppWidget = ({
  phoneNumber = '5491112345678',
  message = '¡Hola! Me gustaría obtener más información sobre sus servicios.',
  position = 'right',
}: WhatsAppWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    analytics.clickCTA('WhatsApp Chat');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const positionClasses = position === 'left' ? 'left-6' : 'right-6';

  return (
    <>
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`fixed bottom-24 ${positionClasses} z-40 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:shadow-[0_0_50px_rgba(37,211,102,0.9)] transition-all flex items-center justify-center group`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="text-white" size={28} />
        
        <motion.span
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className={`fixed bottom-40 ${positionClasses} z-40 bg-white rounded-xl shadow-2xl p-4 max-w-xs`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-rajdhani font-bold text-gray-900 mb-1">
                  ¿Necesitas ayuda?
                </h4>
                <p className="text-sm text-gray-600 font-poppins">
                  Chatea con nosotros en WhatsApp
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppWidget;
