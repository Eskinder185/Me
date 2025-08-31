import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Download } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const typewriterTexts = [
    "I design secure AWS pipelines, hack on generative AI, and love turning bold ideas into working code.",
    "Think of this portfolio as my player's hub — choose a project below and hit start 🎮."
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      const fullText = typewriterTexts[currentText];
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setCurrentText((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentText, typewriterTexts]);

  const handleResumeClick = () => {
    // In a real app, this would open the PDF
    window.open('/assets/Eskinder_Kassahun_Resume.pdf', '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-violet-500/20 rotate-45 animate-pulse" />
        <div className="absolute top-40 right-20 w-8 h-8 bg-cyan-500/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-violet-500/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-cyan-500/20 rotate-12 animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-violet-500/30 transform rotate-45 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 border border-cyan-500/20 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
          <span className="text-2xl">👾</span>
          <span className="text-sm text-gray-300">Welcome to My Tech Universe</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          I'm{' '}
          <span className="gradient-text animate-gradient">
            Eskinder
          </span>
          {' '}— part cloud engineer, part security geek, part AI explorer.
        </h1>

        {/* Typewriter Text */}
        <div className="text-xl md:text-2xl text-gray-300 mb-12 h-32 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="max-w-3xl leading-relaxed">
            {displayText}
            <span className="inline-block w-3 h-6 bg-violet-500 ml-1 animate-pulse" />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={() => onNavigate('projects')}
            className="relative px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 group"
          >
            <span className="flex items-center gap-2">
              Explore Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          
          <Button
            onClick={handleResumeClick}
            variant="outline"
            className="relative px-8 py-4 border-2 border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:border-violet-500/50 group"
          >
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5 transition-transform group-hover:translate-y-1" />
              View Résumé
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;