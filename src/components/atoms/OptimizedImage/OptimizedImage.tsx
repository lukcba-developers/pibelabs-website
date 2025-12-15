import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  objectFit = "cover",
  priority = false,
  quality = 75,
  blur = true,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const formats = getSupportedFormats();
    const optimizedSrc = getOptimizedSrc(src, { width, quality, formats });
    setCurrentSrc(optimizedSrc);
  }, [src, width, quality]);

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: "50px" },
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const blurDataURL = blur
    ? generateBlurDataURL(width || 400, height || 300)
    : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {blur && !isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-dark-secondary to-dark-primary"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-secondary">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      ) : (
        <motion.img
          ref={imgRef}
          src={priority ? currentSrc : undefined}
          data-src={!priority ? currentSrc : undefined}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-${objectFit} transition-opacity duration-300`}
          style={{
            opacity: isLoaded ? 1 : 0,
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: "cover",
          }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};

function getSupportedFormats(): string[] {
  if (typeof window === "undefined") return ["webp", "jpg"];

  const formats: string[] = [];

  // Check AVIF support
  const avif =
    document
      .createElement("canvas")
      .toDataURL("image/avif")
      .indexOf("data:image/avif") === 0;
  if (avif) formats.push("avif");

  // Check WebP support
  const webp =
    document
      .createElement("canvas")
      .toDataURL("image/webp")
      .indexOf("data:image/webp") === 0;
  if (webp) formats.push("webp");

  formats.push("jpg");
  return formats;
}

function getOptimizedSrc(
  src: string,
  options: { width?: number; quality?: number; formats?: string[] },
): string {
  if (!src) return "";

  // If external URL or already optimized, return as-is
  if (src.startsWith("http") || src.includes("?")) {
    return src;
  }

  const { width, quality = 75, formats = ["webp", "jpg"] } = options;
  const params = new URLSearchParams();

  if (width) params.append("w", width.toString());
  params.append("q", quality.toString());
  params.append("fm", formats[0] || "webp");

  return `${src}?${params.toString()}`;
}

function generateBlurDataURL(width: number, height: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1a1a2e");
  gradient.addColorStop(1, "#16213e");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/png");
}

export default OptimizedImage;
