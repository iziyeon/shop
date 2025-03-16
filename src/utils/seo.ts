import { APP_CONFIG } from '@/config/constants';

interface SEOData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const generateSEOTags = ({
  title = APP_CONFIG.name,
  description = APP_CONFIG.description,
  image,
  url
}: SEOData = {}) => {
  const fullTitle = title === APP_CONFIG.name 
    ? title 
    : `${title} | ${APP_CONFIG.name}`;

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      ...(image ? [{ property: 'og:image', content: image }] : []),
      ...(url ? [{ property: 'og:url', content: url }] : [])
    ]
  };
};
