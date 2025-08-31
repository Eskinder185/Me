// src/components/ui/ProjectCover.tsx
import React, { useState } from 'react';

type Props = {
  id: string;
  title: string;
  cover?: string;          // e.g. "/images/neon-meme-machine.jpg"
  className?: string;
};

const FallbackArt: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
  <div className={`bg-gradient-to-br from-violet-600/30 to-cyan-600/30 flex items-center justify-center ${className}`}>
    {/* keep your nice generated/fallback art here */}
    <span className="text-white/80 text-sm">{title}</span>
  </div>
);

const ProjectCover: React.FC<Props> = ({ id, title, cover, className }) => {
  const [broken, setBroken] = useState(false);

  if (!cover || broken) {
    return <FallbackArt title={title} className={className} />;
  }

  return (
    <img
      src={`${cover}?v=1`}          // cache-bust to avoid stale 404s
      alt={title}
      className={className}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
};

export default ProjectCover;

