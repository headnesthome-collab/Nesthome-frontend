interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
}

export function SEO({ title, description, canonical, keywords, ogImage }: SEOProps) {
  const siteTitle = "Nesthome – Trusted Home Construction Experts in Indore";
  const fullTitle = title === "Home" ? siteTitle : `${title} | Nesthome`;
  const defaultOgImage = "https://yourdomain.com/og-image.png";
  const defaultKeywords = "home construction Indore, house builders Indore, contractors Indore, construction cost calculator, verified builders, affordable home construction";
  const domainUrl = "https://yourdomain.com";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Nesthome" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`${domainUrl}${canonical || "/"}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      <link rel="canonical" href={canonical || domainUrl} />
    </>
  );
}
