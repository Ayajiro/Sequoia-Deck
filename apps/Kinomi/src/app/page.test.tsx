import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Index from './page';
import { useTranslation } from 'react-i18next';

// Mock next/navigation
const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock react-i18next with partial mocking
vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: vi.fn(),
        t: (key: string) => key,
      },
    }),
  };
});


describe('Index Page', () => {
  beforeEach(() => {
    // Clear mock history before each test
    mockRouterPush.mockClear();
  });

  it('renders the greeting message', () => {
    render(<Index />);
    // Check for one of the possible greetings
    expect(screen.getByText(/greeting/)).toBeInTheDocument();
  });

  it('navigates to history page when history button is clicked', () => {
    render(<Index />);
    const historyButton = screen.getByRole('button', { name: 'history' });
    fireEvent.click(historyButton);
    expect(mockRouterPush).toHaveBeenCalledWith('/history');
  });

  it('navigates to timer page with task when "Go" is clicked', () => {
    render(<Index />);
    const input = screen.getByPlaceholderText('placeholder');
    const goButton = screen.getByRole('button', { name: 'go' });
    const taskName = 'My Test Task';

    fireEvent.change(input, { target: { value: taskName } });
    fireEvent.click(goButton);

    expect(mockRouterPush).toHaveBeenCalledWith(`/timer?task=${encodeURIComponent(taskName)}`);
  });

  it('does not navigate if task name is empty', () => {
    render(<Index />);
    const goButton = screen.getByRole('button', { name: 'go' });
    fireEvent.click(goButton);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
}); 