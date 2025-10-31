import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('renders with default message', () => {
    render(<Loader />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<Loader message="Procesando datos..." />);
    expect(screen.getByText('Procesando datos...')).toBeInTheDocument();
  });

  it('displays the spinner image', () => {
    render(<Loader />);
    const spinner = screen.getByAltText('Loading');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('src', '/assets/images/pibelabs-loader-spinner.svg');
  });

  it('has proper accessibility attributes', () => {
    render(<Loader message="Loading content" />);
    const loaderContainer = screen.getByText('Loading content').closest('div');
    expect(loaderContainer).toHaveClass('text-cyan-400');
  });
});
