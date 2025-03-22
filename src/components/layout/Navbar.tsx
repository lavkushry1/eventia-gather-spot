
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/events' },
    { title: 'Categories', path: '/categories' },
    { title: 'About', path: '/about' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-3 glassmorphism shadow-sm" : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-primary"
          >
            Event<span className="text-accent">ia</span>
          </motion.div>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {link.title}
              </motion.span>
            </Link>
          ))}
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center">
          <button className="mr-2 rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <Search size={20} />
          </button>
          
          <Link to="/cart" className="relative mr-2 rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              2
            </span>
          </Link>
          
          <AnimatedButton
            variant="accent"
            size="sm"
            className="hidden md:inline-flex ml-2"
          >
            Sign In
          </AnimatedButton>
          
          <button
            className="ml-2 md:hidden rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism border-t border-border/50 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "bg-secondary text-accent"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {link.title}
                </Link>
              ))}
              <AnimatedButton
                variant="accent"
                size="sm"
                fullWidth
                className="mt-4"
              >
                Sign In
              </AnimatedButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
