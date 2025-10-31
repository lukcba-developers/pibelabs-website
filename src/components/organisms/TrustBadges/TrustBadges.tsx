import { motion } from 'framer-motion';
import { Shield, Award, Lock, CheckCircle, Zap, Users } from 'lucide-react';

/* ============================================
   Trust Badges Component (Organism)
   ============================================ */

const TrustBadges = () => {
  const badges = [
    {
      icon: Award,
      title: 'Google Cloud Partner',
      subtitle: 'Certified Developer',
      color: 'cyan',
    },
    {
      icon: Shield,
      title: 'AWS Certified',
      subtitle: 'Solutions Architect',
      color: 'magenta',
    },
    {
      icon: Lock,
      title: 'ISO 27001',
      subtitle: 'Security Standards',
      color: 'cyan',
    },
    {
      icon: CheckCircle,
      title: '99.9% Uptime SLA',
      subtitle: 'Guaranteed',
      color: 'magenta',
    },
    {
      icon: Zap,
      title: 'Agile Certified',
      subtitle: 'Scrum Master',
      color: 'cyan',
    },
    {
      icon: Users,
      title: '50+ Clientes',
      subtitle: 'Satisfechos',
      color: 'magenta',
    },
  ];

  return (
    <section className="section-padding bg-dark-primary">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            const iconColor = badge.color === 'cyan' ? 'text-cyan-400' : 'text-magenta-400';
            const borderColor = badge.color === 'cyan' ? 'border-cyan-400/30' : 'border-magenta-400/30';
            const hoverBorder = badge.color === 'cyan' ? 'hover:border-cyan-neon' : 'hover:border-magenta-neon';
            const hoverShadow = badge.color === 'cyan' 
              ? 'hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]' 
              : 'hover:shadow-[0_0_20px_rgba(255,0,106,0.3)]';

            return (
              <motion.div
                key={badge.title}
                className={`text-center p-6 bg-dark-secondary/50 rounded-lg border ${borderColor} ${hoverBorder} ${hoverShadow} transition-all duration-300 group`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className={`flex justify-center mb-3 ${iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                <div className="text-sm font-rajdhani font-bold text-white mb-1">
                  {badge.title}
                </div>
                <div className="text-xs text-gray-400">
                  {badge.subtitle}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
