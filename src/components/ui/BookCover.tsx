import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen } from 'lucide-react';

// ---- Shared size union ------------------------------------------------------
export const COVER_SIZES = ['S','M','L'] as const;
export type CoverSize = typeof COVER_SIZES[number];

// Hook for Open Library cover search
export function useOpenLibraryCover(
  title: string,
  author?: string,
  size: CoverSize = 'L'
) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!title?.trim()) { setUrl(null); return; }

    const controller = new AbortController();
    const run = async () => {
      try {
        const q = new URLSearchParams({
          title: title.trim(),
          author: author?.trim() ?? '',
          limit: '1',
          fields: 'cover_i,isbn'
        });
        const res = await fetch(`https://openlibrary.org/search.json?${q}`, { signal: controller.signal });
        const data = await res.json();
        const doc = data?.docs?.[0];
        let cover: string | null = null;

        if (doc?.cover_i) {
          // Force 404 if missing so onError can cascade
          cover = `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg?default=false`;
        } else if (doc?.isbn?.length) {
          cover = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-${size}.jpg?default=false`;
        }

        setUrl(cover);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError')) setUrl(null);
      }
    };
    run();
    return () => controller.abort();
  }, [title, author, size]);

  return url;
}

// ---- Pretty generated cover fallback ---------------------------------------
const GeneratedCover: React.FC<{
  title: string;
  author?: string;
  isbn?: string;
  className?: string;
}> = ({ title, author, isbn, className }) => {
  const colors = [
    'from-violet-600 to-purple-700',
    'from-blue-600 to-cyan-700',
    'from-green-600 to-emerald-700',
    'from-red-600 to-rose-700',
    'from-orange-600 to-amber-700',
    'from-indigo-600 to-violet-700',
    'from-teal-600 to-cyan-700',
    'from-pink-600 to-fuchsia-700'
  ];
  const colorIndex = title.charCodeAt(0) % colors.length;
  const gradient = colors[colorIndex];

  return (
    <div className={`${className} bg-gradient-to-br ${gradient} flex flex-col justify-between p-6 text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />
      <div className="absolute top-1/3 right-0 w-16 h-16 bg-white/10 rounded-full translate-x-6" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -translate-x-8 translate-y-8" />
      <div className="absolute bottom-1/3 left-0 w-12 h-12 bg-white/10 rounded-full -translate-x-4" />

      <div className="text-xs opacity-50 font-mono tracking-wider">
        {isbn ? `#${isbn.slice(-6)}` : '• • •'}
      </div>

      <div className="text-center space-y-3 z-10 flex-1 flex flex-col justify-center">
        <div className="space-y-2">
          <h3
            className="font-bold leading-tight text-center"
            style={{
              fontSize: title.length > 50 ? '0.75rem' : title.length > 30 ? '0.875rem' : '1rem',
              lineHeight: '1.2'
            }}
          >
            {title}
          </h3>
          <div className="flex justify-center"><div className="w-12 h-px bg-white/40" /></div>
          {author && <p className="text-xs opacity-80 leading-tight max-w-full">{author}</p>}
        </div>
      </div>

      <div className="flex justify-center opacity-60">
        <BookOpen className="w-5 h-5" />
      </div>
    </div>
  );
};

// ---- Image + fallback shim --------------------------------------------------
const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  title: string;
  author?: string;
  isbn?: string;
}> = ({ src, alt, className, loading, onError, title, author, isbn }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return <GeneratedCover title={title} author={author} isbn={isbn} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

// ---- Main BookCover ---------------------------------------------------------
interface Props {
  title: string;
  author?: string;
  alt?: string;
  className?: string;
  isbn?: string;
  size?: CoverSize; // <-- now defined
}

const BookCover: React.FC<Props> = ({ title, author, alt, className, isbn, size = 'L' }) => {
  // 1) Exact edition (ISBN). Force 404 if missing.
  const direct = useMemo(
    () => (isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg?default=false` : null),
    [isbn, size]
  );

  // 2) Search fallback (cover_i / first isbn) — also force 404 if missing
  const fetched = useOpenLibraryCover(title, author, size);

  // 3) Active src flow: ISBN -> search -> generated cover
  const [src, setSrc] = useState<string>(direct ?? fetched ?? '');
  const [fallbackLevel, setFallbackLevel] = useState(0);

  useEffect(() => {
    if (direct) { setSrc(direct); setFallbackLevel(0); }
    else if (fetched) { setSrc(fetched); setFallbackLevel(1); }
    else { setFallbackLevel(2); } // show generated
  }, [direct, fetched]);

  const handleError = () => {
    if (fallbackLevel === 0 && fetched && fetched !== direct) {
      setSrc(fetched);
      setFallbackLevel(1);
      return;
    }
    setFallbackLevel(2);
  };

  if (fallbackLevel === 2 || (!direct && !fetched)) {
    return <GeneratedCover title={title} author={author} isbn={isbn} className={className} />;
  }

  return (
    <ImageWithFallback
      key={`${isbn ?? ''}-${title}-${author ?? ''}-${size}-${src}`}
      src={src}
      alt={alt ?? `${title} cover`}
      className={className}
      loading="lazy"
      onError={handleError}
      title={title}
      author={author}
      isbn={isbn}
    />
  );
};

export default BookCover;
