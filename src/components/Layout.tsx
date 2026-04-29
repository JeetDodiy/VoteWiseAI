import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Vote, MessageSquare, LayoutDashboard, Menu, X, ShieldCheck, LogOut, User } from 'lucide-react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/simulate', label: 'Practice', icon: Vote },
    { path: '/chat', label: 'Ask AI', icon: MessageSquare },
    { path: '/dashboard', label: 'Pulse', icon: LayoutDashboard },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl h-16 md:h-20 glass-panel z-50 flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-saffron-500/10 rounded-xl flex items-center justify-center text-saffron-500">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight">VoteWise</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-1 pr-4 py-1">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-saffron-500/20 flex items-center justify-center text-saffron-400">
                    <User size={16} />
                  </div>
                )}
                <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 py-2.5 px-4 text-sm rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all font-medium"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className="btn-primary py-2.5 px-6 text-sm"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-xl pt-28 px-4 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg transition-colors ${
                      isActive 
                        ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-500/20' 
                        : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    <Icon size={24} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {user ? (
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-saffron-500/20 flex items-center justify-center text-saffron-400">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white">{user.displayName || user.email?.split('@')[0]}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    className="flex items-center justify-center gap-2 py-4 w-full text-lg rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold"
                    onClick={() => { closeMenu(); handleSignOut(); }}
                  >
                    <LogOut size={20} /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="btn-primary mt-4 py-4 w-full text-lg"
                  onClick={() => { closeMenu(); navigate('/auth'); }}
                >
                  Sign In
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area with Page Transitions */}
      <main className="flex-1 pt-28 md:pt-36 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
