import React from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              Eskinder Kassahun
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Cloud Security Engineer & Full-Stack Developer passionate about building 
              secure, scalable, and innovative solutions.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Home
              </a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                About
              </a>
              <a href="#experience" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Experience
              </a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Projects
              </a>
              <a href="#case-studies" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Case Studies
              </a>
              <a href="#books" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Books
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">eskinder.kassahun@example.com</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSocialClick('https://github.com/eskinder')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 group"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>
                <button
                  onClick={() => handleSocialClick('https://linkedin.com/in/eskinder-kassahun')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 group"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>
                <button
                  onClick={() => handleSocialClick('mailto:eskinder.kassahun@example.com')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 group"
                  title="Email"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>© {currentYear} Eskinder Kassahun</span>
            <span>•</span>
            <span>Built with React & Tailwind CSS</span>
          </div>

          <Button
            onClick={handleBackToTop}
            variant="ghost"
            size="sm"
            className="mt-4 md:mt-0 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group"
          >
            <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform duration-200" />
            Back to Top
          </Button>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;