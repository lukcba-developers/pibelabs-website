import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoPlayer from "./VideoPlayer";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock hooks
vi.mock("@/hooks", () => ({
  useReducedMotion: vi.fn(() => false),
}));

describe("VideoPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("YouTube Videos", () => {
    it("detects YouTube URL and renders iframe", () => {
      const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      render(<VideoPlayer url={youtubeUrl} title="Test YouTube Video" />);

      const iframe = screen.getByTitle("Test YouTube Video");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        expect.stringContaining("youtube.com/embed/dQw4w9WgXcQ"),
      );
    });

    it("detects short YouTube URL", () => {
      const youtubeUrl = "https://youtu.be/dQw4w9WgXcQ";
      render(<VideoPlayer url={youtubeUrl} title="Test YouTube Short" />);

      const iframe = screen.getByTitle("Test YouTube Short");
      expect(iframe).toHaveAttribute(
        "src",
        expect.stringContaining("youtube.com/embed/dQw4w9WgXcQ"),
      );
    });

    it("includes autoplay parameter when autoPlay is true", () => {
      const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      render(<VideoPlayer url={youtubeUrl} title="Test" autoPlay={true} />);

      const iframe = screen.getByTitle("Test");
      expect(iframe).toHaveAttribute(
        "src",
        expect.stringContaining("autoplay=1"),
      );
    });

    it("includes mute parameter when muted is true", () => {
      const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      render(<VideoPlayer url={youtubeUrl} title="Test" muted={true} />);

      const iframe = screen.getByTitle("Test");
      expect(iframe).toHaveAttribute("src", expect.stringContaining("mute=1"));
    });
  });

  describe("Vimeo Videos", () => {
    it("detects Vimeo URL and renders iframe", () => {
      const vimeoUrl = "https://vimeo.com/123456789";
      render(<VideoPlayer url={vimeoUrl} title="Test Vimeo Video" />);

      const iframe = screen.getByTitle("Test Vimeo Video");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        expect.stringContaining("player.vimeo.com/video/123456789"),
      );
    });

    it("includes autoplay parameter for Vimeo", () => {
      const vimeoUrl = "https://vimeo.com/123456789";
      render(<VideoPlayer url={vimeoUrl} title="Test" autoPlay={true} />);

      const iframe = screen.getByTitle("Test");
      expect(iframe).toHaveAttribute(
        "src",
        expect.stringContaining("autoplay=1"),
      );
    });
  });

  describe("Direct Video Files", () => {
    it("renders video element for direct video URLs", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test Direct Video" />);

      const video = screen.getByLabelText("Test Direct Video");
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute("src", directUrl);
    });

    it("applies muted attribute when muted prop is true", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" muted={true} />);

      const video = screen.getByLabelText("Test");
      expect(video).toHaveProperty("muted", true);
    });

    it("applies loop attribute when loop prop is true", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" loop={true} />);

      const video = screen.getByLabelText("Test");
      expect(video).toHaveProperty("loop", true);
    });

    it("includes track element for captions", () => {
      const directUrl = "https://example.com/video.mp4";
      const { container } = render(
        <VideoPlayer url={directUrl} title="Test" />,
      );

      const track = container.querySelector("track");
      expect(track).toBeInTheDocument();
      expect(track).toHaveAttribute("kind", "captions");
      expect(track).toHaveAttribute("srcLang", "es");
    });
  });

  describe("Thumbnail Feature", () => {
    it("displays thumbnail when provided and not auto-playing", () => {
      const directUrl = "https://example.com/video.mp4";
      const thumbnailUrl = "https://example.com/thumbnail.jpg";

      render(
        <VideoPlayer
          url={directUrl}
          thumbnail={thumbnailUrl}
          title="Test"
          autoPlay={false}
        />,
      );

      const thumbnail = screen.getByAltText("Test");
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail).toHaveAttribute("src", thumbnailUrl);
    });

    it("hides thumbnail on play button click", () => {
      const directUrl = "https://example.com/video.mp4";
      const thumbnailUrl = "https://example.com/thumbnail.jpg";

      render(
        <VideoPlayer
          url={directUrl}
          thumbnail={thumbnailUrl}
          title="Test"
          autoPlay={false}
        />,
      );

      const playButton = screen.getByLabelText("Reproducir video");
      fireEvent.click(playButton);

      const thumbnail = screen.queryByAltText("Test");
      expect(thumbnail).not.toBeInTheDocument();
    });
  });

  describe("Video Controls", () => {
    it("renders custom controls for direct videos when showControls is true", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={true} />);

      expect(screen.getByLabelText(/Reproducir/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Silenciar/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Pantalla completa/i)).toBeInTheDocument();
    });

    it("does not render custom controls when showControls is false", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={false} />);

      expect(screen.queryByLabelText(/Reproducir/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Silenciar/i)).not.toBeInTheDocument();
    });

    it("renders progress bar for direct videos", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={true} />);

      const progressBar = screen.getByRole("progressbar", {
        name: /Progreso del video/i,
      });
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute("aria-valuenow");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("Aspect Ratio", () => {
    it("applies 16:9 aspect ratio by default", () => {
      const directUrl = "https://example.com/video.mp4";
      const { container } = render(
        <VideoPlayer url={directUrl} title="Test" />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("aspect-video");
    });

    it("applies 4:3 aspect ratio when specified", () => {
      const directUrl = "https://example.com/video.mp4";
      const { container } = render(
        <VideoPlayer url={directUrl} title="Test" aspectRatio="4/3" />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("aspect-[4/3]");
    });

    it("applies 1:1 aspect ratio when specified", () => {
      const directUrl = "https://example.com/video.mp4";
      const { container } = render(
        <VideoPlayer url={directUrl} title="Test" aspectRatio="1/1" />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("aspect-square");
    });
  });

  describe("Accessibility", () => {
    it("includes proper ARIA labels for play button", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={true} />);

      const playButton = screen.getByLabelText(/Reproducir/i);
      expect(playButton).toBeInTheDocument();
    });

    it("includes proper ARIA labels for mute button", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={true} />);

      const muteButton = screen.getByLabelText(/Silenciar/i);
      expect(muteButton).toBeInTheDocument();
    });

    it("includes proper ARIA labels for fullscreen button", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={true} />);

      const fullscreenButton = screen.getByLabelText(/Pantalla completa/i);
      expect(fullscreenButton).toBeInTheDocument();
    });

    it("progress bar is keyboard accessible with tabIndex", () => {
      const directUrl = "https://example.com/video.mp4";
      render(<VideoPlayer url={directUrl} title="Test" showControls={true} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className when provided", () => {
      const directUrl = "https://example.com/video.mp4";
      const { container } = render(
        <VideoPlayer url={directUrl} title="Test" className="custom-class" />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom-class");
    });
  });
});
