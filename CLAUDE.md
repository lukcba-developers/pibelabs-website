# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PibeLabs Frontend is a modern, production-ready landing page built with React 18, TypeScript, Tailwind CSS, and Vite. The project showcases services, portfolio, team, and blog content for PibeLabs, a technology innovation studio. The codebase emphasizes type safety (strict TypeScript mode), performance optimization, and follows atomic design principles.

## Development Commands

### Core Development
```bash
npm run dev              # Start dev server on port 3000 (auto-opens browser)
npm run build            # TypeScript check + production build
npm run preview          # Preview production build on port 4173
npm run type-check       # Run TypeScript compiler without emitting files
```

### Code Quality
```bash
npm run lint             # Run ESLint (max 0 warnings enforced)
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without modifying files
```

### Docker Workflow
```bash
npm run docker:build     # Build production Docker image
npm run docker:run       # Run production container on port 80
npm run compose:up       # Start with docker-compose
npm run compose:down     # Stop docker-compose stack
```

### Maintenance
```bash
npm run clean            # Remove dist and Vite cache
npm run clean:all        # Remove dist, node_modules, and package-lock.json
```

## Architecture

### Component Organization (Atomic Design)

The project strictly follows the Atomic Design methodology:

- **Atoms** (`src/components/atoms/`): Base components like `Button`, `Input`, `Loader`
- **Molecules** (`src/components/molecules/`): Combinations of atoms (currently none, reserved for future use)
- **Organisms** (`src/components/organisms/`): Complex sections like `Header`, `Hero`, `ContactForm`, `Footer`, `ServicesGrid`, `StatsSection`, `AboutSection`, `PortfolioSection`, `BlogSection`

Each component folder contains:
- `ComponentName.tsx` - Main component file
- `index.ts` - Barrel export for clean imports

### Path Aliases

The project uses TypeScript path aliases configured in both `tsconfig.json` and `vite.config.ts`:

```typescript
@/*                  // ./src/*
@/components/*       // ./src/components/*
@/hooks/*            // ./src/hooks/*
@/lib/*              // ./src/lib/*
@/styles/*           // ./src/styles/*
@/types/*            // ./src/types/*
```

Always use these aliases instead of relative imports for cleaner, more maintainable code.

### State Management

The project uses **Zustand** for state management (installed but stores not yet implemented). State is defined in `src/types/index.ts` with interfaces like `UIStore` and `FormStore`.

For form state, the project uses **React Hook Form** with **Zod** validation. See `ContactForm` component for the pattern.

### Validation Layer

All form validation uses Zod schemas defined in `src/lib/validation/schemas.ts`:

- `contactFormSchema`: Main contact form validation with anti-spam measures
- Individual field validators: `validateName`, `validateEmail`, `validateMessage`
- Email domain typo detection: `suggestEmailDomain` (uses Levenshtein distance)
- Disposable email blocking configured in `FORM_CONFIG.disposableEmailDomains`

### Configuration & Constants

All app-wide configuration lives in `src/lib/constants/config.ts`:

- `CONFIG`: Environment variables and API URLs (uses `VITE_` prefix)
- `COMPANY_INFO`: Business information and social links
- `NAV_LINKS`: Navigation structure
- `SERVICES`: Service offerings with icons and features
- `STATS`: Homepage statistics
- `PORTFOLIO_PROJECTS`: Portfolio items
- `BLOG_POSTS`: Blog content
- `TEAM_MEMBERS`: Team profiles
- `TESTIMONIALS`: Client testimonials
- `FORM_CONFIG`: Form validation constraints
- `ANIMATION_CONFIG`: Framer Motion animation settings
- `COLORS`: Brand color palette (matches Tailwind config)

### Type System

All TypeScript types are centralized in `src/types/index.ts`:

- Service types: `Service`, `ServiceType`
- Form types: `ContactFormData`, `ContactFormState`, `ContactFormErrors`
- API types: `APIResponse<T>`, `ContactAPIResponse`
- Component prop types: `ButtonProps`, `InputProps`, `CardProps`
- Content types: `PortfolioProject`, `BlogPost`, `TeamMember`, `Testimonial`
- Store types: `UIStore`, `FormStore`
- Utility types: `XOR<T, U>`, `DeepPartial<T>`, `Nullable<T>`

### Custom Hooks

The project includes a comprehensive hooks library in `src/hooks/index.ts`:

- `useDebounce<T>`: Debounce value updates
- `useLocalStorage<T>`: SSR-safe localStorage persistence
- `useMediaQuery`: Responsive breakpoint detection
- `useOnScreen`: Intersection Observer hook
- `useClickOutside`: Detect outside clicks
- `useKeyPress`: Keyboard event detection
- `useWindowSize`: Window dimensions tracking
- `useScrollPosition`: Scroll position tracking
- `usePrevious<T>`: Access previous state value
- `useToggle`: Boolean state toggle
- `useAsync<T>`: Async operation handling with loading/error states
- `useCopyToClipboard`: Clipboard API wrapper
- `useInterval`: Declarative interval
- `useTimeout`: Declarative timeout

