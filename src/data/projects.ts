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
  problem: {
    en: string;
    fr: string;
  };
  solution: {
    en: string;
    fr: string;
  };
  brandAndDesignSystem?: {
    concept: {
      en: string;
      fr: string;
    };
    colorPalette: {
      name: string;
      hex: string;
      desc: {
        en: string;
        fr: string;
      };
    }[];
    typography: {
      name: string;
      desc: {
        en: string;
        fr: string;
      };
    }[];
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pansies',
    index: '01',
    title: 'Pansies',
    category: {
      en: 'MOBILE APP / ACADEMIC SPRINT',
      fr: 'APPLICATION MOBILE / SPRINT ACADÉMIQUE'
    },
    tagline: {
      en: 'Instant voice capture app with scheduled notification reminders.',
      fr: 'Application de capture vocale instantanée avec rappels programmés.'
    },
    flashConcept: {
      en: 'Instant voice capture app with scheduled notification reminders.',
      fr: 'Application de capture vocale instantanée avec rappels programmés.'
    },
    timeline: {
      en: '4-Day Academic Sprint',
      fr: 'Sprint Académique de 4 Jours'
    },
    tools: ['Figma'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    metadataBar: {
      role: {
        en: 'UX/UI Designer',
        fr: 'UX/UI Designer'
      },
      context: {
        en: '4-Day Academic Sprint',
        fr: 'Sprint Académique (4 Jours)'
      },
      tools: 'Figma',
      discipline: {
        en: 'User Experience & UI',
        fr: 'Design d’Expérience & Interface'
      }
    },
    problem: {
      en: 'Standard voice note apps accumulate unstructured audio clips that users rarely re-listen to. Great ideas strike while walking or commuting, but without active follow-ups, voice memos turn into unmanageable audio graveyards.',
      fr: 'Les applications de mémos vocaux accumulent des enregistrements non structurés que les utilisateurs ne réécoutent presque jamais. Les bonnes idées surgissent lors de trajets ou de promenades, mais sans rappels actifs, elles deviennent des cimetières audio inexploitables.'
    },
    solution: {
      en: 'Pansies streamlines audio capture down to a single tap. Notes are instantly tagged into clear categories (Projects, Ideas, Personal, Work) and paired with custom notification reminders (e.g., 09:30 AM, 12:30 PM) so users re-listen and act on their thoughts at the right time.',
      fr: 'Pansies simplifie la capture audio en un seul clic. Les mémos sont instantanément classés par catégories claires (Projets, Idées, Personnel, Travail) et associés à des notifications programmées (ex. 09h30, 12h30) pour réécouter et passer à l’action au bon moment.'
    },
    brandAndDesignSystem: {
      concept: {
        en: 'Named after the pansy flower (a symbol of thought) and pluralized to reflect the flow of daily mental ideas.',
        fr: 'Nommé d’après la fleur de pensée (symbole de la réflexion) et pluralisé pour refléter le flux continu des pensées quotidiennes.'
      },
      colorPalette: [
        { name: 'Deep Purple', hex: '#61286C', desc: { en: 'Calm focus', fr: 'Concentration sereine' } },
        { name: 'Amber Yellow', hex: '#E1B43D', desc: { en: 'Interactive highlights', fr: 'Accents d’interaction' } },
        { name: 'Off-White', hex: '#FAF3E0', desc: { en: 'Reduce screen fatigue', fr: 'Confort visuel' } }
      ],
      typography: [
        { name: 'Montserrat', desc: { en: 'Structured geometric titles', fr: 'Titres géométriques structurés' } },
        { name: 'Fustat', desc: { en: 'Soft, readable mobile body text', fr: 'Corps de texte fluide et lisible' } }
      ]
    }
  },
  {
    id: 'cms-ai-websites',
    index: '02',
    title: 'CMS & AI Web Systems',
    category: {
      en: 'WEB DESIGN & SYSTEMS',
      fr: 'DESIGN WEB & SYSTÈMES'
    },
    tagline: {
      en: 'High-efficiency web design leveraging CMS and AI workflows.',
      fr: 'Design web haute efficacité combinant architectures CMS et workflows IA.'
    },
    flashConcept: {
      en: 'High-efficiency web design leveraging CMS and AI workflows.',
      fr: 'Design web haute efficacité combinant architectures CMS et workflows IA.'
    },
    timeline: {
      en: 'Continuous Exploration',
      fr: 'Exploration Continue'
    },
    tools: ['Webflow', 'Framer', 'AI Workflows'],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    metadataBar: {
      role: {
        en: 'Web Designer & Developer',
        fr: 'Web Designer & Développeur'
      },
      context: {
        en: 'Continuous Exploration',
        fr: 'Recherche & Conception'
      },
      tools: 'Framer / Webflow',
      discipline: {
        en: 'Web Design & No-Code',
        fr: 'Design Web & No-Code'
      }
    },
    problem: {
      en: 'Traditional website design and development cycles take weeks of repetitive layout coding, delaying critical go-to-market testing for fast-moving teams.',
      fr: 'Les cycles traditionnels de création web prennent des semaines de développement répétitif, retardant considérablement les tests de mise sur le marché pour les équipes agiles.'
    },
    solution: {
      en: 'A systematic web creation framework using modern visual builders (Webflow / Framer) and AI workflows to generate component variants, structure CMS schemas, and deploy live landing pages in record time.',
      fr: 'Un framework systématique utilisant les builders visuels modernes (Webflow / Framer) et l’IA pour générer des variantes de composants, structurer les schémas CMS et déployer des landing pages en un temps record.'
    },
    brandAndDesignSystem: {
      concept: {
        en: 'Speed, accessibility, and high visual standards for modern marketing landing pages.',
        fr: 'Rapidité, accessibilité et exigences esthétiques élevées pour le web marketing.'
      },
      colorPalette: [
        { name: 'Carbon Black', hex: '#1A1A1A', desc: { en: 'Structural contrast', fr: 'Contraste structurel' } },
        { name: 'Pure White', hex: '#FFFFFF', desc: { en: 'Clean background', fr: 'Fond épuré' } },
        { name: 'Electric Emerald', hex: '#10B981', desc: { en: 'Live status & feedback', fr: 'Statut en direct' } }
      ],
      typography: [
        { name: 'Geist', desc: { en: 'Clean sans-serif geometry', fr: 'Géométrie sans-serif nette' } },
        { name: 'Space Mono', desc: { en: 'Technical indices & tags', fr: 'Indices et tags techniques' } }
      ]
    }
  },
  {
    id: 'notion-templates',
    index: '03',
    title: 'Notion Productivity Systems',
    category: {
      en: 'INFORMATION ARCHITECTURE',
      fr: 'ARCHITECTURE DE L’INFORMATION'
    },
    tagline: {
      en: 'Productivity frameworks and system design templates.',
      fr: 'Frameworks de productivité et architectures de bases de données Notion.'
    },
    flashConcept: {
      en: 'Productivity frameworks and system design templates.',
      fr: 'Frameworks de productivité et architectures de bases de données Notion.'
    },
    timeline: {
      en: 'Public Release',
      fr: 'Publication Publique'
    },
    tools: ['Notion', 'Information Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    metadataBar: {
      role: {
        en: 'System Architect',
        fr: 'Architecte de Systèmes'
      },
      context: {
        en: 'Public Release',
        fr: 'Projet Public'
      },
      tools: 'Notion',
      discipline: {
        en: 'Information Architecture',
        fr: 'Architecture de l’Information'
      }
    },
    problem: {
      en: 'Most workspace frameworks are overloaded with redundant properties and lack clear UX hierarchy, creating cognitive drag for designers and sprint teams.',
      fr: 'La plupart des espaces de travail sont surchargés de propriétés inutiles sans hiérarchie UX claire, créant une fatigue cognitive constante pour les designers et équipes projets.'
    },
    solution: {
      en: 'A clean relational database system organized around 3 core pillars (Inputs, Actions, Archives) with contextual dashboard views tailored for UX designers.',
      fr: 'Un système relationnel épuré structuré autour de 3 piliers (Entrées, Actions, Archives) avec des vues contextuelles adaptées aux flux de travail UX.'
    },
    brandAndDesignSystem: {
      concept: {
        en: 'Eliminating workspace noise through strictly relational database architecture.',
        fr: 'Élimination du bruit visuel grâce à une architecture relationnelle rigoureuse.'
      },
      colorPalette: [
        { name: 'Paper Ecru', hex: '#F4F3EF', desc: { en: 'Warm workspace tone', fr: 'Teinte de travail chaleureuse' } },
        { name: 'Graphite', hex: '#2A2A2A', desc: { en: 'Readable text blocks', fr: 'Blocs de lecture contrastés' } },
        { name: 'Slate Gray', hex: '#666664', desc: { en: 'Metadata & dividers', fr: 'Métadonnées et séparateurs' } }
      ],
      typography: [
        { name: 'Inter / Geist', desc: { en: 'Standard UI legibility', fr: 'Lisibilité d’interface standard' } },
        { name: 'Space Mono', desc: { en: 'Identifiers & formulas', fr: 'Identifiants et formules' } }
      ]
    }
  }
];
