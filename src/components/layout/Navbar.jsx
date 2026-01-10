import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Film, Menu, X, User, LogOut, LayoutDashboard, History, Settings, ChevronDown, Download } from 'lucide-react';
import { clsx } from 'clsx';

// Inline Google Icon
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
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group text-sm font-medium",
                isActive 
                    ? "text-black bg-zinc-100/80 font-semibold" 
                    : "text-zinc-500 hover:text-black hover:bg-zinc-50 hover:scale-[1.02]",
                disabled && "opacity-50 pointer-events-none"
            )}
        >
            {Icon && <Icon size={18} className={clsx("transition-colors", isActive ? "text-black" : "text-zinc-400 group-hover:text-black")} />}
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

    // Handle Scroll for Sticky Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
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
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    // Close mobile menu on route change
    const location = useLocation();
    useEffect(() => {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
    }, [location]);

    return (
        <>
        <nav 
            className={clsx(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
                scrolled 
                    ? "bg-white/90 backdrop-blur-md h-16 shadow-sm border-zinc-200/50" 
                    : "bg-white h-20 border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                
                {/* Left: Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-black text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-black/20">
                        <Film size={20} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-xl tracking-tight text-black leading-none group-hover:opacity-80 transition-opacity">Reelspot</span>
                        <span className={clsx(
                             "text-[10px] text-zinc-400 font-semibold uppercase tracking-widest transition-all duration-300",
                             scrolled ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
                        )}>
                            Media Downloader
                        </span>
                    </div>
                </Link>

                {/* Center: Quick Stats (Desktop) - Placeholder for now could be real later */}
                <div className="hidden md:flex items-center">
                    {/* Future: <span className="text-xs font-bold px-2 py-1 bg-zinc-100 rounded-full text-zinc-500">v2.0</span> */}
                </div>

                {/* Right: Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {user ? (
                        <>
                            <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                            <NavLink to="/history" icon={History} label="History" />
                            <NavLink to="/settings" icon={Settings} label="Settings" />
                            
                            <div className="w-px h-6 bg-zinc-200 mx-3" />
                            
                            {/* User Menu */}
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className={clsx(
                                        "flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border transition-all duration-200 hover:shadow-md",
                                        userDropdownOpen ? "bg-zinc-50 border-zinc-200" : "bg-white border-transparent hover:bg-zinc-50"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden border border-zinc-100 relative">
                                        {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Ava" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-500 bg-zinc-100">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <ChevronDown size={14} className={clsx("text-zinc-400 transition-transform duration-200", userDropdownOpen && "rotate-180")} />
                                </button>

                                {/* Desktop Dropdown */}
                                {userDropdownOpen && (
                                    <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2 z-50 animate-slide-down origin-top-right ring-1 ring-black/5">
                                        
                                        {/* User Info Header */}
                                        <div className="px-4 py-3 bg-zinc-50/50 rounded-xl mb-2 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 overflow-hidden flex-shrink-0">
                                                 {user.user_metadata?.avatar_url ? (
                                                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center font-bold text-zinc-400">
                                                        {user.email?.[0].toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="font-bold text-sm text-zinc-900 truncate leading-tight">{user.user_metadata?.full_name || 'User'}</p>
                                                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-0.5">
                                            <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-xl transition-all group">
                                                <User size={16} className="text-zinc-400 group-hover:text-black transition-colors" /> View Profile
                                            </Link>
                                            <div className="my-1 border-t border-zinc-100" />
                                            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-xl transition-all group">
                                                <LayoutDashboard size={16} className="text-zinc-400 group-hover:text-black transition-colors" /> Dashboard
                                            </Link>
                                            <Link to="/history" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-xl transition-all group">
                                                <History size={16} className="text-zinc-400 group-hover:text-black transition-colors" /> History
                                            </Link>
                                        </div>

                                        <div className="my-1 border-t border-zinc-100" />
                                        
                                        <button 
                                            onClick={signOut}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
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
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-sm transition-all active:scale-95"
                        >
                            <GIcon /> 
                            <span>Sign in with Google</span>
                        </button>
                    )}
                </div>

                {/* Right: Mobile Toggle */}
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors active:scale-90"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
            </div>
        </nav>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Drawer */}
                <div className="relative w-[300px] h-full bg-white shadow-2xl flex flex-col animate-slide-left z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                        <span className="font-bold text-xl tracking-tight">Menu</span>
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors active:scale-90"
                            aria-label="Close Menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                        {user ? (
                            <>
                                {/* Mobile User Profile */}
                                <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 overflow-hidden flex-shrink-0 shadow-sm">
                                         {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-zinc-400">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-sm truncate">{user.user_metadata?.full_name}</p>
                                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <NavLink to="/" label="Home" icon={Film} onClick={() => setMobileMenuOpen(false)} />
                                    <NavLink to="/dashboard" label="Dashboard" icon={LayoutDashboard} onClick={() => setMobileMenuOpen(false)} />
                                    <NavLink to="/history" label="History" icon={History} onClick={() => setMobileMenuOpen(false)} />
                                    <NavLink to="/settings" label="Settings" icon={Settings} onClick={() => setMobileMenuOpen(false)} />
                                </div>

                                <button 
                                    onClick={() => { signOut(); setMobileMenuOpen(false); }}
                                    className="mt-auto w-full py-3.5 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                                >
                                    <LogOut size={20} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center gap-6">
                                <div className="text-center space-y-2">
                                     <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-400">
                                         <User size={32} />
                                     </div>
                                     <h3 className="font-bold text-lg">Welcome to Reelspot</h3>
                                     <p className="text-sm text-zinc-500 max-w-[200px] mx-auto">Sign in to manage your downloads and access history.</p>
                                </div>
                                <button 
                                    onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }}
                                    className="w-full py-3.5 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/20"
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
