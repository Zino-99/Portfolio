export const profile = {
  first: 'Yacine',
  last: 'Djadel',
  role: 'Développeur full stack & data',
  roleLine: 'Développeur full stack & data',
  school: 'École Multimédia',
  nextSchool: 'Nexa',
  city: 'Paris',
  email: 'djadel.vfc@gmail.com',
  phone: '06 67 30 09 75',
  phoneHref: '+33667300975',
  cv: '/CV_Yacine_Djadel.pdf',
  /* L'accroche de la section porte déjà « je construis / je me spécialise » :
     ce paragraphe ne le répète pas, il donne le contexte. */
  statement:
    'En fin de titre Concepteur Développeur d’Applications à L’École Multimédia, je pars en Master Data & Intelligence Artificielle chez Nexa. Ce que j’aime : traduire un besoin concret en solution fiable — côté développement comme côté data.',
}

export const facts = [
  { label: 'Basé à', value: 'Paris, France' },
  { label: 'Mobilité', value: 'Toute la France · remote ou sur site' },
  { label: 'Rythme', value: '3 semaines entreprise / 1 semaine formation' },
  { label: 'Langues', value: 'Français natif · anglais technique' },
  { label: 'Recherche', value: 'Développement web · data · IA' },
]

export const socials = [
  { label: 'GitHub', handle: '@Zino-99', href: 'https://github.com/Zino-99' },
  {
    label: 'LinkedIn',
    handle: 'yacine-djadel',
    href: 'https://www.linkedin.com/in/yacine-djadel',
  },
]

