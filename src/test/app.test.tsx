/**
 * @file VoteWise AI — Unit Tests
 * @description Core unit tests verifying key application behaviours.
 * Run with:  npm test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// Mock firebase to prevent real network calls during testing
// ─────────────────────────────────────────────────────────────────────────────
vi.mock('../firebaseConfig', () => ({
  auth: {},
  googleProvider: {},
  analytics: {},
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((_auth, cb) => { cb(null); return () => {}; }),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  getAuth: vi.fn(() => ({})),
  GoogleAuthProvider: vi.fn(() => ({})),
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

// ─────────────────────────────────────────────────────────────────────────────
// Test 1: AuthPage renders correctly
// ─────────────────────────────────────────────────────────────────────────────
describe('AuthPage', () => {
  it('renders the Sign In heading and form fields', async () => {
    const { default: AuthPage } = await import('../pages/AuthPage');

    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Test 2: Simulator — CAST VOTE button is disabled until a candidate is chosen
// ─────────────────────────────────────────────────────────────────────────────
describe('Simulator', () => {
  it('disables CAST VOTE button before any candidate is selected', async () => {
    const { default: Simulator } = await import('../pages/Simulator');

    render(
      <MemoryRouter>
        <Simulator />
      </MemoryRouter>
    );

    const voteBtn = screen.getByRole('button', { name: /cast vote/i });
    expect(voteBtn).toBeDisabled();
  });

  it('enables CAST VOTE button after a candidate is selected', async () => {
    const { default: Simulator } = await import('../pages/Simulator');

    render(
      <MemoryRouter>
        <Simulator />
      </MemoryRouter>
    );

    // Click the first candidate's vote button
    const candidateBtns = screen.getAllByRole('button', { name: /vote for/i });
    fireEvent.click(candidateBtns[0]);

    const voteBtn = screen.getByRole('button', { name: /cast vote/i });
    expect(voteBtn).not.toBeDisabled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Test 3: Chatbot — renders and accepts user input
// ─────────────────────────────────────────────────────────────────────────────
describe('Chatbot', () => {
  it('renders the chat input and initial greeting', async () => {
    const { default: Chatbot } = await import('../pages/Chatbot');

    render(
      <MemoryRouter>
        <Chatbot />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/ask anything about voting/i)).toBeInTheDocument();
    // Use heading role to avoid matching the multiple "VoteWise AI" text occurrences
    expect(screen.getByRole('heading', { name: /VoteWise AI/i })).toBeInTheDocument();
  });
});
