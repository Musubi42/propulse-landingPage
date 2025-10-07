/**
 * CPGE (Classes Préparatoires aux Grandes Écoles) Statistical Data
 * Sources: DEPP, SIES, INSEE, MESR
 * Last Updated: 2025-10-06
 */

// ============================================================================
// Graph 1a: Geographic Distribution
// ============================================================================

export const geographicData = {
  categories: [
    'Île-de-France',
    'Autres capitales régionales',
    'Reste de la France',
  ],
  population: {
    values: [16.1, 13.5, 70.4],
    absolute: [10944094, 9172763, 47953143],
    total: 68070000,
  },
  cpge: {
    values: [32.4, 28.4, 39.2],
    absolute: [28173, 24680, 34088],
    total: 86941,
  },
  metadata: {
    title: 'Concentration géographique des CPGE : la surreprésentation urbaine',
    subtitle: 'Comparaison entre répartition de la population et des étudiants en CPGE',
    source: 'Note Flash SIES n° 2025-03 (Février 2025) - MESR ; INSEE Recensement 2021',
    sourceUrl: 'https://www.enseignementsup-recherche.gouv.fr/fr/les-effectifs-en-classes-preparatoires-aux-grandes-ecoles-la-rentree-2024-2025-98530',
    insights: [
      'Île-de-France représente 16% de la population mais accueille 32% des étudiants en CPGE',
      'Indice de surreprésentation : 2.0× pour l\'Île-de-France',
      'Le reste de la France : 70% de la population mais seulement 39% des étudiants CPGE',
    ],
  },
};

// ============================================================================
// Graph 1b: BAC Pro Barrier
// ============================================================================

export const bacProData = {
  funnelRates: [
    { type: 'BAC Général', rate: 10.1, color: '#43e97b', percentage: 90.5 },
    { type: 'BAC Technologique', rate: 1.9, color: '#fee140', percentage: 6.6 },
    { type: 'BAC Professionnel', rate: 0.1, color: '#fa709a', percentage: 0.4 },
  ],
  absoluteNumbers: {
    bacGeneral: 39318,
    bacTechno: 2867,
    bacPro: 174,
    total: 43445,
  },
  metadata: {
    title: 'L\'impasse des BAC Pro : une orientation qui ferme les portes',
    subtitle: 'Taux d\'accès aux CPGE selon le type de baccalauréat (2023)',
    source: 'RERS 2024 (DEPP, SIES) - Tableau 7.22 ; Note Flash SIES n° 2025-03',
    sourceUrl: 'https://rers.depp.education.fr/2024/',
    insights: [
      'Un bachelier général a 100× plus de chances d\'accéder à une CPGE qu\'un bachelier professionnel',
      'Seulement 174 étudiants issus de BAC Pro ont intégré une CPGE en 2024',
      'Cette barrière invisible perpétue les inégalités sociales : les BAC Pro sont majoritairement issus de milieux populaires',
    ],
  },
};

// ============================================================================
// Graph 2: Social Reproduction
// ============================================================================

export const socialReproductionData = {
  years: [2007, 2012, 2017, 2022],
  cpgeComposition: {
    cadres: [52.7, 52.7, 51.4, 52.8],
    profInter: [14.0, 12.9, 12.3, 12.3],
    agricArtisans: [10.3, 11.1, 11.3, 10.4],
    employes: [10.0, 10.0, 10.8, 10.9],
    ouvriers: [5.6, 6.6, 7.3, 6.8],
    retraites: [7.5, 6.7, 6.9, 6.7],
  },
  nationalDistribution: {
    cadres: 17,
    profInter: 26,
    employes: 24,
    ouvriers: 18,
    agricArtisans: 10, // To be confirmed by user
  },
  metadata: {
    title: 'La reproduction sociale : 15 ans d\'inégalité stable',
    subtitle: 'Origine socioprofessionnelle des étudiants en CPGE (2007-2022) comparée à la population française',
    source: 'RERS 2024, Tableau 07_ETU/11_CPGE/01 (DEPP, SIES) ; INSEE Recensement 2021 (CSP 25-54 ans)',
    sourceUrl: 'https://rers.depp.education.fr/2024/',
    insights: [
      'Indice de surreprésentation (2022) :',
      '  • Cadres: 3.1× (52.8% vs 17%)',
      '  • Professions intermédiaires: Proche de la parité (12.3% vs ~13%)',
      '  • Employés: 2.3× sous-représentés (10.9% vs 24%)',
      '  • Ouvriers: 2.6× sous-représentés (6.8% vs 18%)',
      'L\'écart ne se réduit pas : stabilité quasi-totale sur 15 ans',
    ],
  },
};

// ============================================================================
// Graph 3: Gender Segregation
// ============================================================================

export const genderSegregationData = {
  fields: ['Scientifique', 'Économique', 'Littéraire', 'Total CPGE'],
  women: {
    absolute: [16242, 9534, 9175, 34951],
    percentages: [30.1, 48.0, 70.3, 40.2],
  },
  men: {
    absolute: [37779, 10329, 3882, 51990],
    percentages: [69.9, 52.0, 29.7, 59.8],
  },
  totals: [54021, 19863, 13057, 86941],
  metadata: {
    title: 'Ségrégation genrée : des filières fortement clivées',
    subtitle: 'Répartition femmes-hommes par filière CPGE (2024-2025)',
    source: 'Note Flash SIES n° 2025-03 (Février 2025) - Effectifs et évolution des étudiants en CPGE par filière et par sexe',
    sourceUrl: 'https://www.enseignementsup-recherche.gouv.fr/fr/les-effectifs-en-classes-preparatoires-aux-grandes-ecoles-la-rentree-2024-2025-98530',
    insights: [
      'La ségrégation genrée persiste dans les CPGE :',
      '  • Scientifique: seulement 30% de femmes (16,242 étudiantes)',
      '  • Littéraire: 70% de femmes, mais c\'est la plus petite filière (13,057 étudiants total)',
      '  • Les stéréotypes de genre orientent dès le lycée',
      'Impact : Les femmes accèdent moins aux filières scientifiques qui mènent aux écoles d\'ingénieurs les plus prestigieuses',
    ],
  },
};

// ============================================================================
// Export all data
// ============================================================================

export const cpgeStatistics = {
  geographic: geographicData,
  bacPro: bacProData,
  socialReproduction: socialReproductionData,
  genderSegregation: genderSegregationData,
};
