import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    role: 'CEO',
    company: 'TechStartup',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    text: 'PibeLabs transformó nuestra visión en un producto increíble. Su expertise técnico y compromiso superaron nuestras expectativas.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'CTO',
    company: 'InnovateCorp',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    text: 'Profesionalismo de primera clase. Cumplieron con todos los deadlines y la calidad del código es excepcional.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Product Manager',
    company: 'DigitalSolutions',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    text: 'La mejor decisión fue trabajar con PibeLabs. Su enfoque ágil y comunicación constante hicieron todo el proceso muy fluido.',
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-96 flex items-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-gradient-to-br from-dark-secondary to-dark-primary border-2 border-cyan-neon/30 rounded-2xl p-8 md:p-12">
                  <Quote className="text-cyan-neon mb-6" size={48} />
                  
                  <p className="text-xl md:text-2xl text-gray-300 font-poppins leading-relaxed mb-8">
                    "{testimonials[current]?.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[current]?.image}
                      alt={testimonials[current]?.name}
                      className="w-16 h-16 rounded-full border-2 border-cyan-neon"
                    />
                    <div>
                      <h4 className="text-white font-rajdhani font-bold text-lg">
                        {testimonials[current]?.name}
                      </h4>
                      <p className="text-cyan-neon font-poppins">
                        {testimonials[current]?.role} at {testimonials[current]?.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-cyan-neon/20 hover:bg-cyan-neon/40 rounded-full flex items-center justify-center transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-cyan-neon" size={24} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-cyan-neon/20 hover:bg-cyan-neon/40 rounded-full flex items-center justify-center transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-cyan-neon" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current
                    ? 'bg-cyan-neon w-8'
                    : 'bg-cyan-neon/30 hover:bg-cyan-neon/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
