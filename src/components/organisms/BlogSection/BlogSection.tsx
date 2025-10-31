import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/lib/constants/config';
import type { BlogPost } from '@/types';

/* ============================================
   Blog Section Component (Organism)
   ============================================ */

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Blog Post Card
const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
  return (
    <motion.article
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-neon text-white text-xs font-rajdhani font-semibold rounded-full">
          {post.category}
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-magenta-neon text-white text-xs font-rajdhani font-semibold rounded-full">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-text-tertiary">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time className="font-poppins">{formatDate(post.publishedAt)}</time>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-poppins">{post.readTime} min lectura</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-orbitron font-bold text-xl text-gray-dark mb-3 group-hover:text-cyan-neon transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-poppins text-sm text-text-secondary mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-text-tertiary text-xs font-poppins rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author & Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-3">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-rajdhani font-semibold text-sm text-gray-dark">
                {post.author.name}
              </p>
              {post.author.role && (
                <p className="font-poppins text-xs text-text-tertiary">
                  {post.author.role}
                </p>
              )}
            </div>
          </div>

          {/* Read More */}
          <motion.button
            className="flex items-center gap-2 text-cyan-neon font-rajdhani font-semibold text-sm group/link"
            whileHover={{ x: 5 }}
            aria-label={`Leer más sobre ${post.title}`}
          >
            <span>Leer más</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

const BlogSection = () => {
  // Get only featured posts or first 3
  const displayPosts = BLOG_POSTS.filter(post => post.featured).length > 0
    ? BLOG_POSTS.filter(post => post.featured)
    : BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="section bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-magenta-neon/10 text-magenta-neon font-rajdhani font-semibold text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Nuestro Blog
          </motion.span>

          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-gray-dark mb-4">
            Últimas <span className="text-magenta-neon">Publicaciones</span>
          </h2>

          <p className="font-poppins text-lg text-text-secondary max-w-3xl mx-auto">
            Mantente actualizado con las últimas tendencias, tutoriales y novedades 
            del mundo tecnológico.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-poppins text-text-secondary mb-6">
            ¿Quieres mantenerte al día con nuestras publicaciones?
          </p>
          
          {/* Newsletter Signup (Mock) */}
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-neon focus:outline-none font-poppins"
                aria-label="Email para newsletter"
              />
              <motion.button
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-neon to-magenta-neon text-white font-rajdhani font-semibold hover:shadow-glow-cyan transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Suscribirse
              </motion.button>
            </div>
            <p className="mt-2 text-xs text-text-tertiary font-poppins">
              Recibe las últimas novedades directamente en tu inbox. Sin spam.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -bottom-20 left-0 w-64 h-64 bg-magenta-neon rounded-full filter blur-[120px] opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};

export default BlogSection;
