import type {
  Service,
  NavLink,
  Stat,
  PortfolioProject,
  BlogPost,
  TeamMember
} from '@/types';

/* ============================================
   PIBELABS - Application Configuration
   ============================================ */

// ============================================
// Environment & API
// ============================================

export const CONFIG = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  analyticsId: import.meta.env.VITE_ANALYTICS_ID || '',
  environment: import.meta.env.VITE_ENV || 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// ============================================
// Company Information
// ============================================

export const COMPANY_INFO = {
  name: 'PibeLabs',
  tagline: 'Next-Gen Innovation Studio',
  heroHeadline: 'Transformamos ideas en productos digitales que escalan',
  heroSubheadline: 'De MVP a enterprise: desarrollo ágil con estándares de calidad internacional. Stack moderno, equipo senior, resultados medibles.',
  description: 'Estudio de innovación tecnológica especializado en desarrollo web, inteligencia artificial, diseño UX/UI y soluciones cloud.',
  email: 'contact@pibelabs.com',
  phone: '+54 11 1234-5678',
  whatsapp: '5493513088400', // Formato internacional sin símbolos para wa.me
  whatsappDisplay: '+54 9 351 3088400', // Formato para mostrar al usuario
  location: 'Buenos Aires, Argentina',
  website: 'https://pibelabs.com',
  social: {
    linkedin: 'https://linkedin.com/company/pibelabs',
    github: 'https://github.com/pibelabs',
    twitter: 'https://twitter.com/pibelabs',
  },
  stats: [
    { value: '50+', label: 'Proyectos exitosos' },
    { value: '98%', label: 'Retención clientes' },
    { value: '4sem', label: 'MVP a producción' },
  ],
} as const;

// ============================================
// Navigation Links
// ============================================

export const NAV_LINKS: NavLink[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    href: '#hero',
  },
  {
    id: 'servicios',
    label: 'Servicios',
    href: '#services',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '#portfolio',
  },
  {
    id: 'nosotros',
    label: 'Nosotros',
    href: '#about',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '#blog',
  },
  {
    id: 'contacto',
    label: 'Contacto',
    href: '#contact',
  },
];

// ============================================
// Services Configuration
// ============================================

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas, rápidas y escalables con las últimas tecnologías.',
    icon: '/assets/images/pibelabs-icon-desarrollo.svg',
    features: [
      'React, Next.js, Vue',
      'TypeScript & Node.js',
      'API RESTful & GraphQL',
      'Progressive Web Apps',
    ],
    color: 'cyan',
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    description: 'Soluciones de IA y Machine Learning para automatizar y optimizar procesos.',
    icon: '/assets/images/pibelabs-icon-ia.svg',
    features: [
      'Machine Learning',
      'NLP & Computer Vision',
      'Chatbots & Asistentes',
      'Análisis Predictivo',
    ],
    color: 'magenta',
  },
  {
    id: 'design',
    title: 'Diseño UX/UI',
    description: 'Interfaces intuitivas y atractivas centradas en la experiencia del usuario.',
    icon: '/assets/images/pibelabs-icon-diseno.svg',
    features: [
      'Research & Testing',
      'Wireframes & Prototipos',
      'Design Systems',
      'Branding & Identidad',
    ],
    color: 'cyan',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Infraestructura cloud escalable, segura y optimizada para tu negocio.',
    icon: '/assets/images/pibelabs-icon-cloud.svg',
    features: [
      'AWS, GCP, Azure',
      'CI/CD Pipelines',
      'Kubernetes & Docker',
      'Monitoring & Logging',
    ],
    color: 'magenta',
  },
  {
    id: 'security',
    title: 'Ciberseguridad',
    description: 'Protección integral contra amenazas y auditorías de seguridad.',
    icon: '/assets/images/pibelabs-icon-contacto.svg',
    features: [
      'Pentesting & Auditorías',
      'OWASP Top 10',
      'Encriptación & Auth',
      'Compliance & GDPR',
    ],
    color: 'cyan',
  },
  {
    id: 'consulting',
    title: 'Consultoría Tech',
    description: 'Asesoramiento estratégico para transformar tu negocio con tecnología.',
    icon: '/assets/images/pibelabs-icon-desarrollo.svg',
    features: [
      'Arquitectura de Software',
      'Tech Stack Selection',
      'Code Review & Refactor',
      'Capacitación de Equipos',
    ],
    color: 'magenta',
  },
];

// ============================================
// Statistics
// ============================================

