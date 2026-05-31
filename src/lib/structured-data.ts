import { BRAND, FOUNDER, GEO, AEO_DEFINITION } from '@/data/brand'
import type { BreadcrumbItem } from '@/data/seo'
import { FAQ_ITEMS } from '@/data/faq'
import { SERVICES } from '@/data/services'

type FAQ = { question: string; answer: string }

export function organizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BRAND.url}/#organization`,
    name: BRAND.name,
    url: BRAND.url,
    logo: {
      '@type': 'ImageObject',
      url: `${BRAND.url}/favicon.svg`,
      width: 512,
      height: 512,
    },
    description,
    slogan: BRAND.tagline,
    email: BRAND.email,
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: FOUNDER.name,
      jobTitle: 'Founder & CEO',
      url: FOUNDER.linkedin,
      sameAs: [FOUNDER.linkedin, FOUNDER.github],
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: GEO.region,
      addressCountry: GEO.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: GEO.areaServed.map((place) => ({
      '@type': 'Place',
      name: place,
    })),
    sameAs: [FOUNDER.linkedin, FOUNDER.github, 'https://github.com/nikobuddy/projonexa'],
    knowsAbout: [
      'Final Year Projects',
      'Engineering Projects',
      'Artificial Intelligence',
      'Machine Learning',
      'Startup MVP Development',
      'Web Development',
      'Mobile Application Development',
      'IoT Development',
      'Technical Documentation',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: BRAND.email,
      availableLanguage: ['English', 'Hindi'],
      areaServed: GEO.countryCode,
    },
  }
}

/** Local / geographic business schema (GEO) */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BRAND.url}/#localbusiness`,
    name: BRAND.name,
    image: `${BRAND.url}/favicon.svg`,
    url: BRAND.url,
    email: BRAND.email,
    description: AEO_DEFINITION,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressRegion: GEO.region,
      addressCountry: GEO.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: GEO.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Projonexa Project Development Services',
      itemListElement: SERVICES.slice(0, 6).map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          provider: { '@id': `${BRAND.url}/#organization` },
          areaServed: GEO.country,
        },
      })),
    },
    parentOrganization: { '@id': `${BRAND.url}/#organization` },
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BRAND.url}/#website`,
    name: BRAND.name,
    url: BRAND.url,
    description: AEO_DEFINITION,
    inLanguage: GEO.language,
    publisher: { '@id': `${BRAND.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BRAND.url}/faq?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageSchema(
  title: string,
  description: string,
  path: string,
) {
  const url = `${BRAND.url}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url,
    name: title,
    description,
    inLanguage: GEO.language,
    isPartOf: { '@id': `${BRAND.url}/#website` },
    about: { '@id': `${BRAND.url}/#organization` },
    publisher: { '@id': `${BRAND.url}/#organization` },
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BRAND.url,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${BRAND.url}${item.path}`,
      })),
    ],
  }
}

/** FAQ schema for AEO — consumed by Google, Bing, and AI answer engines */
export function faqPageSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function serviceCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projonexa Services',
    description: 'End-to-end project development services for students and businesses',
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': `${BRAND.url}/#organization` },
        areaServed: GEO.areaServed,
        serviceType: s.title,
      },
    })),
  }
}

export function buildStructuredData(options: {
  title: string
  description: string
  path: string
  breadcrumb?: BreadcrumbItem[]
  faqSchema?: boolean
  serviceSchema?: boolean
  extraFaqs?: FAQ[]
}) {
  const schemas: object[] = [
    organizationSchema(options.description),
    webSiteSchema(),
    localBusinessSchema(),
    webPageSchema(options.title, options.description, options.path),
  ]

  if (options.breadcrumb?.length) {
    schemas.push(breadcrumbSchema(options.breadcrumb))
  }

  if (options.faqSchema) {
    const faqs = options.extraFaqs ?? FAQ_ITEMS
    schemas.push(faqPageSchema(faqs))
  }

  if (options.serviceSchema) {
    schemas.push(serviceCatalogSchema())
  }

  return schemas
}
