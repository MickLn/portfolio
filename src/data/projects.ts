export interface ProjectPart {
  number: string;
  tag: {
    en: string;
    fr: string;
  };
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  bannerImage?: string;
  mainImage?: string;
  screens?: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: {
    en: string;
    fr: string;
  };
  tagline: {
    en: string;
    fr: string;
  };
  flashConcept: {
    en: string;
    fr: string;
  };
  timeline: {
    en: string;
    fr: string;
  };
  tools: string[];
  thumbnail: string;
  screens?: string[];
  overviewImage?: string;
  parts?: ProjectPart[];
  externalLink?: {
    label: {
      en: string;
      fr: string;
    };
    url: string;
  };
  metadataBar: {
    role: {
      en: string;
      fr: string;
    };
    context: {
      en: string;
      fr: string;
    };
    tools: string;
    discipline: {
      en: string;
      fr: string;
    };
  };
  sectionHeadings: {
    context: {
      en: string;
      fr: string;
    };
    usage: {
      en: string;
      fr: string;
    };
    brand?: {
      en: string;
      fr: string;
    };
    takeaway: {
      en: string;
      fr: string;
    };
  };
  problem: {
    en: string;
    fr: string;
  };
  solution: {
    en: string;
    fr: string;
  };
  takeaway?: {
    en: string;
    fr: string;
  };
  brandAndDesignSystem?: {
    concept: {
      en: string;
      fr: string;
    };
    colorPalette: Array<{ name: string; hex: string }>;
    typography: Array<{ name: string; usage?: string }>;
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pansies',
    index: '01',
    title: 'Pansies',
    category: {
      en: 'MOBILE PRODUCT DESIGN & AI WORKFLOWS',
      fr: 'DESIGN PRODUIT MOBILE & WORKFLOWS IA'
    },
    tagline: {
      en: 'Instant voice-to-structured-ideas mobile workspace designed to turn chaotic brain dumps into clear actions.',
      fr: 'Application mobile de capture vocale instantanée transformant les pensées spontanées en actions claires.'
    },
    flashConcept: {
      en: 'Voice-to-structured-ideas mobile workspace turning brain dumps into action.',
      fr: 'Capture vocale instantanée transformant les pensées en actions claires.'
    },
    timeline: {
      en: '4-Day Sprint / Late 2025',
      fr: 'Sprint 4 jours / Fin 2025'
    },
    tools: ['Figma'],
    thumbnail: '/projects/pansies/cover.png?v=2',
    screens: [
      '/projects/pansies/screen-splash.jpg?v=2',
      '/projects/pansies/screen-player.jpg?v=2',
      '/projects/pansies/screen-list.jpg?v=2'
    ],
    overviewImage: '/projects/pansies/figma-board.jpg?v=2',
    metadataBar: {
      role: {
        en: 'UX/UI Designer',
        fr: 'UX/UI Designer'
      },
      context: {
        en: '4-Day Sprint (Late 2025)',
        fr: 'Sprint 4 jours (Fin 2025)'
      },
      tools: 'Figma',
      discipline: {
        en: 'Mobile UX & UI Design',
        fr: 'Design UX & UI Mobile'
      }
    },
    sectionHeadings: {
      context: {
        en: 'Design Sprint & Project Scope',
        fr: 'Design Sprint & Cadre du projet'
      },
      usage: {
        en: 'Instant Audio Capture & Live Processing',
        fr: 'Capture instantanée & Flux des idées'
      },
      brand: {
        en: 'Natural Lavender & Charcoal Tones',
        fr: 'Teintes naturelles & Concept de marque'
      },
      takeaway: {
        en: 'Key Learnings & UX Perspective',
        fr: 'Apprentissages & Regard UX'
      }
    },
    problem: {
      en: 'During a fast-paced 4-day sprint, we identified that capturing spontaneous thoughts on mobile is often interrupted by slow text inputs, rigid folders, and friction. Users lose momentum before structuring their raw ideas.',
      fr: 'Lors d’un sprint intensif de 4 jours, nous avons constaté que noter une idée spontanée sur mobile est souvent freiné par la saisie au clavier et le tri manuel dans des dossiers. L’utilisateur perd son élan avant même d’avoir structuré sa pensée.'
    },
    solution: {
      en: 'We designed Pansies around a single gesture: instant audio capture. The interface processes raw speech into structured notes, tasks, and summaries with zero manual sorting. I focused on designing the quick-capture interaction flows, mobile cards hierarchy, and UI state transitions.',
      fr: 'Nous avons conçu Pansies autour d’une interaction unique : l’enregistrement vocal immédiat. L’application convertit la voix en notes structurées, tâches et synthèses prêtes à l’action. J’ai particulièrement travaillé sur les parcours de capture rapide, la hiérarchie des cartes et les micro-interactions de validation.'
    },
    brandAndDesignSystem: {
      concept: {
        en: 'A soothing lavender and charcoal palette designed to evoke calm, paired with soft organic shapes that reduce visual fatigue during daily capture.',
        fr: 'Une palette douce lavande et fusain qui évoque la sérénité, associée à des formes douces pour limiter la fatigue visuelle lors des sessions de capture quotidienne.'
      },
      colorPalette: [
        { name: 'Soft Lavender', hex: '#E8DEF8' },
        { name: 'Charcoal Dark', hex: '#1D1B20' },
        { name: 'Deep Violet', hex: '#61286C' }
      ],
      typography: [
        { name: 'Cabinet Grotesk' },
        { name: 'Geist Sans' }
      ]
    },
    takeaway: {
      en: 'Working under tight 4-day constraints reinforced the necessity of ruthless prioritization. Focusing on the core capture flow over edge cases allowed us to deliver an intuitive and tactile mobile prototype.',
      fr: 'Ce sprint de 4 jours m’a appris à prioriser sans compromis sur l’essentiel : concentrer l’effort sur le parcours de capture principal pour livrer un prototype mobile tactile, cohérent et immédiatement fluide.'
    }
  },
  {
    id: 'popfig',
    index: '02',
    title: 'PopFig',
    category: {
      en: 'E-COMMERCE WEBDESIGN & CMS INTEGRATION',
      fr: 'WEBDESIGN E-COMMERCE & INTÉGRATION CMS'
    },
    tagline: {
      en: 'Collectible figurines e-commerce store with live search filtering and seamless product exploration.',
      fr: 'Site e-commerce de figurines de collection avec recherche dynamique et parcours d’achat épuré.'
    },
    flashConcept: {
      en: 'Collectible figurines e-commerce store with live search filtering.',
      fr: 'Site e-commerce de figurines avec recherche dynamique et parcours fluide.'
    },
    timeline: {
      en: 'Academic Project / Feb 2025',
      fr: 'Projet académique / Fév 2025'
    },
    tools: ['Figma', 'WordPress'],
    thumbnail: '/projects/popfig/cover.png?v=3',
    screens: [
      '/projects/popfig/screen-catalog.jpg?v=3',
      '/projects/popfig/screen-product.jpg?v=3',
      '/projects/popfig/screen-cart.png?v=3'
    ],
    overviewImage: '/projects/popfig/figma-board.jpg?v=3',
    metadataBar: {
      role: {
        en: 'Web Designer & Integrator',
        fr: 'Web Designer & Intégrateur'
      },
      context: {
        en: 'Academic Project (2025)',
        fr: 'Projet d’études (2025)'
      },
      tools: 'Figma / WordPress',
      discipline: {
        en: 'E-Commerce UI & Webdesign',
        fr: 'Webdesign & E-commerce UI'
      }
    },
    sectionHeadings: {
      context: {
        en: 'E-Commerce Store & Brand Experience',
        fr: 'Boutique e-commerce & Expérience de marque'
      },
      usage: {
        en: 'Live Search Filtering & Frictionless Checkout',
        fr: 'Recherche dynamique & Parcours d’achat'
      },
      brand: {
        en: 'Direction Artistique & Harmonie Visuelle',
        fr: 'Direction artistique & Harmonie visuelle'
      },
      takeaway: {
        en: 'WordPress Integration & Practical UX/UI',
        fr: 'Intégration WordPress & Articulation UX/UI'
      }
    },
    problem: {
      en: 'Creation of a collectible figurine e-commerce store in an academic setting. The objective was to design a clean, intuitive, and modern online shopping experience. Drawing inspiration from Pop Mart’s minimalist visual language, the layout keeps the focus entirely on the art pieces.',
      fr: 'Réalisation d’un site e-commerce de figurines de collection dans un cadre scolaire. L’objectif était de repenser le webdesign d’une boutique spécialisée pour offrir une navigation fluide, aérée et intuitive. Je me suis inspiré des codes visuels de Pop Mart pour leur approche épurée qui valorise immédiatement chaque pièce de collection.'
    },
    solution: {
      en: 'The shop features a diverse collectible catalog equipped with a live search bar that filters products in real time as the user types. I designed a focused product page (high-resolution zoom, material specs, instant quantity selector) and an effortless cart flow to minimize friction from discovery to checkout.',
      fr: 'Côté fonctionnalités, le site structure un catalogue varié avec une barre de recherche dynamique qui filtre les figurines instantanément dès la frappe. J’ai conçu une fiche produit immersive (visuels grand format, spécifications techniques, matière, sélecteur rapide) et un tunnel d’ajout au panier direct pour minimiser les étapes avant la commande.'
    },
    brandAndDesignSystem: {
      concept: {
        en: 'A visual identity blending a soft salmon pink with crisp off-white tones, creating an inviting pop universe while keeping the focus on collectible details.',
        fr: 'Un univers graphique qui associe la douceur d’un rose saumon à la clarté d’un blanc cassé, pour une expérience pop et chaleureuse sans jamais surcharger la lecture des produits.'
      },
      colorPalette: [
        { name: 'Salmon Pink', hex: '#FFBCB3' },
        { name: 'Off-White', hex: '#F8F8F8' },
        { name: 'Carbon Black', hex: '#1A1A1A' }
      ],
      typography: [
        { name: 'Bebas Neue' },
        { name: 'Work Sans' }
      ]
    },
    takeaway: {
      en: 'My very first e-commerce store built on WordPress with Elementor Pro. It bridged UX research with practical UI execution: structuring live filtering, streamlining the buying journey, and designing intuitive product pages within a cohesive brand identity.',
      fr: 'Mon tout premier site e-commerce conçu et intégré sous WordPress avec Elementor Pro. Ce projet m’a permis de relier concrètement l’UX et l’UI : structurer la recherche en temps réel, optimiser le parcours d’achat et concevoir une fiche produit claire, tout en respectant une identité visuelle affirmée.'
    }
  },
  {
    id: 'sushilin',
    index: '03',
    title: 'Sushi Lin',
    category: {
      en: 'E-COMMERCE REDESIGN & RESTAURANT UI',
      fr: 'REFONTE WEBDESIGN & E-COMMERCE RESTAURATION'
    },
    tagline: {
      en: 'Proactive redesign of online takeout ordering, cross-selling modules, admin dashboard, and transactional emails.',
      fr: 'Refonte proactive du parcours de commande à emporter, cross-selling, espace d’administration et emails transactionnels.'
    },
    flashConcept: {
      en: 'Restaurant web redesign with online ordering and cross-selling.',
      fr: 'Refonte web pour restaurant avec commande en ligne et cross-selling.'
    },
    timeline: {
      en: '2026',
      fr: '2026'
    },
    tools: ['Figma', 'IA'],
    thumbnail: '/projects/sushilin/cover.png?v=5',
    screens: [
      '/projects/sushilin/mobile-catalog.png?v=2',
      '/projects/sushilin/mobile-cart-crossell.png?v=2',
      '/projects/sushilin/email-confirmation.png?v=2'
    ],
    overviewImage: '/projects/sushilin/screen-menu.png?v=3',
    externalLink: {
      label: {
        en: 'VISIT LIVE SITE',
        fr: 'VOIR LE SITE EN LIGNE'
      },
      url: 'https://mickln.github.io/sushi_lin/'
    },
    metadataBar: {
      role: {
        en: 'UX/UI & Webdesigner',
        fr: 'UX/UI & Webdesigner'
      },
      context: {
        en: 'Proactive Project (2026)',
        fr: 'Projet proactif (2026)'
      },
      tools: 'Figma / IA',
      discipline: {
        en: 'Webdesign & Order Experience',
        fr: 'Webdesign & Parcours de commande'
      }
    },
    sectionHeadings: {
      context: {
        en: 'Context & Proactive Approach',
        fr: 'Contexte & Démarche proactive'
      },
      usage: {
        en: 'Mobile-First Journey & Cross-Selling',
        fr: 'Parcours Mobile-First & Cross-Selling'
      },
      brand: {
        en: 'Visual Identity & Typography Duo',
        fr: 'Direction artistique & Typographies'
      },
      takeaway: {
        en: 'Admin Dashboard, Backend & Learnings',
        fr: 'Espace Admin, Backend & Bilan'
      }
    },
    problem: {
      en: 'Proactive redesign for the Japanese restaurant Sushi Lin (Les Clayes-sous-Bois). The objective was to modernize their digital presence and streamline the takeout ordering flow to prevent user drop-off and maximize order completion.',
      fr: 'Projet proactif de refonte complète pour le restaurant japonais Sushi Lin (Les Clayes-sous-Bois). L’objectif était de moderniser leur présence en ligne et de fluidifier la commande à emporter avec un parcours de conversion épuré, pour éviter que les clients ne se perdent dans le catalogue.'
    },
    solution: {
      en: 'Designed with a mobile-first philosophy featuring intuitive category carousels and clear portion badges. Integrated a dedicated cross-selling module at checkout to recommend drink and side pairings, alongside online table reservations and automated confirmation emails.',
      fr: 'Conception mobile-first avec navigation rapide par catégories et pastilles portions claires. Intégration d’un module de cross-selling au moment du panier (« Pour accompagner votre repas ») pour suggérer des accompagnements (boissons, raviolis gyoza) et augmenter le panier moyen. Le site intègre également la réservation de table en ligne et la génération automatique d’un email de confirmation détaillé pour le client et le restaurant.'
    },
    brandAndDesignSystem: {
      concept: {
        en: 'A color palette directly inspired by the restaurant interior and printed menu (Midnight Indigo, Powder Pink, and Rice White), paired with traditional Japanese typography.',
        fr: 'Une palette de couleurs directement inspirée de la salle du restaurant et de leur carte (Bleu Nuit indigo, Rose poudré et Blanc riz), associant tradition japonaise et modernité épurée.'
      },
      colorPalette: [
        { name: 'Indigo Dark', hex: '#1E2442' },
        { name: 'Powder Pink', hex: '#FFD2E5' },
        { name: 'Rice White', hex: '#FDFBFA' }
      ],
      typography: [
        { name: 'Shippori Mincho' },
        { name: 'Outfit' }
      ]
    },
    takeaway: {
      en: 'Integrated a full custom admin dashboard allowing the restaurant owner to manage menu items, edit prices, and configure holiday hours. For the backend architecture, I leveraged AI tools to structure order processing, validated through real-world user testing.',
      fr: 'Développement de l’interface et intégration d’un espace d’administration permettant au restaurateur de modifier les prix, ajouter des plats et gérer les fermetures exceptionnelles. Pour la partie backend (domaine qui m’était inconnu), j’ai travaillé avec l’assistance d’outils IA pour structurer la logique de données. Des tests utilisateurs ont ensuite permis de valider la fluidité du tunnel d’achat.'
    }
  },
  {
    id: 'notion-systems',
    index: '04',
    title: 'Notion Workspaces',
    category: {
      en: 'NOTION TEMPLATES & NO-CODE SYSTEMS',
      fr: 'TEMPLATES NOTION & SYSTÈMES NO-CODE'
    },
    tagline: {
      en: 'Modular Notion templates engineered for daily nutrition tracking and Street Art collection gamification.',
      fr: 'Templates Notion modulaires conçus pour le suivi nutritionnel et la gamification de Street Art.'
    },
    flashConcept: {
      en: 'Modular Notion workspaces: Nutrition Tracker & Street Art Gamification.',
      fr: 'Templates Notion : Suivi nutritionnel & Gamification Street Art.'
    },
    timeline: {
      en: '2026',
      fr: '2026'
    },
    tools: ['Notion'],
    thumbnail: '/projects/notion/cover.svg?v=6',
    externalLink: {
      label: {
        en: 'VIEW NOTION PROFILE',
        fr: 'VOIR MON PROFIL NOTION'
      },
      url: 'https://www.notion.com/fr/@mickln_'
    },
    metadataBar: {
      role: {
        en: 'No-Code Designer',
        fr: 'No-Code Designer'
      },
      context: {
        en: '2026',
        fr: '2026'
      },
      tools: 'Notion',
      discipline: {
        en: 'Database Architecture',
        fr: 'Architecture de bases de données'
      }
    },
    sectionHeadings: {
      context: {
        en: 'Context & Objective',
        fr: 'Contexte & Objectif'
      },
      usage: {
        en: 'Templates & Functional Modules',
        fr: 'Templates & Modules fonctionnels'
      },
      takeaway: {
        en: 'Relational Logic & Key Takeaways',
        fr: 'Logique relationnelle & Bilan'
      }
    },
    problem: {
      en: 'Passionate about Notion, I design templates to structure personal habits, daily routines, and hobbies. Each workspace is intentionally built to operate 100% on Notion’s free plan—requiring zero paid add-ons or AI subscriptions—making them lightweight, accessible, and instantly duplicable.',
      fr: 'Passionné par l’écosystème Notion, je conçois des templates pour structurer mes habitudes, mes loisirs et mon quotidien. Chaque workspace est pensé pour fonctionner à 100% sur le plan gratuit de Notion (sans extension payante ni abonnement IA), afin de rester léger, accessible et duplicable en un clic.'
    },
    solution: {
      en: 'Two distinct systems engineered for specific use cases: a comprehensive daily nutrition tracker and a gamified urban art collection manager.',
      fr: 'Deux systèmes distincts conçus pour des usages précis : un suivi nutritionnel complet et un gestionnaire gamifié de collection de Street Art.'
    },
    parts: [
      {
        number: '01',
        tag: {
          en: 'PART 1 — NUTRITION SYSTEM',
          fr: 'PARTIE 1 — SUIVI NUTRITIONNEL'
        },
        title: {
          en: 'Mon Assiette',
          fr: 'Mon Assiette'
        },
        description: {
          en: 'A structured food logging system designed for weight management (loss, gain, or maintenance). It records meals across key time slots, uses dynamic formulas to calculate calories and macronutrients (proteins, carbs, fats, fibers) against target quotas, and tracks weight trends over time.',
          fr: 'Un système complet pour gérer son alimentation au quotidien (perte, prise de masse ou maintien). Il enregistre les repas par moment de la journée, utilise des formules pour calculer automatiquement les calories et les macronutriments (protéines, glucides, lipides, fibres) par rapport aux quotas cibles, et suit l’évolution quotidienne du poids.'
        },
        bannerImage: '/projects/notion/assiette-banner.jpg',
        mainImage: '/projects/notion/assiette-journal.png',
        screens: [
          '/projects/notion/assiette-quotas.png',
          '/projects/notion/assiette-evolution.png',
          '/projects/notion/assiette-references.png'
        ]
      },
      {
        number: '02',
        tag: {
          en: 'PART 2 — STREET ART GAMIFICATION',
          fr: 'PARTIE 2 — GAMIFICATION STREET ART'
        },
        title: {
          en: 'Invaders',
          fr: 'Invaders'
        },
        description: {
          en: 'An urban mosaic tracking workspace inspired by the street artist Invader. Beyond cataloging photographed artworks with metadata (points, city, date), the dashboard introduces customized unlockable achievements, completion progress gauges, and tiered player ranks based on the global score.',
          fr: 'Un espace dédié au recensement des mosaïques urbaines de l’artiste Invader. En plus de documenter les œuvres flashées avec leurs caractéristiques (points, ville, date), le dashboard intègre un système de succès déblocables, des jauges de complétion et des grades qui évoluent selon le score total.'
        },
        bannerImage: '/projects/notion/invaders-banner.jpg',
        mainImage: '/projects/notion/invaders-dashboard.png'
      }
    ],
    takeaway: {
      en: 'Both workspaces leverage relational databases (Relations & Rollups) combined with condition formulas to compute progress without external tools. This practice deepened my understanding of data architecture, friction-free input flows, and clean information hierarchy.',
      fr: 'Ces deux templates reposent sur des bases de données interconnectées (Relations & Rollups) et des formules conditionnelles pour automatiser les calculs sans aucun outil payant. Cette pratique m’a permis de perfectionner ma vision de l’architecture de données, de l’ergonomie de saisie et de la clarté d’information.'
    }
  }
];
