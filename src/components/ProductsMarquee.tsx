import React from 'react';

type Item = { label: string; href: string };

const ProductsMarquee: React.FC = () => {
  const projects: Item[] = [
    { label: 'JohnnyCloud (AWS Serverless)', href: 'https://github.com/Eskinder185/cloud-launchpad-vpc-ec2' },
    { label: 'Secure Task Manager (Java)', href: 'https://github.com/Eskinder185/secure-task-manager-java' },
    { label: 'Trivia Clash Game', href: 'https://github.com/Eskinder185/jeopardy-trivia-game' },
    { label: 'Neon Meme Machine', href: 'https://github.com/Eskinder185/neon-meme-machine' },
    { label: 'Weather App (Python)', href: 'https://github.com/Eskinder185/weather' },
    { label: 'Android Inventory Manager', href: 'https://github.com/Eskinder185/android-inventory-manager' },
    { label: 'Animal Shelter Analytics (Dash)', href: 'https://github.com/Eskinder185/animal-shelter-analytics' },
    { label: 'Pirate Intelligent Agent (DQN)', href: 'https://github.com/Eskinder185/Pirate-Intelligent-Agent' },
    { label: 'Travel Portal (Node/Express)', href: 'https://github.com/Eskinder185/travel-portal-express' },
    { label: 'DriverPass System Design', href: 'https://github.com/Eskinder185/driverpass-system-design' },
  ];

  // Duplicate for infinite scroll
  const duplicated = [...projects, ...projects];

  return (
    <div className="py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projects I’ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Highlights from my GitHub and coursework across cloud, security, and full-stack
          </p>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

          {/* Marquee container */}
          <div className="flex items-center animate-marquee hover:pause">
            {duplicated.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex-none mx-6 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 group animate-pulse-glow"
                style={{ animationDelay: `${index * 0.5}s` }}
                aria-label={item.label}
              >
                <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {item.label}
                </span>
                {/* Subtle glow effect */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Secondary row with reverse animation */}
        <div className="relative mt-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

          <div className="flex items-center" style={{ animation: 'marquee 25s linear infinite reverse' }}>
            {duplicated.slice().reverse().map((item, index) => (
              <a
                key={`reverse-${index}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex-none mx-6 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-white/5 backdrop-blur-sm hover:from-violet-500/20 hover:to-cyan-500/20 transition-all duration-300 group"
                aria-label={item.label}
              >
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Plain <style> works in Vite/React; no Next.js-specific jsx attribute */}
      <style>{`
        .hover\\:pause:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
};

export default ProductsMarquee;
