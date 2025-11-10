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
  description: 'Estudio de innovación tecnológica fundado por Lucas Benavidez y Juan Cruz Ferri, especializado en desarrollo web, inteligencia artificial, diseño UX/UI y soluciones cloud.',
  email: 'contact@pibelabs.com',
  phone: '+54 9 351 3088400',
  whatsapp: '5493513088400', // Formato internacional sin símbolos para wa.me
  whatsappDisplay: '+54 9 351 3088400', // Formato para mostrar al usuario
  location: 'Despeñaderos, Córdoba, Argentina',
  website: 'https://pibelabs.com',
  founders: [
    {
      name: 'Lucas Benavidez',
      linkedin: 'https://www.linkedin.com/in/lukcba/',
    },
    {
      name: 'Juan Cruz Ferri',
      linkedin: 'https://www.linkedin.com/in/jcferri/',
    },
  ],
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
    description: 'Desde 2020 hasta hoy',
    icon: '🚀',
    animateOnScroll: true,
  },
  {
    id: 'clients',
    value: 80,
    suffix: '+',
    label: 'Clientes Satisfechos',
    description: 'En 15 países',
    icon: '⭐',
    animateOnScroll: true,
  },
  {
    id: 'experience',
    value: 5,
    suffix: '+',
    label: 'Años de Experiencia',
    description: 'Innovación constante',
    icon: '📊',
    animateOnScroll: true,
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Satisfacción del Cliente',
    description: 'Basado en 200+ reviews',
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
    id: 'tercer-tiempo-fc',
    title: 'Tercer Tiempo FC - Sitio Web Oficial',
    description: 'SPA completa para club amateur de fútbol con funnel de conversión optimizado para sponsors locales. Incluye sistema de gestión de contenido con JSON, integración Instagram Basic Display API, Google Analytics 4 con 18 eventos predefinidos, Google AdSense, WhatsApp Business API con mensajes pre-cargados, y arquitectura component-driven con custom hooks.',
    image: '/assets/images/tercertiempo-logo.png',
    category: 'web',
    tags: ['React', 'React Router', 'Analytics', 'WhatsApp API', 'Instagram API', 'CI/CD'],
    link: 'https://tercertiempofc.com/',
    featured: true,
    year: 2025,
    status: 'production',
    features: [
      'Funnel de conversión optimizado para captación de sponsors locales',
      'Sistema de gestión de contenido dinámico con archivos JSON',
      'Integración completa con Instagram Basic Display API',
      'Google Analytics 4 con 18 eventos de negocio predefinidos',
      'Monetización con Google AdSense en páginas estratégicas',
      'WhatsApp Business API con mensajes contextuales pre-cargados',
      'Arquitectura Atomic Design (Atoms, Molecules, Organisms)',
      '9 custom hooks reutilizables para lógica de negocio',
      'Lazy loading de imágenes y code splitting automático',
      'Sistema de SEO optimizado con meta tags dinámicos',
    ],
    achievements: [
      '51 tests unitarios y de integración con 95% de cobertura',
      'Lighthouse Score: 95+ en Performance y Accessibility',
      'Tiempo de carga < 2s en 3G con optimizaciones avanzadas',
      'Bundle size optimizado: ~89kB gzipped',
      'CI/CD automático con GitHub Actions + Husky pre-commit',
      'Deploy automático a Hostinger vía FTP en cada push',
    ],
    techStack: {
      frontend: ['React 19', 'React Router 7', 'PropTypes', 'CSS Modules'],
      tools: ['Vite', 'ESLint', 'Prettier', 'Husky', 'GitHub Actions', 'Jest', 'React Testing Library'],
      infrastructure: ['Hostinger Hosting', 'FTP Deploy', 'DNS Management'],
    },
  },
  {
    id: 'clubpulse',
    title: 'ClubPulse - Gestión Deportiva Multi-Tenant',
    description: 'Ecosistema completo de microservicios para gestión de clubs deportivos con arquitectura event-driven. 11 microservicios independientes en Go con frontend React TypeScript, modo dual de bases de datos optimizado para Railway, WebSocket para tiempo real, Redis cache distribuido, Prometheus + Grafana para observabilidad, y sistema completo de notificaciones.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    category: 'cloud',
    tags: ['Go', 'Microservicios', 'PostgreSQL', 'Docker', 'React', 'WebSocket', 'Redis', 'Prometheus'],
    featured: true,
    year: 2025,
    status: 'development',
    features: [
      '11 microservicios independientes en Go (Auth, User, Calendar, Championship, Membership, Facilities, Notification, Payments, Booking, Super-Admin, BFF)',
      'Arquitectura event-driven con comunicación inter-servicios',
      'Modo dual de bases de datos: single DB para producción (78% ahorro de costos) o multi-DB para desarrollo',
      'Frontend React TypeScript con arquitectura modular escalable',
      'WebSocket para comunicación en tiempo real entre clientes',
      'Redis para cache distribuido y gestión de sesiones',
      'Circuit breakers para resiliencia ante fallos de servicios',
      'Sistema completo de notificaciones con SendGrid (Email, SMS)',
      'Integración con pasarelas de pago (Stripe, Mercado Pago)',
      'API Gateway (BFF) con rate limiting y autenticación centralizada',
    ],
    achievements: [
      '11 de 12 microservicios operativos y testeados',
      'Arquitectura optimizada para Railway con 78% ahorro de costos vs multi-DB',
      'Suite de testing end-to-end con servicios reales (no mocks)',
      'Métricas empresariales en tiempo real con Prometheus',
      'Dashboards personalizados en Grafana para cada microservicio',
      'Sistema de logs centralizado con observabilidad completa',
    ],
    techStack: {
      backend: ['Go 1.21+', 'Gin HTTP Router', 'GORM', 'JWT Auth', 'WebSocket (Gorilla)'],
      frontend: ['React 18', 'TypeScript', 'Vite', 'TailwindCSS', 'React Query'],
      database: ['PostgreSQL 15', 'Redis 7'],
      infrastructure: ['Docker', 'Docker Compose', 'Railway', 'Nginx'],
      tools: ['Prometheus', 'Grafana', 'SendGrid', 'Stripe API', 'Mercado Pago API'],
    },
  },
  {
    id: 'aura-stock',
    title: 'Aura Stock - Sistema SaaS de Inventario',
    description: 'Plataforma SaaS multi-tenant para gestión de inventario con automatización zero-config. Stack full-stack Node.js + React con workspaces, automatización completa con N8N, monitoreo real-time con Prometheus + Grafana, y soporte multi-industria (supermercados, restaurantes, heladerías).',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    category: 'web',
    tags: ['Node.js', 'React', 'PostgreSQL', 'N8N', 'Redis', 'Prometheus', 'Docker', 'Nginx'],
    featured: true,
    year: 2025,
    status: 'development',
    features: [
      'Arquitectura SaaS multi-tenant con aislamiento de datos por organización',
      'Automatización zero-config con N8N (workflows main + workers en background)',
      'Stack monorepo con npm workspaces (backend + frontend integrados)',
      'Soporte multi-industria: supermercados, restaurantes, heladerías, retail',
      'Monitoreo real-time con Prometheus + dashboards Grafana personalizados',
      'Cache distribuido Redis con estrategias de invalidación inteligentes',
      'Sistema de validación proactivo que previene errores antes de ocurrir',
      'PgAdmin para gestión visual de base de datos PostgreSQL',
      'Redis Commander para monitoreo de cache en tiempo real',
      'Health checks automáticos de todos los servicios del stack',
    ],
    achievements: [
      'Setup automático con un solo comando (npm run dev-auto)',
      'Sistema completo desplegable en 3 scripts bash',
      'Testing E2E con Cypress + cobertura de código con NYC',
      'Security scanning automático con audit-ci en CI/CD',
      'Backups automáticos programados con scripts de recuperación',
      'Deployment optimizado para Railway con escalabilidad horizontal',
    ],
    techStack: {
      backend: ['Node.js 18+', 'Express.js', 'TypeORM', 'JWT Auth', 'Joi Validation'],
      frontend: ['React 18', 'Vite', 'React Router', 'Context API', 'Axios'],
      database: ['PostgreSQL 15', 'Redis 7', 'PgAdmin'],
      infrastructure: ['Docker', 'Docker Compose', 'Nginx', 'Railway', 'N8N'],
      tools: ['Prometheus', 'Grafana', 'Cypress', 'NYC', 'audit-ci', 'ESLint', 'Prettier'],
    },
  },
  {
    id: 'aura-delivery',
    title: 'Aura Delivery - Microservicio de Entregas',
    description: 'Microservicio production-ready para gestión de entregas siguiendo Hexagonal Architecture y Clean Architecture. Desarrollado con GopherKit v1.0.1, incluye autenticación JWT empresarial, tracking GPS con optimización de rutas, chat en tiempo real vía WebSockets, sincronización offline, notificaciones multi-canal con circuit breakers, y métricas empresariales Prometheus.',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
    category: 'cloud',
    tags: ['Go', 'Hexagonal Architecture', 'WebSocket', 'Redis', 'Firebase', 'PostgreSQL', 'Prometheus'],
    featured: true,
    year: 2025,
    status: 'development',
    features: [
      'Hexagonal Architecture (Ports & Adapters) con Clean Architecture',
      'Desarrollado con GopherKit v1.0.1 - framework empresarial Go',
      'Autenticación JWT empresarial con cache de tokens y blacklist distribuido',
      'Gestión avanzada de conductores: estados complejos, shifts, breaks automáticos',
      'Tracking GPS en tiempo real con optimización de rutas y alertas de tráfico',
      'Chat en tiempo real vía WebSockets (Gorilla) con persistencia en PostgreSQL',
      'Sincronización offline para operaciones sin conexión con cola de eventos',
      'Sistema de notificaciones multi-canal: Push (Firebase), SMS, Email',
      'Circuit breakers para servicios externos (Twilio, SendGrid, Firebase)',
      'Cache unificado Redis con fallback automático a memoria',
    ],
    achievements: [
      'Arquitectura empresarial lista para producción con patrones probados',
      'Sistema de dependency injection personalizado y testeable',
      'Health checks automáticos de dependencias (DB, Redis, APIs externas)',
      'Métricas empresariales Prometheus + dashboards Grafana personalizados',
      'Logging estructurado con Logrus adaptado a nivel empresarial',
      'Rate limiting avanzado por IP, usuario y endpoint con cache distribuido',
    ],
    techStack: {
      backend: ['Go 1.24+', 'GopherKit v1.0.1', 'Gin HTTP Router', 'GORM', 'Gorilla WebSocket', 'JWT-Go'],
      database: ['PostgreSQL 15', 'Redis 7'],
      infrastructure: ['Docker', 'Docker Compose', 'Nginx'],
      tools: ['Prometheus', 'Grafana', 'PgAdmin', 'Logrus', 'Air (Hot Reload)', 'Makefile'],
    },
  },
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
    id: 'lucas-benavidez',
    name: 'Lucas Benavidez',
    role: 'Co-Founder & Lead Software Engineer',
    bio: 'Full-stack software engineer especializado en desarrollo de aplicaciones web modernas, arquitecturas escalables y soluciones cloud. Apasionado por crear productos digitales de alto impacto.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LucasBenavidez',
    social: {
      linkedin: 'https://www.linkedin.com/in/lukcba/',
      github: 'https://github.com/lukcba',
    },
    skills: ['React', 'TypeScript', 'Node.js', 'Cloud Architecture', 'Full-Stack Development'],
  },
  {
    id: 'juan-cruz-ferri',
    name: 'Juan Cruz Ferri',
    role: 'Co-Founder & Product Lead',
    bio: 'Product Owner y Scrum Master especializado en metodologías ágiles, desarrollo de productos digitales y liderazgo técnico. Enfocado en transformar ideas en soluciones innovadoras.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JuanCruzFerri',
    social: {
      linkedin: 'https://www.linkedin.com/in/jcferri/',
      github: 'https://github.com/jcferri',
    },
    skills: ['Product Management', 'Agile Methodologies', 'Full-Stack', 'Innovation', 'Team Leadership'],
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
  { name: "TechCorp", logo: "/assets/images/clients/techcorp.svg" },
  { name: "StartupX", logo: "/assets/images/clients/startupx.svg" },
  { name: "InnovateCo", logo: "/assets/images/clients/innovateco.svg" },
  { name: "DataFlow", logo: "/assets/images/clients/dataflow.svg" },
  { name: "CloudNet", logo: "/assets/images/clients/cloudnet.svg" },
  { name: "DevOps Pro", logo: "/assets/images/clients/devops-pro.svg" },
] as const;

