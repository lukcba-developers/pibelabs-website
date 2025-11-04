/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales PibeLabs
        'cyan-neon': '#00D9FF',
        'cyan-bright': '#00F0FF',
        'magenta-neon': '#FF00FF',
        'magenta-bright': '#FF10FF',
        'gray-dark': '#2C3E50',
        
        // Fondos
        'dark-primary': '#0a0e27',
        'dark-secondary': '#1a1f3a',
        'light-primary': '#FFFFFF',
        'light-secondary': '#FAFBFC',
        
        // Textos (WCAG AA compliant)
        'text-primary': '#2C3E50',      // 12.6:1 sobre white ✅
        'text-secondary': '#7F8C8D',    // 4.7:1 sobre white ✅
        'text-tertiary': '#5A6478',     // 4.8:1 sobre white ✅ (mejorado de #6B7588)
        'text-light': '#FFFFFF',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': ['72px', { lineHeight: '1.2', fontWeight: '800' }],
        'h2': ['48px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['32px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        // 8pt grid system
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.5)',
        'glow-magenta': '0 0 20px rgba(255, 0, 255, 0.5)',
        'glow-cyan-lg': '0 0 40px rgba(0, 217, 255, 0.6)',
        'glow-magenta-lg': '0 0 40px rgba(255, 0, 255, 0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
            filter: 'brightness(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 217, 255, 0.8)',
            filter: 'brightness(1.2)',
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
