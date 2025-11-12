import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PortfolioModal from "./PortfolioModal";
import type { PortfolioProject } from "@/types";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock hooks
vi.mock("@/hooks", () => ({
  useFocusTrap: vi.fn(() => ({ current: null })),
  useReducedMotion: vi.fn(() => false),
}));

// Mock LazyImage
vi.mock("@/components/atoms/LazyImage", () => ({
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe("PortfolioModal", () => {
  const mockProject: PortfolioProject = {
    id: "1",
    title: "Test Project",
    description: "This is a test project description",
    image: "https://example.com/image.jpg",
    category: "Web Development",
    tags: ["React", "TypeScript", "Tailwind"],
    year: 2024,
    link: "https://example.com",
    github: "https://github.com/test/repo",
    featured: true,
    status: "production",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    achievements: ["Achievement 1", "Achievement 2"],
    techStack: {
      frontend: ["React", "TypeScript"],
      backend: ["Node.js", "Express"],
      database: ["PostgreSQL"],
      infrastructure: ["AWS", "Docker"],
      tools: ["Git", "VSCode"],
    },
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset body overflow style
    document.body.style.overflow = "unset";
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <PortfolioModal
        project={mockProject}
        isOpen={false}
        onClose={mockOnClose}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not render when project is null", () => {
    const { container } = render(
      <PortfolioModal project={null} isOpen={true} onClose={mockOnClose} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders project title when open", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders project description", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(
      screen.getByText("This is a test project description"),
    ).toBeInTheDocument();
  });

  it("renders project image", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const image = screen.getByAltText(/Test Project - Imagen 1/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("renders close button", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByLabelText("Cerrar modal");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByLabelText("Cerrar modal");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const backdrop = screen.getByRole("dialog").previousSibling as HTMLElement;
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders all project tags", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("renders project features when available", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders project achievements when available", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("Achievement 1")).toBeInTheDocument();
    expect(screen.getByText("Achievement 2")).toBeInTheDocument();
  });

  it("renders tech stack sections", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    // Frontend
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getAllByText("React")[0]).toBeInTheDocument();

    // Backend
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();

    // Database
    expect(screen.getByText("Base de Datos")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();

    // Infrastructure
    expect(screen.getByText("Infraestructura")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();

    // Tools
    expect(screen.getByText("Herramientas & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Git")).toBeInTheDocument();
    expect(screen.getByText("VSCode")).toBeInTheDocument();
  });

  it("renders project link when available", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const link = screen.getByRole("link", {
      name: /Ver Proyecto en Vivo/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays production status badge", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("✓ En Producción")).toBeInTheDocument();
  });

  it("displays development status badge", () => {
    const devProject = { ...mockProject, status: "development" as const };
    render(
      <PortfolioModal
        project={devProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("🔧 En Desarrollo")).toBeInTheDocument();
  });

  it("displays completed status badge", () => {
    const completedProject = { ...mockProject, status: "completed" as const };
    render(
      <PortfolioModal
        project={completedProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("Completado")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("sets body overflow to hidden when open", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("has proper ARIA attributes", () => {
    render(
      <PortfolioModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });

  describe("Carousel functionality", () => {
    const projectWithGallery: PortfolioProject = {
      ...mockProject,
      gallery: [
        "https://example.com/img1.jpg",
        "https://example.com/img2.jpg",
        "https://example.com/img3.jpg",
      ],
    };

    it("renders carousel navigation when multiple images", () => {
      render(
        <PortfolioModal
          project={projectWithGallery}
          isOpen={true}
          onClose={mockOnClose}
        />,
      );

      expect(screen.getByLabelText("Imagen anterior")).toBeInTheDocument();
      expect(screen.getByLabelText("Siguiente imagen")).toBeInTheDocument();
    });

    it("displays image counter when multiple images", () => {
      render(
        <PortfolioModal
          project={projectWithGallery}
          isOpen={true}
          onClose={mockOnClose}
        />,
      );

      expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });

    it("renders dot indicators for each image", () => {
      render(
        <PortfolioModal
          project={projectWithGallery}
          isOpen={true}
          onClose={mockOnClose}
        />,
      );

      const dotButtons = screen.getAllByLabelText(/Ir a imagen \d+/);
      expect(dotButtons).toHaveLength(3);
    });

    it("navigates to next image when next button clicked", async () => {
      render(
        <PortfolioModal
          project={projectWithGallery}
          isOpen={true}
          onClose={mockOnClose}
        />,
      );

      const nextButton = screen.getByLabelText("Siguiente imagen");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText("2 / 3")).toBeInTheDocument();
      });
    });

    it("navigates to previous image when previous button clicked", async () => {
      render(
        <PortfolioModal
          project={projectWithGallery}
          isOpen={true}
          onClose={mockOnClose}
        />,
      );

      const prevButton = screen.getByLabelText("Imagen anterior");
      fireEvent.click(prevButton);

      // Should wrap to last image
      await waitFor(() => {
        expect(screen.getByText("3 / 3")).toBeInTheDocument();
      });
    });

    it("does not show carousel controls for single image", () => {
      render(
        <PortfolioModal
          project={mockProject}
          isOpen={true}
          onClose={mockOnClose}
        />,
      );

      expect(
        screen.queryByLabelText("Imagen anterior"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText("Siguiente imagen"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/\d+ \/ \d+/)).not.toBeInTheDocument();
    });
  });
});