// ============================================
// SEO Configuration
// ============================================

export const SEO_CONFIG = {
  title: 'PibeLabs - Innovación Tecnológica',
  defaultTitle: 'PibeLabs - Next-Gen Innovation Studio',
  titleTemplate: '%s | PibeLabs',
  description: COMPANY_INFO.description,
  defaultDescription: COMPANY_INFO.description,
  keywords: [
    'desarrollo web',
    'desarrollo mobile',
    'inteligencia artificial',
    'cloud computing',
    'transformación digital',
    'innovación tecnológica',
    'software a medida',
    'consultoria tecnológica',
    'ux ui design',
    'devops',
    'argentina',
    'buenos aires',
  ],
  author: 'PibeLabs',
  siteUrl: COMPANY_INFO.website,
  image: '/og-image.svg', // TODO: Convertir a PNG 1200x630 para mejor compatibilidad
  twitterHandle: '@pibelabs',
  ogType: 'website',
  ogLocale: 'es_AR',
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
  // JSON-LD Schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.website,
    logo: 'https://pibelabs.com/assets/images/pibelabs-logo-square.svg',
    description: COMPANY_INFO.description,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    founders: COMPANY_INFO.founders.map(founder => ({
      '@type': 'Person',
      name: founder.name,
      url: founder.linkedin,
    })),
    sameAs: [
      COMPANY_INFO.social.twitter,
      COMPANY_INFO.social.linkedin,
      COMPANY_INFO.social.github,
    ],
  },
} as const;
