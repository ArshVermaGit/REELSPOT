import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Film, Menu, X, User, LogOut, LayoutDashboard, History, Settings, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

// Inline Google Icon with cleaner sizing
const GIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.52 12.29C23.52 11.43 23.47 10.73 23.32 10.13H12V14.51H18.47C18.18 15.99 17.25 17.24 15.94 18.04V20.97H19.81C22.07 18.89 23.52 15.82 23.52 12.29Z" fill="#4285F4"/>
        <path d="M12 24C15.24 24 17.96 22.92 19.81 20.97L15.94 18.04C14.86 18.75 13.51 19.14 12 19.14C8.87 19.14 6.22 17.06 5.27 14.29H1.26V17.38C3.17 21.19 7.11 24 12 24Z" fill="#34A853"/>
        <path d="M5.27 14.29C5.02 13.56 4.89 12.79 4.89 12C4.89 11.21 5.03 10.44 5.27 9.7V6.62H1.26C0.46 8.23 0 10.06 0 12C0 13.94 0.46 15.77 1.25 17.38L5.27 14.29Z" fill="#FBBC05"/>
        <path d="M12 4.86C13.77 4.86 15.35 5.47 16.6 6.66L20.12 3.12C17.96 1.1 15.24 0 12 0C7.11 0 3.17 2.81 1.26 6.62L5.27 9.7C6.22 6.93 8.87 4.86 12 4.86Z" fill="#EA4335"/>
    </svg>
);

const NavLink = ({ to, icon: Icon, label, disabled, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link 
            to={to} 
            onClick={onClick}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-bold",
                isActive 
                    ? "text-white bg-black shadow-lg shadow-black/10 scale-105" 
                    : "text-zinc-500 hover:text-black hover:bg-zinc-50"
            )}
        >
            {Icon && <Icon size={16} className={clsx("transition-colors", isActive ? "text-white" : "text-zinc-400 group-hover:text-black")} />}
            {label}
        </Link>
    );
};

const Navbar = () => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    // Handle Scroll for Sticky Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close Dropdown on Click Outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Disable Body Scroll on Mobile Menu
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    // Close menus on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
    }, [location]);

    return (
        <>
        <nav 
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled 
                    ? "bg-white/80 backdrop-blur-xl h-16 border-b border-zinc-200/50 shadow-sm/5" 
                    : "bg-transparent h-24 border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                
                {/* Left: Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-black blur-lg opacity-20 group-hover:opacity-30 transition-opacity rounded-full" />
                        <img 
                            src="/logo.png" 
                            alt="Reelspot" 
                            className="w-10 h-10 relative z-10 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-[900] text-xl tracking-tight text-zinc-900 leading-none">Reelspot</span>
                    </div>
                </Link>

                {/* Right: Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    {user ? (
                        <>
                            <div className="flex items-center bg-white/50 backdrop-blur-sm p-1.5 rounded-full border border-zinc-200/50 mr-4">
                                <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                                <NavLink to="/history" icon={History} label="History" />
                                <NavLink to="/settings" icon={Settings} label="Settings" />
                            </div>
                            
                            {/* User Menu */}
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className={clsx(
                                        "flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all duration-200",
                                        userDropdownOpen 
                                            ? "bg-black text-white border-black ring-2 ring-black/10" 
                                            : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden border border-zinc-100/50 relative">
                                        {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Ava" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-500 bg-zinc-100">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <ChevronDown size={14} className={clsx("transition-transform duration-200", userDropdownOpen ? "rotate-180 text-white" : "text-zinc-400")} />
                                </button>

                                {/* Desktop Dropdown */}
                                {userDropdownOpen && (
                                    <div className="absolute right-0 top-14 w-64 bg-white/90 backdrop-blur-xl rounded-[20px] shadow-2xl border border-zinc-100 p-2 z-50 animate-slide-down origin-top-right ring-1 ring-black/5">
                                        <div className="px-4 py-3 bg-zinc-50/50 rounded-2xl mb-2">
                                            <p className="font-bold text-sm text-zinc-900 truncate">{user.user_metadata?.full_name || 'User'}</p>
                                            <p className="text-xs text-zinc-500 truncate font-medium">{user.email}</p>
                                        </div>
                                        
                                        <button 
                                            onClick={signOut}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                                        >
                                            <LogOut size={16} className="group-hover:scale-110 transition-transform" /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <button 
                            onClick={signInWithGoogle}
                            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-bold hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 transition-all active:scale-95"
                        >
                            <GIcon /> 
                            <span>Get Started</span>
                        </button>
                    )}
                </div>

                {/* Right: Mobile Toggle */}
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden p-3 text-zinc-900 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors active:scale-90"
                    aria-label="Open Menu"
                >
                    <Menu size={20} />
                </button>
            </div>
        </nav>

        {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end">
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Drawer */}
                <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-slide-left">
                    <div className="flex items-center justify-between p-6">
                        <span className="font-[900] text-xl tracking-tight">Menu</span>
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors active:scale-90"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                    <div className="p-2 bg-white rounded-xl shadow-sm"><LayoutDashboard size={20} /></div>
                                    <span className="font-bold text-zinc-900">Dashboard</span>
                                </Link>
                                <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                    <div className="p-2 bg-white rounded-xl shadow-sm"><History size={20} /></div>
                                    <span className="font-bold text-zinc-900">History</span>
                                </Link>
                                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                    <div className="p-2 bg-white rounded-xl shadow-sm"><Settings size={20} /></div>
                                    <span className="font-bold text-zinc-900">Settings</span>
                                </Link>

                                <button 
                                    onClick={() => { signOut(); setMobileMenuOpen(false); }}
                                    className="mt-auto w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                                >
                                    <LogOut size={20} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="mt-8 text-center space-y-6">
                                <p className="text-zinc-500 font-medium px-8">Sign in to manage your downloads and access history.</p>
                                <button 
                                    onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-black/20"
                                >
                                    <GIcon /> Sign In with Google
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;