### Styling System

**Tailwind CSS** is used for all styling with a custom theme extending the default:

- **Brand Colors**: `cyan-neon`, `cyan-bright`, `magenta-neon`, `magenta-bright`
- **Backgrounds**: `dark-primary`, `dark-secondary`, `light-primary`, `light-secondary`
- **Typography**: Custom font families (`orbitron`, `rajdhani`, `poppins`) and responsive sizes (`h1`, `h2`, `h3`, `body`, `small`)
- **Effects**: Custom glow shadows (`glow-cyan`, `glow-magenta`) and animations (`float`, `pulse-glow`, `slide-up`, `fade-in`)
- **Grid System**: 8pt spacing system with extended spacing values

**Framer Motion** is used for animations - check `ANIMATION_CONFIG` for standard durations and easing functions.

### Build Optimization

The Vite build configuration includes:

- **Code Splitting**: Manual chunks for `react-vendor`, `animation-vendor`, `form-vendor`
- **Minification**: Terser with console/debugger removal in production
- **Bundle Analysis**: Run `npm run analyze` to visualize bundle size
- **Chunk Size Limit**: 500kb warning threshold

## TypeScript Configuration

The project uses **strict mode** with additional safety features:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true` - Requires null checks on indexed access
- `noImplicitReturns: true`
- `forceConsistentCasingInFileNames: true`

When working with arrays or objects accessed by index, always handle the `undefined` case:

```typescript
const item = array[0]; // Type: ItemType | undefined
if (item) {
  // Now safe to use item
}
```

## Form Handling Pattern

Contact forms follow this pattern (see `ContactForm.tsx`):

1. Use React Hook Form with Zod resolver
2. Define schema in `src/lib/validation/schemas.ts`
3. Set `mode: 'onBlur'` for validation timing
4. Handle submission with loading/success/error states
5. Implement email typo suggestions using `suggestEmailDomain`
6. Show success/error messages with Framer Motion animations

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser:

```env
VITE_API_URL=https://api.pibelabs.com
VITE_ANALYTICS_ID=your-analytics-id
```

Access via `import.meta.env.VITE_API_URL` (never `process.env`).

## Code Style Conventions

- Use functional components with TypeScript
- Prefer `const` arrow functions for components
- Use barrel exports (`index.ts`) for component folders
- Include section comments using the format:
  ```typescript
  /* ============================================
     Section Name
     ============================================ */
  ```
- All new utilities should be fully typed with no `any`
- Props interfaces should extend `BaseComponentProps` when accepting `className` or `children`

## Git Commit Conventions

Follow this commit prefix convention:

- `Add:` - New functionality
- `Fix:` - Bug corrections
- `Update:` - Feature enhancements
- `Refactor:` - Code restructuring
- `Docs:` - Documentation changes

## Common Patterns

### Adding a New Service

1. Update `ServiceType` in `src/types/index.ts`
2. Add service object to `SERVICES` array in `src/lib/constants/config.ts`
3. Update contact form service enum in `src/lib/validation/schemas.ts`

### Adding a New Section

1. Create organism component in `src/components/organisms/SectionName/`
2. Import and add to `App.tsx` in the appropriate position
3. Add navigation link to `NAV_LINKS` if needed
4. Consider adding intersection observer for scroll animations

### Working with Animations

Import from `ANIMATION_CONFIG` for consistent timing:

```typescript
import { ANIMATION_CONFIG } from '@/lib/constants/config';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: ANIMATION_CONFIG.duration.normal }}
/>
```

## Performance Considerations

- Images should use appropriate formats and sizes (currently using Unsplash placeholders)
- Lazy load components below the fold when applicable
- Use `React.memo` for expensive components that receive stable props
- Leverage Vite's automatic code splitting for route-based chunks
- The build removes all console logs and debuggers in production

## Deployment

The project supports multiple deployment targets:

### Hostinger (Automatic via GitHub Actions)

The project includes automatic deployment to Hostinger via FTP on every push to `main`:

- **Workflow**: `.github/workflows/deploy-hostinger.yml`
- **Trigger**: Automatic on push to `main` branch, or manual via GitHub Actions UI
- **Process**: Lints → Type-checks → Builds → Deploys to Hostinger via FTP
- **Required Secrets** (see `DEPLOY_SETUP.md` for details):
  - `FTP_SERVER` - Hostinger FTP hostname
  - `FTP_USERNAME` - FTP username
  - `FTP_PASSWORD` - FTP password
  - `FTP_SERVER_DIR` - Target directory (e.g., `/public_html/`)

**Note**: The build output directory is `dist/` (Vite default), not `build/`.

### Other Deployment Options

- **Docker**: Production-ready Nginx container
- **Vercel**: `npm run deploy:vercel`
- **Netlify**: `npm run deploy:netlify`

All builds run TypeScript type checking before bundling - builds will fail on type errors.

For detailed Hostinger setup instructions, see `DEPLOY_SETUP.md`.