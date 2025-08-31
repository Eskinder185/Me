import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onThemeToggle,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'books', label: 'Books' },
    { id: 'contact', label: 'Get in Touch' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
          >
            Eskinder Kassahun
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-white ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg opacity-20 scale-95" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg opacity-0 hover:opacity-10 scale-95 hover:scale-100 transition-all duration-200" />
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="relative hover:bg-white/10 hover:scale-105 transition-all duration-200"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 hover:opacity-20 transition-opacity duration-200" />
            {isDark ? (
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-200" />
            ) : (
              <Moon className="h-5 w-5 rotate-0 scale-100 transition-all duration-200" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;