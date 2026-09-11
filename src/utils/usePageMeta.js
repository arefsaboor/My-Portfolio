import { useEffect } from 'react';

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag && description) {
      metaTag.setAttribute('content', description);
    }
  }, [title, description]);
}
