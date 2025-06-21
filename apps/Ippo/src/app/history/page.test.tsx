import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HistoryPage from './page';

// Mocks
const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockRouterPush }),
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
    removeItem: (key: string) => {
        delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true });

const mockRecords = [
  { task: 'Task 1', time: 300, date: new Date().toISOString() },
  { task: 'Task 2', time: 600, date: new Date().toISOString() },
];

describe('History Page', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
    localStorageMock.clear();
  });

  it('shows "noRecords" when there is no data', () => {
    render(<HistoryPage />);
    expect(screen.getByText('noRecords')).toBeInTheDocument();
  });

  it('displays records from localStorage', () => {
    localStorageMock.setItem('ippo-records', JSON.stringify(mockRecords));
    render(<HistoryPage />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('clears records when "clearHistory" button is clicked', () => {
    localStorageMock.setItem('ippo-records', JSON.stringify(mockRecords));
    render(<HistoryPage />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    
    const clearButton = screen.getByRole('button', { name: 'clearHistory' });
    fireEvent.click(clearButton);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('noRecords')).toBeInTheDocument();
    expect(localStorageMock.getItem('ippo-records')).toBeNull();
  });

  it('has a backHome button/link', () => {
    render(<HistoryPage />);
    const backButton = screen.getByRole('button', { name: 'backHome' });
    expect(backButton).toBeInTheDocument();
  });
}); 