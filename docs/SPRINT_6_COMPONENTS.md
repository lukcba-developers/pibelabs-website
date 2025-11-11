# Sprint 6: Advanced Interactive Components

## Overview

Sprint 6 introduces advanced interactive components to enhance user engagement, compliance, and conversion optimization.

**Implemented Components:**
1. **CookieConsent** - GDPR-compliant cookie consent management
2. **NewsletterPopup** - Intelligent newsletter subscription popup with multiple triggers
3. **PortfolioModal Carousel** - Enhanced portfolio modal with image gallery carousel
4. **VideoPlayer** - Versatile video player supporting YouTube, Vimeo, and direct video files

---

## 1. CookieConsent Component

**Location:** `src/components/atoms/CookieConsent/`

### Features

- GDPR-compliant cookie consent banner
- Customizable cookie preferences modal
- 4 cookie categories: Necessary, Analytics, Marketing, Functional
- LocalStorage persistence for user choices
- Three action buttons: Accept All, Reject All, Customize
- Analytics event tracking for consent decisions
- Framer Motion animations with reduced motion support

### Usage

```tsx
import CookieConsent from '@/components/atoms/CookieConsent';

function App() {
  return (
    <CookieConsent
      position="bottom"           // or "top"
      showCustomize={true}        // Show customize button
      onAccept={() => console.log('Accepted')}
      onReject={() => console.log('Rejected')}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onAccept` | `() => void` | - | Callback when cookies are accepted |
| `onReject` | `() => void` | - | Callback when cookies are rejected |
| `message` | `string` | Default message | Custom consent message |
| `position` | `"bottom" \| "top"` | `"bottom"` | Banner position |
| `showCustomize` | `boolean` | `true` | Show customize button |

### Cookie Preferences

```typescript
interface CookiePreferences {
  necessary: boolean;   // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}
```

### LocalStorage Keys

- `pibelabs_cookie_consent`: Stores consent status (`"accepted"` | `"rejected"`)
- `pibelabs_cookie_preferences`: Stores user preferences

---

## 2. NewsletterPopup Component

**Location:** `src/components/molecules/NewsletterPopup/`

### Features

- Exit-intent detection (mouse leaves viewport from top)
- Time delay trigger (configurable)
- Scroll percentage trigger (configurable)
- React Hook Form + Zod validation
- LocalStorage tracking for subscriptions and dismissals
- Success state with animations
- Prevents re-showing based on user actions
- Configurable dismiss period (default: 7 days)

### Usage

