import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as authService from './services/authService';
import * as logService from './services/logService';

jest.mock('./services/authService');
jest.mock('./services/logService');

describe('App Component', () => {
  it('renders login form when user is not authenticated', () => {
    authService.useAuth = jest.fn().mockReturnValue({
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    render(<App />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays logs after user is authenticated', async () => {
    const fakeLogs = [
      { id: 1, message: 'Log 1', timestamp: '2021-01-01T00:00:00Z' },
      { id: 2, message: 'Log 2', timestamp: '2021-01-02T00:00:00Z' },
    ];

    authService.useAuth = jest.fn().mockReturnValue({
      user: { name: 'Test User' },
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    logService.getLogEntries = jest.fn().mockResolvedValue(fakeLogs);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/log 1/i)).toBeInTheDocument();
      expect(screen.getByText(/log 2/i)).toBeInTheDocument();
    });
  });

  it('handles login', async () => {
    const signIn = jest.fn();
    authService.useAuth = jest.fn().mockReturnValue({
      user: null,
      signIn,
      signOut: jest.fn(),
    });

    render(<App />);
    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('testuser', 'password');
    });
  });

  it('handles logout', async () => {
    const signOut = jest.fn();
    authService.useAuth = jest.fn().mockReturnValue({
      user: { name: 'Test User' },
      signIn: jest.fn(),
      signOut,
    });

    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /sign out/i }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});