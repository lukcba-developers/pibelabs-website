import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tiempo toma desarrollar un proyecto?',
    answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Un MVP típico puede tomar de 4 a 8 semanas, mientras que proyectos más complejos pueden requerir 3-6 meses. Trabajamos con metodologías ágiles para entregas incrementales.',
  },
  {
    question: '¿Qué tecnologías utilizan?',
    answer: 'Utilizamos tecnologías modernas y probadas: React, TypeScript, Node.js, Python, AWS, y más. Seleccionamos el stack tecnológico según las necesidades específicas de cada proyecto.',
  },
  {
    question: '¿Ofrecen soporte post-lanzamiento?',
    answer: 'Sí, ofrecemos planes de mantenimiento y soporte continuo. Incluyen actualizaciones, corrección de bugs, monitoreo de performance, y mejoras incrementales según tus necesidades.',
  },
  {
    question: '¿Trabajan con startups?',
    answer: 'Absolutamente. Tenemos experiencia ayudando a startups a construir sus MVPs y escalar sus productos. Ofrecemos modelos de pricing flexibles adaptados a las necesidades de startups.',
  },
  {
    question: '¿Cómo es el proceso de trabajo?',
    answer: 'Seguimos metodología Agile con sprints de 2 semanas. Incluye reuniones de planificación, dailies, demos, y retrospectivas. Mantenemos comunicación constante y transparencia total del progreso.',
  },
  {
    question: '¿Qué diferencia a PibeLabs?',
    answer: 'Nos enfocamos en resultados medibles, no solo en entregar código. Combinamos expertise técnico con visión de negocio, y trabajamos como parte de tu equipo. Además, garantizamos calidad enterprise con código limpio y bien documentado.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-neon rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-magenta-neon rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-400 font-poppins max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-primary border border-cyan-neon/20 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg md:text-xl font-rajdhani font-bold text-white pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {activeIndex === index ? (
                    <Minus className="text-cyan-neon" size={24} />
                  ) : (
                    <Plus className="text-cyan-neon" size={24} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-300 font-poppins leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 font-poppins mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-rajdhani font-bold rounded-xl transition-all"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
