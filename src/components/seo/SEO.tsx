import { Helmet } from 'react-helmet-async'
import { BRAND } from '@/data/brand'
import type { PageSEO } from '@/data/seo'

interface SEOProps {
  seo: PageSEO
}

export function SEO({ seo }: SEOProps) {
  const url = `${BRAND.url}${seo.path}`
  const image = `${BRAND.url}/og-image.png`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.url,
    logo: `${BRAND.url}/favicon.svg`,
    description: seo.description,
    slogan: BRAND.tagline,
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    founder: {
      '@type': 'Person',
      name: 'Nisarga Lokhande',
      jobTitle: 'Founder & CEO',
    },
    sameAs: [
      'https://www.linkedin.com/in/nslokhande/',
      'https://github.com/nikobuddy/',
    ],
    knowsAbout: seo.keywords,
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={BRAND.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
