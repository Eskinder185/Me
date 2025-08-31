// useOpenLibraryCover.ts
import { useEffect, useState } from 'react';

export const COVER_SIZES = ['S','M','L'] as const;
export type CoverSize = typeof COVER_SIZES[number];

export function useOpenLibraryCover(title: string, author?: string, size: CoverSize = 'L') {
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
          fields: 'cover_i,isbn'        // lean response
        });
        const res = await fetch(`https://openlibrary.org/search.json?${q}`, { signal: controller.signal });
        const data = await res.json();
        const doc = data?.docs?.[0];
        let cover: string | null = null;

        if (doc?.cover_i) cover = `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`;
        else if (doc?.isbn?.length) cover = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-${size}.jpg`;

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
