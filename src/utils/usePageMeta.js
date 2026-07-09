import { useEffect } from 'react';

// Sets document.title and the meta description for the current route.
// Every page mounted via <Routes> calls this, so the next route always
// overwrites the previous one's values - no restore-on-unmount needed.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag && description) {
      metaTag.setAttribute('content', description);
    }
  }, [title, description]);
}