```tsx
import NewsletterPopup from '@/components/molecules/NewsletterPopup';

function App() {
  return (
    <NewsletterPopup
      exitIntent={true}           // Enable exit-intent trigger
      delay={10000}               // Show after 10 seconds
      scrollPercentage={50}       // Show after 50% scroll
      dismissDays={7}             // Don't show again for 7 days if dismissed
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `exitIntent` | `boolean` | `true` | Enable exit-intent trigger |
| `delay` | `number` | `10000` | Delay before showing (ms) |
| `scrollPercentage` | `number` | `50` | Show after scroll % (0-100) |
| `dismissDays` | `number` | `7` | Days before showing again |

### Trigger Logic

The popup shows when:
1. User hasn't subscribed yet
2. User hasn't dismissed recently (within `dismissDays`)
3. One of the triggers is activated:
   - **Exit Intent**: Mouse leaves top of viewport
   - **Time Delay**: After specified milliseconds
   - **Scroll Depth**: After scrolling specified percentage

### LocalStorage Keys

- `newsletter_popup_dismissed`: Timestamp of last dismissal
- `newsletter_subscribed`: Boolean indicating subscription status

---

## 3. PortfolioModal Carousel Enhancement

**Location:** `src/components/organisms/PortfolioModal/`

### Features

- Support for multiple images via `gallery` field
- Fallback to single image if no gallery provided
- Smooth slide transitions with Framer Motion
- Bi-directional navigation (Previous/Next buttons)
- Keyboard navigation (Arrow Left/Right keys)
- Touch/swipe gestures for mobile (50px threshold)
- Visual indicators:
  - Dot navigation for quick slide access
  - Image counter (e.g., "1 / 5")
  - Navigation arrows (shown on hover/focus)
- Automatic carousel reset when switching projects

### Type Definition Update

```typescript
// src/types/index.ts
export interface PortfolioProject {
  // ... existing fields
  gallery?: string[];  // Optional image gallery for carousel
}
```

### Usage

Add a `gallery` array to portfolio projects in `src/lib/constants/config.ts`:

```typescript
{
  id: '1',
  title: 'Project Name',
  image: 'main-image.jpg',
  gallery: [
    'screenshot-1.jpg',
    'screenshot-2.jpg',
    'screenshot-3.jpg'
  ],
  // ... other fields
}
```

### Carousel Controls

- **Keyboard**: `Arrow Left` / `Arrow Right` to navigate
- **Mouse**: Click Previous/Next buttons (shown on hover)
- **Touch**: Swipe left/right on mobile devices
- **Dots**: Click dot indicators to jump to specific image

---

## 4. VideoPlayer Component

**Location:** `src/components/atoms/VideoPlayer/`

### Features

- Multi-source support:
  - YouTube embed (auto-detected)
  - Vimeo embed (auto-detected)
  - Direct video files (.mp4, .webm, etc.)
- Smart URL parsing with regex
- Thumbnail preview with play button overlay
- Custom video controls for direct videos:
  - Play/Pause button
  - Mute/Unmute toggle
  - Progress bar with seek functionality
  - Fullscreen mode
- Loading state with animated spinner
- Keyboard navigation (Arrow keys ±5s seek)
- Accessibility features (ARIA labels, captions support)

### Usage

```tsx
import VideoPlayer from '@/components/atoms/VideoPlayer';

