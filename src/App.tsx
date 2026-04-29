import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy-load all page components for code splitting & faster initial load
const LandingPage  = lazy(() => import('./pages/LandingPage'));
const Onboarding   = lazy(() => import('./pages/Onboarding'));
const LearnModule  = lazy(() => import('./pages/LearnModule'));
const Simulator    = lazy(() => import('./pages/Simulator'));
const Chatbot      = lazy(() => import('./pages/Chatbot'));
const Dashboard    = lazy(() => import('./pages/Dashboard'));
const AuthPage     = lazy(() => import('./pages/AuthPage'));

/** Full-screen spinner shown while a lazy page chunk is loading */
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="w-10 h-10 border-4 border-saffron-500/30 border-t-saffron-500 rounded-full animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/**
 * Root application component.
 * Sets up client-side routing with React Router v6 and
 * wraps all route pages in a Suspense boundary for lazy loading.
 */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index                   element={<LandingPage />}  />
            <Route path="onboarding"       element={<Onboarding />}   />
            <Route path="learn"            element={<LearnModule />}   />
            <Route path="simulate"         element={<Simulator />}     />
            <Route path="chat"             element={<Chatbot />}       />
            <Route path="dashboard"        element={<Dashboard />}     />
            <Route path="auth"             element={<AuthPage />}      />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
