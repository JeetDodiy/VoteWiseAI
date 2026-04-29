import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import LearnModule from './pages/LearnModule';
import Simulator from './pages/Simulator';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="learn" element={<LearnModule />} />
          <Route path="simulate" element={<Simulator />} />
          <Route path="chat" element={<Chatbot />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
