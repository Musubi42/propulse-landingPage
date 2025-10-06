/**
 * Educational Inequality Statistics
 * Sources: DEPP (Direction de l'évaluation, de la prospective et de la performance)
 *          INSEE (Institut national de la statistique et des études économiques)
 *          MESR (Ministère de l'Enseignement supérieur et de la Recherche)
 */

// Chart 1: Geographic Distribution of CPGE Students (Classes Préparatoires aux Grandes Écoles)
export const geographicDistribution = [
  { region: 'Île-de-France', students: 33, population: 17 },
  { region: 'Auvergne-Rhône-Alpes', students: 13, population: 12 },
  { region: 'Occitanie', students: 8, population: 9 },
  { region: 'Nouvelle-Aquitaine', students: 7, population: 9 },
  { region: 'Hauts-de-France', students: 7, population: 9 },
  { region: 'Provence-Alpes-Côte d\'Azur', students: 7, population: 8 },
  { region: 'Grand Est', students: 6, population: 8 },
  { region: 'Pays de la Loire', students: 6, population: 6 },
  { region: 'Bretagne', students: 5, population: 5 },
  { region: 'Normandie', students: 3, population: 5 },
  { region: 'Bourgogne-Franche-Comté', students: 3, population: 4 },
  { region: 'Centre-Val de Loire', students: 2, population: 4 },
];

// Chart 2: Social Origin of Grande École Students vs. General Population
export const socialOrigin = [
  {
    category: 'Cadres supérieurs',
    grandesEcoles: 52,
    population: 18,
    color: '#1B3A52', // Deep Navy
  },
  {
    category: 'Professions intermédiaires',
    grandesEcoles: 20,
    population: 26,
    color: '#4A6B52', // Forest Green
  },
  {
    category: 'Employés',
    grandesEcoles: 10,
    population: 28,
    color: '#D97642', // Burnt Orange
  },
  {
    category: 'Ouvriers',
    grandesEcoles: 6,
    population: 21,
    color: '#8B7355', // Warm Brown
  },
  {
    category: 'Autres',
    grandesEcoles: 12,
    population: 7,
    color: '#C4B5A0', // Light Taupe
  },
];

// Chart 3: Gender Evolution in Engineering Schools (École d'ingénieurs)
export const genderEvolution = [
  { year: 2000, women: 23, men: 77 },
  { year: 2005, women: 25, men: 75 },
  { year: 2010, women: 27, men: 73 },
  { year: 2015, women: 28, men: 72 },
  { year: 2020, women: 29, men: 71 },
  { year: 2023, women: 30, men: 70 },
];

// Metadata for tooltips and descriptions
export const chartMetadata = {
  geographic: {
    title: 'Répartition géographique des élèves en CPGE',
    subtitle: 'Comparaison entre la part d\'élèves en prépa et la population française par région',
    source: 'DEPP - Ministère de l\'Éducation nationale (2023)',
    insight: 'L\'Île-de-France concentre 33% des élèves de prépa, soit presque 2× sa part de population (17%)',
    unit: '%',
  },
  social: {
    title: 'Origine sociale des élèves de Grandes Écoles',
    subtitle: 'Comparaison de la représentation des catégories socioprofessionnelles',
    source: 'DEPP / INSEE - Enquête sur les Grandes Écoles (2022)',
    insight: 'Les enfants de cadres sont sur-représentés (52% vs 18% dans la population)',
    unit: '%',
  },
  gender: {
    title: 'Évolution de la part des femmes en écoles d\'ingénieurs',
    subtitle: 'Progression de la féminisation depuis 2000',
    source: 'MESR - Ministère de l\'Enseignement supérieur (2023)',
    insight: 'Malgré une légère progression, les femmes ne représentent que 30% des étudiants en 2023',
    unit: '%',
  },
};

// Key statistics for summary cards (if needed)
export const keyStats = {
  geographic: {
    value: '1/3',
    label: 'des élèves de prépa viennent d\'Île-de-France',
    detail: 'qui ne représente qu\'1/6 de la population',
  },
  social: {
    value: '7-10×',
    label: 'moins de chances pour un enfant d\'ouvrier',
    detail: 'd\'intégrer une Grande École',
  },
  selfCensorship: {
    value: '60%',
    label: 'ne se sentent pas capables',
    detail: 'des jeunes de milieux ruraux défavorisés d\'obtenir une licence',
  },
};
