import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useReducedMotion } from "@/hooks";

/* ============================================
   VideoPlayer Component (Atom) - Sprint 6
   Versatile Video Player for Testimonials
   ============================================ */

interface VideoPlayerProps {
  /** Video URL (YouTube, Vimeo, or direct video file) */
  url: string;
  /** Optional thumbnail image URL */
  thumbnail?: string;
  /** Optional title for accessibility */
  title?: string;
  /** Auto-play video (default: false) */
  autoPlay?: boolean;
  /** Show controls (default: true) */
  showControls?: boolean;
  /** Muted by default (default: false) */
  muted?: boolean;
  /** Loop video (default: false) */
  loop?: boolean;
  /** Aspect ratio (default: "16/9") */
  aspectRatio?: "16/9" | "4/3" | "1/1";
  /** Optional CSS class name */
  className?: string;
}

type VideoType = "youtube" | "vimeo" | "direct";

const VideoPlayer = ({
  url,
  thumbnail,
  title = "Video",
  autoPlay = false,
  showControls = true,
  muted = false,
  loop = false,
  aspectRatio = "16/9",
  className = "",
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(!autoPlay);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect video type and extract ID
  const getVideoTypeAndId = (
    videoUrl: string,
  ): {
    type: VideoType;
    id: string;
  } => {
    // YouTube detection
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const youtubeMatch = videoUrl.match(youtubeRegex);
    if (youtubeMatch) {
      return { type: "youtube", id: youtubeMatch[1] ?? "" };
    }

    // Vimeo detection
    const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/;
    const vimeoMatch = videoUrl.match(vimeoRegex);
    if (vimeoMatch) {
      return { type: "vimeo", id: vimeoMatch[1] ?? "" };
    }

    // Direct video file
    return { type: "direct", id: videoUrl };
  };

  const { type: videoType, id: videoId } = getVideoTypeAndId(url);

  // Get embedded URL for iframe videos
  const getEmbedUrl = (): string | null => {
    if (videoType === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${showControls ? 1 : 0}`;
    }
    if (videoType === "vimeo") {
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${showControls ? 1 : 0}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  // Handle play/pause for direct videos
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setShowThumbnail(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const element = videoRef.current || iframeRef.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const value =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(value);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  // Update progress for direct videos
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("timeupdate", handleProgress);
    return () => {
      video.removeEventListener("timeupdate", handleProgress);
    };
  }, []);

  const aspectRatioClass =
    aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "4/3"
        ? "aspect-[4/3]"
        : "aspect-square";

  return (
    <div
      className={`relative ${aspectRatioClass} bg-black rounded-xl overflow-hidden group ${className}`}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-cyan-neon border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Thumbnail Overlay */}
      {showThumbnail && thumbnail && (
        <div className="absolute inset-0 z-10">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => {
              setShowThumbnail(false);
              setIsPlaying(true);
              if (videoRef.current) videoRef.current.play();
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
            aria-label="Reproducir video"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              className="w-20 h-20 rounded-full bg-cyan-neon/90 flex items-center justify-center"
            >
              <Play size={40} className="text-white ml-2" fill="white" />
            </motion.div>
          </button>
        </div>
      )}

      {/* YouTube/Vimeo Embed */}
      {embedUrl && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        />
      )}

      {/* Direct Video */}
      {videoType === "direct" && (
        <>
          <video
            ref={videoRef}
            src={url}
            className="w-full h-full object-cover"
            loop={loop}
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            aria-label={title}
          >
            {/* Empty track for accessibility compliance */}
            <track kind="captions" srcLang="es" label="Spanish" />
          </video>

          {/* Custom Controls for Direct Videos */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Progress Bar */}
              <div
                role="progressbar"
                aria-label="Progreso del video"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
                className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-neon"
                onClick={handleSeek}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" && videoRef.current) {
                    videoRef.current.currentTime -= 5;
                  } else if (e.key === "ArrowRight" && videoRef.current) {
                    videoRef.current.currentTime += 5;
                  }
                }}
              >
                <motion.div
                  className="h-full bg-cyan-neon rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={false}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-cyan-neon transition-colors"
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>

                  {/* Mute/Unmute */}
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-cyan-neon transition-colors"
                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-cyan-neon transition-colors"
                  aria-label="Pantalla completa"
                >
                  <Maximize size={24} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
