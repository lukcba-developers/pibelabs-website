import { motion } from "framer-motion";
import { Target, Eye, Diamond } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants/config";
import type { TeamMember } from "@/types";
import LazyImage from "@/components/atoms/LazyImage";
import { useReducedMotion } from "@/hooks";

/* ============================================
   About Section Component (Organism)
   ============================================ */

// Team Member Card
const TeamMemberCard = ({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) => {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Gradient overlay on hover */}
        <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-magenta-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Avatar */}
        <div className="relative mb-4 flex justify-center">
          <motion.div
            className="relative w-32 h-32"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon to-magenta-neon rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <LazyImage
              src={member.avatar}
              alt={member.name}
              className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </motion.div>
        </div>

        {/* Info */}
        <div className="relative text-center mb-4">
          <h3 className="font-orbitron font-bold text-xl text-gray-dark mb-1">
            {member.name}
          </h3>
          <p className="font-rajdhani text-cyan-neon font-semibold">
            {member.role}
          </p>
        </div>

        {/* Bio */}
        <p className="relative font-poppins text-sm text-text-secondary text-center mb-4">
          {member.bio}
        </p>

        {/* Skills */}
        {member.skills && (
          <div className="relative flex flex-wrap gap-2 justify-center mb-4">
            {member.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-cyan-neon/10 text-cyan-neon text-xs font-rajdhani rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Social Links */}
        {member.social && (
          <div className="relative flex justify-center gap-3">
            {member.social.linkedin && (
              <motion.a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-cyan-neon hover:text-white transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`LinkedIn de ${member.name}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            )}
            {member.social.github && (
              <motion.a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-cyan-neon hover:text-white transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`GitHub de ${member.name}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            )}
            {member.social.twitter && (
              <motion.a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-cyan-neon hover:text-white transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Twitter de ${member.name}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="section bg-dark-primary py-20">
      <div className="container mx-auto px-4">
        {/* Company Info */}
        <motion.div
          className="text-center mb-20"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-cyan-neon/10 text-cyan-neon font-rajdhani font-semibold text-sm mb-4"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          >
            Sobre Nosotros
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            Conoce al <span className="text-cyan-neon">Equipo</span> PibeLabs
          </h2>

          <p className="font-poppins text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            Somos un equipo multidisciplinario de expertos apasionados por la
            tecnología y la innovación, con el objetivo de transformar ideas en
            realidad digital.
          </p>

          {/* Misión, Visión, Valores - Modernized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Misión */}
            <motion.div
              className="group relative bg-gradient-to-br from-dark-secondary to-dark-primary border-2 border-cyan-neon/20 rounded-2xl p-6 hover:border-cyan-neon/60 transition-all duration-300 hover:shadow-glow-cyan"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.1,
                duration: prefersReducedMotion ? 0 : 0.5,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-cyan-neon/10 flex items-center justify-center mb-4 group-hover:bg-cyan-neon/20 transition-all"
                  whileHover={
                    prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }
                  }
                >
                  <Target className="w-8 h-8 text-cyan-neon" />
                </motion.div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-3">
                  Misión
                </h3>
                <p className="font-poppins text-sm text-gray-300 leading-relaxed">
                  Crear soluciones tecnológicas que impulsen el éxito de
                  nuestros clientes
                </p>
              </div>
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>

            {/* Visión */}
            <motion.div
              className="group relative bg-gradient-to-br from-dark-secondary to-dark-primary border-2 border-magenta-neon/20 rounded-2xl p-6 hover:border-magenta-neon/60 transition-all duration-300 hover:shadow-glow-magenta"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.2,
                duration: prefersReducedMotion ? 0 : 0.5,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-magenta-neon/10 flex items-center justify-center mb-4 group-hover:bg-magenta-neon/20 transition-all"
                  whileHover={
                    prefersReducedMotion ? {} : { scale: 1.1, rotate: -5 }
                  }
                >
                  <Eye className="w-8 h-8 text-magenta-neon" />
                </motion.div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-3">
                  Visión
                </h3>
                <p className="font-poppins text-sm text-gray-300 leading-relaxed">
                  Ser líderes en innovación tecnológica en América Latina
                </p>
              </div>
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-magenta-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>

            {/* Valores */}
            <motion.div
              className="group relative bg-gradient-to-br from-dark-secondary to-dark-primary border-2 border-cyan-neon/20 rounded-2xl p-6 hover:border-cyan-neon/60 transition-all duration-300 hover:shadow-glow-cyan"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.3,
                duration: prefersReducedMotion ? 0 : 0.5,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-cyan-neon/10 flex items-center justify-center mb-4 group-hover:bg-cyan-neon/20 transition-all"
                  whileHover={
                    prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }
                  }
                >
                  <Diamond className="w-8 h-8 text-cyan-neon" />
                </motion.div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-3">
                  Valores
                </h3>
                <p className="font-poppins text-sm text-gray-300 leading-relaxed">
                  Excelencia, innovación, transparencia y compromiso
                </p>
              </div>
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div>
          <motion.h3
            className="font-orbitron font-bold text-3xl text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nuestro Equipo
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
