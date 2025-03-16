import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
}

export const SEO = ({
  title,
  description = 'React와 TailwindCSS로 만든 쇼핑몰입니다.',
  keywords = 'React, TailwindCSS, 쇼핑몰, e커머스',
  ogImage = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', // 기본 OG 이미지
  ogUrl = window.location.href,
  ogType = 'website'
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* 캐노니컬 URL */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};