export const STATS: Stat[] = [
  {
    id: 'projects',
    value: 150,
    suffix: '+',
    label: 'Proyectos Completados',
    icon: '🚀',
    animateOnScroll: true,
  },
  {
    id: 'clients',
    value: 80,
    suffix: '+',
    label: 'Clientes Satisfechos',
    icon: '⭐',
    animateOnScroll: true,
  },
  {
    id: 'experience',
    value: 5,
    suffix: '+',
    label: 'Años de Experiencia',
    icon: '📊',
    animateOnScroll: true,
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Satisfacción del Cliente',
    icon: '💯',
    animateOnScroll: true,
  },
];

// ============================================
// Form Configuration
// ============================================

export const FORM_CONFIG = {
  maxNameLength: 50,
  minNameLength: 2,
  maxMessageLength: 500,
  minMessageLength: 10,
  emailPattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
  // Disposable email domains to block (add more as needed)
  disposableEmailDomains: [
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
    'mailinator.com',
  ],
} as const;

// ============================================
// Animation Configuration
// ============================================

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
  },
  stagger: {
    children: 0.1,
    cards: 0.15,
  },
} as const;

// ============================================
// Breakpoints (matches Tailwind)
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================
// Color Palette
// ============================================

export const COLORS = {
  primary: {
    cyan: {
      neon: '#00D9FF',
      bright: '#00F0FF',
    },
    magenta: {
      neon: '#FF00FF',
      bright: '#FF10FF',
    },
    gray: '#2C3E50',
  },
  background: {
    dark: {
      primary: '#0a0e27',
      secondary: '#1a1f3a',
    },
    light: {
      primary: '#FFFFFF',
      secondary: '#FAFBFC',
    },
  },
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    tertiary: '#6B7588',
    light: '#FFFFFF',
  },
} as const;

// ============================================
// Portfolio Projects
// ============================================

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'ecommerce-ai',
    title: 'E-commerce con IA',
    description: 'Plataforma de comercio electrónico con recomendaciones personalizadas mediante Machine Learning.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    category: 'web',
    tags: ['React', 'Node.js', 'TensorFlow', 'AWS'],
    link: 'https://demo.pibelabs.com/ecommerce',
    github: 'https://github.com/pibelabs/ecommerce-ai',
    featured: true,
    year: 2024,
  },
  {
    id: 'chatbot-nlp',
    title: 'Chatbot Inteligente',
    description: 'Asistente virtual con procesamiento de lenguaje natural para atención al cliente 24/7.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    category: 'ia',
    tags: ['Python', 'NLP', 'GPT', 'FastAPI'],
    link: 'https://demo.pibelabs.com/chatbot',
    featured: true,
    year: 2024,
  },
  {
    id: 'design-system',
    title: 'Design System Empresarial',
    description: 'Sistema de diseño completo con componentes reutilizables y documentación interactiva.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'design',
    tags: ['Figma', 'React', 'Storybook', 'TypeScript'],
    link: 'https://demo.pibelabs.com/design-system',
    featured: true,
    year: 2024,
  },
  {
    id: 'cloud-infrastructure',
    title: 'Infraestructura Cloud',
    description: 'Arquitectura serverless escalable con CI/CD automatizado y monitoring en tiempo real.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    category: 'cloud',
    tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    year: 2024,
  },
  {
    id: 'fintech-app',
    title: 'FinTech Mobile',
    description: 'Aplicación móvil de gestión financiera con analytics avanzados y seguridad bancaria.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    category: 'web',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe'],
    year: 2023,
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Sistema de detección y clasificación de objetos en tiempo real con deep learning.',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
    category: 'ia',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'YOLO'],
    year: 2023,
  },
];

// ============================================
// Blog Posts
// ============================================

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'future-of-ai',
    title: 'El Futuro de la IA en el Desarrollo Web',
    excerpt: 'Exploramos cómo la inteligencia artificial está transformando la manera en que construimos aplicaciones web modernas.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: {
      name: 'María González',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      role: 'AI Specialist',
    },
    publishedAt: '2024-10-15',
    readTime: 8,
    tags: ['IA', 'Web Development', 'Future Tech'],
    category: 'Inteligencia Artificial',
    slug: 'el-futuro-de-la-ia-en-desarrollo-web',
    featured: true,
  },
  {
    id: 'react-performance',
    title: '10 Tips para Optimizar Performance en React',
    excerpt: 'Técnicas avanzadas y best practices para hacer tus aplicaciones React más rápidas y eficientes.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    author: {
      name: 'Carlos Rodríguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      role: 'Senior Frontend Developer',
    },
    publishedAt: '2024-10-10',
    readTime: 12,
    tags: ['React', 'Performance', 'JavaScript'],
    category: 'Desarrollo Web',
    slug: '10-tips-optimizar-performance-react',
    featured: true,
  },
  {
    id: 'cloud-security',
    title: 'Seguridad en la Nube: Guía Completa 2024',
    excerpt: 'Todo lo que necesitas saber sobre seguridad cloud, desde configuración básica hasta estrategias avanzadas.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    author: {
      name: 'Ana Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      role: 'Cloud Security Expert',
    },
    publishedAt: '2024-10-05',
    readTime: 15,
    tags: ['Cloud', 'Security', 'DevOps'],
    category: 'Ciberseguridad',
    slug: 'seguridad-en-la-nube-guia-completa-2024',
  },
];