function TestimonialCard() {
  return (
    <VideoPlayer
      url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      thumbnail="thumbnail.jpg"
      title="Client Testimonial"
      autoPlay={false}
      showControls={true}
      muted={false}
      loop={false}
      aspectRatio="16/9"
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | **Required** | Video URL (YouTube, Vimeo, or direct) |
| `thumbnail` | `string` | - | Optional thumbnail image URL |
| `title` | `string` | `"Video"` | Video title for accessibility |
| `autoPlay` | `boolean` | `false` | Auto-play video |
| `showControls` | `boolean` | `true` | Show video controls |
| `muted` | `boolean` | `false` | Muted by default |
| `loop` | `boolean` | `false` | Loop video |
| `aspectRatio` | `"16/9" \| "4/3" \| "1/1"` | `"16/9"` | Video aspect ratio |
| `className` | `string` | `""` | Additional CSS classes |

### Supported URL Formats

**YouTube:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

**Vimeo:**
- `https://vimeo.com/VIDEO_ID`
- `https://player.vimeo.com/video/VIDEO_ID`

**Direct Video:**
- Any direct video file URL (`.mp4`, `.webm`, `.ogg`, etc.)

### Type Definition Update

```typescript
// src/types/index.ts
export interface Testimonial {
  // ... existing fields
  videoUrl?: string;  // Optional video testimonial URL
}
```

### Keyboard Shortcuts (Direct Videos)

- `Space`: Play/Pause
- `Arrow Left`: Rewind 5 seconds
- `Arrow Right`: Forward 5 seconds
- `M`: Mute/Unmute
- `F`: Fullscreen

---

## Integration in App.tsx

All Sprint 6 components are integrated in `src/App.tsx`:

```tsx
import { lazy, Suspense } from 'react';

// Lazy load Sprint 6 components
const CookieConsent = lazy(() => import('./components/atoms/CookieConsent'));
const NewsletterPopup = lazy(() => import('./components/molecules/NewsletterPopup'));

function App() {
  return (
    <div className="App">
      {/* ... existing components ... */}

      {/* Cookie Consent Banner - Sprint 6 */}
      <Suspense fallback={null}>
        <CookieConsent position="bottom" showCustomize={true} />
      </Suspense>

      {/* Newsletter Popup with Exit-Intent - Sprint 6 */}
      <Suspense fallback={null}>
        <NewsletterPopup
          exitIntent={true}
          delay={10000}
          scrollPercentage={50}
          dismissDays={7}
        />
      </Suspense>
    </div>
  );
}
```

---

## Testing Checklist

### CookieConsent
- [ ] Banner appears on first visit
- [ ] Banner doesn't reappear after accepting/rejecting
- [ ] Customize modal opens and saves preferences
- [ ] LocalStorage persists user choices
- [ ] Privacy policy link works
- [ ] Analytics events fire correctly

### NewsletterPopup
- [ ] Exit-intent trigger works (mouse leaves top)
- [ ] Time delay trigger works
- [ ] Scroll percentage trigger works
- [ ] Doesn't show if already subscribed
- [ ] Respects dismiss period
- [ ] Form validation works (email, name)
- [ ] Success state displays after submission

### PortfolioModal Carousel
- [ ] Multiple images display in carousel
- [ ] Falls back to single image if no gallery
- [ ] Previous/Next buttons navigate correctly
- [ ] Keyboard arrows navigate slides
- [ ] Swipe gestures work on mobile
- [ ] Dot indicators work
- [ ] Image counter updates correctly
- [ ] Carousel resets when switching projects

### VideoPlayer
- [ ] YouTube URLs embed correctly
- [ ] Vimeo URLs embed correctly
- [ ] Direct video files play correctly
- [ ] Thumbnail shows before play
- [ ] Controls work (play/pause, mute, seek, fullscreen)
- [ ] Progress bar updates correctly
- [ ] Keyboard shortcuts work
- [ ] Loading state shows during load
- [ ] Accessibility features work (ARIA labels, captions)

---

## Performance Considerations

1. **Lazy Loading**: All Sprint 6 components are lazy-loaded with React.lazy() and Suspense
2. **Code Splitting**: Components are automatically split into separate chunks by Vite
3. **LocalStorage**: Minimizes server requests by caching user preferences
4. **Reduced Motion**: All animations respect `prefers-reduced-motion`
5. **Event Throttling**: Scroll and mouse events are throttled for performance

---

## Browser Compatibility

- **Chrome**: ✅ Fully supported
- **Firefox**: ✅ Fully supported
- **Safari**: ✅ Fully supported
- **Edge**: ✅ Fully supported
- **Mobile Safari**: ✅ Fully supported (with touch gestures)
- **Chrome Mobile**: ✅ Fully supported (with touch gestures)

---

## Future Enhancements

### Potential Additions:
1. **CookieConsent**: Add more granular cookie categories, GDPR compliance report
2. **NewsletterPopup**: A/B testing for different messaging, integration with email service providers
3. **PortfolioModal**: Video support in gallery, thumbnail previews for all images
4. **VideoPlayer**: Playback speed controls, picture-in-picture mode, chapters/timestamps

---

## Troubleshooting

### CookieConsent not showing
- Check LocalStorage: `pibelabs_cookie_consent` might already be set
- Clear LocalStorage and reload the page

### NewsletterPopup not triggering
- Verify triggers are enabled (`exitIntent`, `delay`, `scrollPercentage`)
- Check LocalStorage: `newsletter_subscribed` might be `true`
- Ensure you're waiting long enough or scrolling far enough

### PortfolioModal carousel not working
- Verify project has `gallery` array with multiple images
- Check browser console for errors
- Ensure images are accessible (CORS, 404 errors)

### VideoPlayer not loading
- Verify video URL is valid and accessible
- Check for CORS issues with direct video files
- Ensure YouTube/Vimeo embeds are allowed (not blocked by privacy settings)
- Check browser console for errors

---

## Credits

Sprint 6 components were developed as part of the PibeLabs Frontend project to enhance user engagement, ensure legal compliance, and improve conversion rates.

**Technologies Used:**
- React 18 (Hooks: useState, useEffect, useCallback, useRef)
- TypeScript (Strict mode)
- Framer Motion (Animations)
- React Hook Form + Zod (Form validation)
- Tailwind CSS (Styling)
- Lucide React (Icons)