export const nav = [
  { label: 'À propos', href: '#apropos' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Projets', href: '#projets' },
  { label: 'Alternance', href: '#alternance' },
]

export const band = [
  'Alternance 2026',
  'React',
  'Symfony',
  'Power BI',
  'SQL',
  'Docker',
  'Data & IA',
]

/* Un item peut être une chaîne, ou { name, hint } quand une précision
   honnête vaut mieux qu’un mot-clé de plus. */
export const skillGroups = [
  {
    key: 'data',
    title: 'Data & IA',
    note: 'Ma spécialisation en cours.',
    items: [
      { name: 'Power BI', hint: 'Power Query · DAX' },
      { name: 'SQL / MySQL', hint: 'requêtage · modélisation' },
      { name: 'Python', hint: 'en montée en compétences' },
      { name: 'Excel', hint: 'en montée en compétences' },
      'Modélisation en étoile',
    ],
  },
  {
    key: 'back',
    title: 'Back-end',
    note: 'Architecture, données, API.',
    items: [
      { name: 'PHP / Symfony', hint: 'architecture MVC' },
      'Laravel',
      'MySQL',
      'API REST',
      'Firebase',
    ],
  },
  {
    key: 'front',
    title: 'Front-end',
    items: ['JavaScript', 'React (Vite)', 'HTML / CSS', 'TailwindCSS', 'Figma', 'Electron'],
  },
  {
    key: 'tools',
    title: 'Outils & méthodes',
    note: 'Du commit à la mise en ligne.',
    items: [
      'Git / GitHub',
      'Docker',
      { name: 'CI/CD', hint: 'GitHub Actions' },
      { name: 'Tests', hint: 'PHPUnit · PHPStan' },
      { name: 'Agile', hint: 'Scrum · Trello' },
    ],
  },
]

export const formation = [
  {
    year: '2026–28',
    title: 'Master Data & Intelligence Artificielle',
    org: 'Nexa',
    detail: 'La formation que je viens chercher en alternance.',
  },
  {
    year: '2024–26',
    title: 'Concepteur Développeur d’Applications — titre niveau 6',
    org: 'L’École Multimédia',
    place: 'Paris',
    detail: 'Résultats du jury en attente.',
  },
]

export const experience = [
  {
    year: '2025–26',
    title: 'Concepteur & développeur d’applications',
    org: 'Sarah Digital Impact',
    place: 'nov. 2025 – janv. 2026',
    href: 'https://syanasystem.com/',
    detail:
      'Parcours utilisateurs et maquettes Figma, workflow Trello, puis développement du MVP en React et Firebase — authentification, base de données et logique interne.',
  },
  {
    year: '2025',
    title: 'Développeur web',
    org: 'STOPTCA',
    place: 'janv. – mars 2025',
    href: 'https://stoptca.fr',
    detail:
      'Refonte de la landing page (v2.0) : maquettes Figma, intégration Laravel responsive et optimisation du temps de chargement.',
  },
]

export const projects = [
  {
    id: 'nettya',
    index: '01',
    name: 'Nettya',
    kind: 'Site client — en production',
    summary:
      'Le site vitrine d’une entreprise de nettoyage professionnel : services, galerie de réalisations et demande de devis.',
    role: 'Interface React et Tailwind, animations Framer Motion, et un parcours pensé pour transformer une visite en demande de devis.',
    stack: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
    links: [
      { label: 'Voir le site', href: 'https://nettya.fr/' },
      { label: 'GitHub', href: 'https://github.com/Zino-99/ProClean360' },
    ],
    image: '/projects/nettya.jpg',
  },
  {
    id: 'dvf',
    index: '02',
    name: 'Marché immobilier parisien',
    kind: 'Dashboard Power BI',
    summary:
      'Un tableau de bord interactif sur 30 000 ventes parisiennes : prix au m², évolution par arrondissement, filtres croisés.',
    role: 'Nettoyage des données DVF, modélisation en étoile, mesures DAX et mise en page des visuels.',
    stack: ['Power BI', 'Power Query', 'DAX', 'SQL'],
    links: [{ label: 'Voir sur GitHub', href: 'https://github.com/Zino-99/dvf-paris-powerbi' }],
    image: '/projects/dvf-paris.jpg',
  },
  {
    id: 'skilllink',
    index: '03',
    name: 'SkillLink',
    kind: 'Plateforme web',
    summary:
      'Une plateforme d’échange de compétences entre membres : on propose ce qu’on sait faire, on demande ce qu’on veut apprendre.',
    role: 'API REST Symfony, interface React, conteneurisation Docker, CI/CD GitHub Actions et tests automatisés.',
    stack: ['Symfony', 'React', 'MySQL', 'Docker', 'CI/CD'],
    links: [{ label: 'Voir le site', href: 'https://skilllink.nettya.fr' }],
    image: '/projects/skilllink.jpg',
  },
  {
    id: 'bitchest',
    index: '04',
    name: 'BitChest',
    kind: 'Application web',
    summary:
      'Une plateforme d’achat et de vente de cryptomonnaies : cours du marché, portefeuille et historique des transactions.',
    role: 'Modélisation des transactions, API Symfony, interface React et graphiques d’évolution des cours.',
    stack: ['React', 'Symfony', 'MySQL'],
    links: [{ label: 'Voir le site', href: 'https://bitchest.nettya.fr' }],
    image: '/projects/bitchest.jpg',
  },
  {
    id: 'lab201',
    index: '05',
    name: 'LAB 201',
    kind: 'Site d’album musical',
    summary:
      'Le site de l’album Precipice d’Indigo De Souza : clip en fond, écoute d’un extrait et agenda des dates de tournée.',
    role: 'Conception et développement du site, de la page album à la gestion des dates de tournée.',
    stack: [],
    links: [{ label: 'Voir le site', href: 'https://belvance.com/' }],
    image: '/projects/lab201.jpg',
  },
  {
    id: 'mybank',
    index: '06',
    name: 'MyBank',
    kind: 'Application web',
    summary: 'Une application de gestion de dépenses : comptes, catégories, suivi des mouvements.',
    role: 'Back-end Symfony et front React, avec 67 tests PHPUnit, analyse qualité PHPStan et pipeline CI/CD.',
    stack: ['Symfony', 'React', 'MySQL', 'Docker', 'PHPUnit'],
    links: [{ label: 'Voir le site', href: 'http://178.105.221.170/' }],
    image: '/projects/mybank.jpg',
  },
  {
    id: 'codewallet',
    index: '07',
    name: 'Code Wallet',
    kind: 'Application de bureau',
    summary:
      'Un gestionnaire de fragments de code : on range, on étiquette, on réutilise, sans quitter son environnement.',
    role: 'Application Electron, synchronisation Firebase et interface React.',
    stack: ['Electron', 'React', 'Firebase'],
    links: [
      { label: 'Voir le site', href: 'https://codewallet.nettya.fr/' },
      { label: 'GitHub', href: 'https://github.com/Zino-99/CODE--WALLET' },
    ],
    image: '/projects/codewallet.jpg',
  },
]

export const alternance = {
  fields: [
    { label: 'Poste', value: 'Développeur web full-stack, data analyst ou IA engineer' },
    { label: 'Contrat', value: 'Alternance — Master 1 Data & Intelligence Artificielle (Nexa)' },
    { label: 'Rythme', value: '3 semaines entreprise / 1 semaine formation' },
    { label: 'Début', value: 'Rentrée 2026' },
    { label: 'Zone', value: 'Toute la France — sur site, hybride ou remote' },
  ],
  strengths: [
    {
      title: 'Mes projets sont en ligne',
      body: 'SkillLink, BitChest et Code Wallet tournent sur un vrai domaine. Déployer fait partie du travail, pas de la finition.',
    },
    {
      title: 'Je teste ce que j’écris',
      body: '67 tests PHPUnit sur MyBank, analyse statique PHPStan et pipeline GitHub Actions. Une régression se voit avant la mise en ligne.',
    },
    {
      title: 'Le code et la donnée, même réflexe',
      body: 'Comprendre le besoin, modéliser proprement, livrer quelque chose de lisible — que ce soit une API Symfony ou un modèle en étoile dans Power BI.',
    },
  ],
}