// ============================================
// Team Members
// ============================================

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'maria-gonzalez',
    name: 'María González',
    role: 'CEO & AI Specialist',
    bio: 'Experta en IA con más de 10 años de experiencia. Apasionada por crear soluciones que impacten positivamente en la sociedad.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    social: {
      linkedin: 'https://linkedin.com/in/mariagonzalez',
      github: 'https://github.com/mariagonzalez',
      twitter: 'https://twitter.com/mariagonzalez',
    },
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Leadership'],
  },
  {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodríguez',
    role: 'CTO & Full Stack Developer',
    bio: 'Arquitecto de software con pasión por crear productos escalables y de alto rendimiento.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    social: {
      linkedin: 'https://linkedin.com/in/carlosrodriguez',
      github: 'https://github.com/carlosrodriguez',
    },
    skills: ['React', 'Node.js', 'AWS', 'Architecture'],
  },
  {
    id: 'ana-martinez',
    name: 'Ana Martínez',
    role: 'Lead Designer & UX Expert',
    bio: 'Diseñadora con enfoque en crear experiencias memorables y accesibles para todos.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    social: {
      linkedin: 'https://linkedin.com/in/anamartinez',
      twitter: 'https://twitter.com/anamartinez',
    },
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Research'],
  },
  {
    id: 'juan-perez',
    name: 'Juan Pérez',
    role: 'DevOps Engineer',
    bio: 'Especialista en infraestructura cloud y automatización de procesos.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    social: {
      linkedin: 'https://linkedin.com/in/juanperez',
      github: 'https://github.com/juanperez',
    },
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform'],
  },
];

// ============================================
// Testimonials & Social Proof  
// ============================================

export const TESTIMONIALS = [
  {
    id: 1,
    text: "PibeLabs transformó nuestra idea en un MVP funcional en 4 semanas. Su expertise técnico y comunicación constante fue excepcional.",
    author: "María González",
    role: "CTO",
    company: "TechCorp",
    image: "https://i.pravatar.cc/150?img=5",
    linkedin: "https://linkedin.com/in/mariagonzalez",
    rating: 5,
  },
  {
    id: 2,
    text: "El equipo de PibeLabs superó nuestras expectativas. Código limpio, arquitectura escalable y entrega antes de tiempo.",
    author: "Carlos Méndez",
    role: "Founder & CEO",
    company: "StartupX",
    image: "https://i.pravatar.cc/150?img=12",
    linkedin: "https://linkedin.com/in/carlosmendez",
    rating: 5,
  },
  {
    id: 3,
    text: "Trabajar con PibeLabs fue una experiencia increíble. Entendieron nuestra visión y la ejecutaron perfectamente.",
    author: "Ana Silva",
    role: "Product Manager",
    company: "InnovateCo",
    image: "https://i.pravatar.cc/150?img=9",
    linkedin: "https://linkedin.com/in/anasilva",
    rating: 5,
  },
] as const;

export const CLIENT_LOGOS = [
  { name: "TechCorp", logo: "https://via.placeholder.com/120x40/0a0e27/00d9ff?text=TechCorp" },
  { name: "StartupX", logo: "https://via.placeholder.com/120x40/0a0e27/ff006a?text=StartupX" },
  { name: "InnovateCo", logo: "https://via.placeholder.com/120x40/0a0e27/00d9ff?text=InnovateCo" },
  { name: "DataFlow", logo: "https://via.placeholder.com/120x40/0a0e27/ff006a?text=DataFlow" },
  { name: "CloudNet", logo: "https://via.placeholder.com/120x40/0a0e27/00d9ff?text=CloudNet" },
  { name: "DevOps Pro", logo: "https://via.placeholder.com/120x40/0a0e27/ff006a?text=DevOps+Pro" },
] as const;

// ============================================
// SEO Configuration
// ============================================

export const SEO_CONFIG = {
  defaultTitle: 'PibeLabs - Next-Gen Innovation Studio',
  titleTemplate: '%s | PibeLabs',
  defaultDescription: COMPANY_INFO.description,
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: COMPANY_INFO.website,
    siteName: COMPANY_INFO.name,
  },
  twitter: {
    handle: '@pibelabs',
    cardType: 'summary_large_image',
  },
} as const;
