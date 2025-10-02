export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Propulse Association',
  description:
    'Association proposant un mentorat gratuit pour accompagner les lycéens vers les Grandes Écoles',
  url: 'https://propulse-association.fr',
  logo: 'https://propulse-association.fr/logo.png',
  email: 'propulse.association@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.linkedin.com/company/propulse-association',
  ],
  founder: [
    {
      '@type': 'Person',
      name: 'Arthur Costa',
      alumniOf: ['EDHEC Business School', 'Université Paris-Dauphine'],
      telephone: '+33769977242',
    },
    {
      '@type': 'Person',
      name: 'Hugo Nicaise',
      alumniOf: 'EDHEC Business School',
      telephone: '+33762542918',
    },
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Programme de mentorat 100% gratuit',
  },
};

export const programSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Programme de mentorat Propulse',
  description:
    'Programme en 6 phases pour accompagner les lycéens vers les Grandes Écoles',
  provider: {
    '@type': 'Organization',
    name: 'Propulse Association',
    url: 'https://propulse-association.fr',
  },
  educationalLevel: 'Lycée',
  inLanguage: 'fr-FR',
  isAccessibleForFree: true,
  courseMode: 'online',
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'P6M',
      instructor: {
        '@type': 'Person',
        description: 'Étudiants et diplômés de Grandes Écoles',
      },
    },
  ],
};
