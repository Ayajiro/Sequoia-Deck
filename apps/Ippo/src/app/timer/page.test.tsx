import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TimerPage from './page';

// Mocks
const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockRouterPush }),
  useSearchParams: () => {
    const params = new URLSearchParams();
    params.set('task', 'My Test Task');
    return params;
  }
}));

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { language: 'en', changeLanguage: vi.fn(), t: (key: string) => key },
    }),
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Timer Page', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
    localStorageMock.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays the task from URL and starts the timer', () => {
    render(<TimerPage />);
    expect(screen.getByRole('heading', { name: 'My Test Task' })).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:00:02')).toBeInTheDocument();
  });

  it('pauses and resumes the timer', () => {
    render(<TimerPage />);
    
    act(() => {
        vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:00:01')).toBeInTheDocument();
    
    const pauseButton = screen.getByRole('button', { name: 'pause' });
    fireEvent.click(pauseButton);
    
    act(() => {
        vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('00:00:01')).toBeInTheDocument();
    
    const resumeButton = screen.getByRole('button', { name: 'resume' });
    fireEvent.click(resumeButton);

    act(() => {
        vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:00:03')).toBeInTheDocument();
  });

  it('stops the timer, saves to localStorage, and navigates home', () => {
    render(<TimerPage />);
    
    act(() => {
        vi.advanceTimersByTime(5000);
    });

    const stopButton = screen.getByRole('button', { name: 'stop' });
    fireEvent.click(stopButton);

    const records = JSON.parse(localStorage.getItem('ippo-records') || '[]');
    expect(records).toHaveLength(1);
    expect(records[0].task).toBe('My Test Task');
    expect(records[0].time).toBe(5); // Due to the 5-second interval save
    
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
}); 