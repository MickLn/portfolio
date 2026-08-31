export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  flashConcept: string;
  timeline: string;
  tools: string[];
  thumbnail: string;
  metadataBar: {
    role: string;
    context: string;
    tools: string;
  };
  problem: string;
  solution: string;
  brandAndDesignSystem?: {
    concept: string;
    colorPalette: {
      name: string;
      hex: string;
      desc: string;
    }[];
    typography: {
      name: string;
      desc: string;
    }[];
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pansies',
    index: '01',
    title: 'Pansies',
    category: 'MOBILE APP / ACADEMIC SPRINT',
    tagline: 'Instant voice capture app with scheduled notification reminders.',
    flashConcept: 'Instant voice capture app with scheduled notification reminders.',
    timeline: '4-Day Academic Sprint',
    tools: ['Figma'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    metadataBar: {
      role: 'UX/UI Designer',
      context: '4-Day Academic Sprint',
      tools: 'Figma'
    },
    problem: 'Standard voice note apps accumulate unstructured audio clips that users rarely re-listen to. Great ideas strike while walking or commuting, but without active follow-ups, voice memos turn into unmanageable audio graveyards.',
    solution: 'Pansies streamlines audio capture down to a single tap. Notes are instantly tagged into clear categories (Projects, Ideas, Personal, Work) and paired with custom notification reminders (e.g., 09:30 AM, 12:30 PM) so users re-listen and act on their thoughts at the right time.',
    brandAndDesignSystem: {
      concept: 'Named after the pansy flower (a symbol of thought) and pluralized to reflect the flow of daily mental ideas.',
      colorPalette: [
        { name: 'Deep Purple', hex: '#61286C', desc: 'Calm focus' },
        { name: 'Amber Yellow', hex: '#E1B43D', desc: 'Interactive highlights' },
        { name: 'Off-White', hex: '#FAF3E0', desc: 'Reduce screen fatigue' }
      ],
      typography: [
        { name: 'Montserrat', desc: 'Structured geometric titles' },
        { name: 'Fustat', desc: 'Soft, highly readable mobile body text' }
      ]
    }
  },
  {
    id: 'cms-ai-websites',
    index: '02',
    title: 'CMS & AI Web Systems',
    category: 'WEB DESIGN & SYSTEMS',
    tagline: 'High-efficiency web design leveraging CMS and AI workflows.',
    flashConcept: 'High-efficiency web design leveraging CMS and AI workflows.',
    timeline: 'Continuous Exploration',
    tools: ['Webflow', 'Framer', 'AI Workflows'],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    metadataBar: {
      role: 'Web Designer & Developer',
      context: 'Continuous Exploration',
      tools: 'Framer / Webflow'
    },
    problem: 'Traditional website design and development cycles take weeks of repetitive layout coding, delaying critical go-to-market testing for fast-moving teams.',
    solution: 'A systematic web creation framework using modern visual builders (Webflow / Framer) and AI workflows to generate component variants, structure CMS schemas, and deploy live landing pages in record time.',
    brandAndDesignSystem: {
      concept: 'Speed, accessibility, and high visual standards for modern marketing landing pages.',
      colorPalette: [
        { name: 'Carbon Black', hex: '#1A1A1A', desc: 'Structural contrast' },
        { name: 'Pure White', hex: '#FFFFFF', desc: 'Clean background' },
        { name: 'Electric Emerald', hex: '#10B981', desc: 'Live status & feedback' }
      ],
      typography: [
        { name: 'Geist', desc: 'Clean sans-serif geometry' },
        { name: 'Space Mono', desc: 'Technical indices & tags' }
      ]
    }
  },
  {
    id: 'notion-templates',
    index: '03',
    title: 'Notion Productivity Systems',
    category: 'INFORMATION ARCHITECTURE',
    tagline: 'Productivity frameworks and system design templates.',
    flashConcept: 'Productivity frameworks and system design templates.',
    timeline: 'Public Release',
    tools: ['Notion', 'Information Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    metadataBar: {
      role: 'System Architect',
      context: 'Public Release',
      tools: 'Notion'
    },
    problem: 'Most workspace frameworks are overloaded with redundant properties and lack clear UX hierarchy, creating cognitive drag for designers and sprint teams.',
    solution: 'A clean relational database system organized around 3 core pillars (Inputs, Actions, Archives) with contextual dashboard views tailored for UX designers.',
    brandAndDesignSystem: {
      concept: 'Eliminating workspace noise through strictly relational database architecture.',
      colorPalette: [
        { name: 'Paper Ecru', hex: '#F4F3EF', desc: 'Warm workspace tone' },
        { name: 'Graphite', hex: '#2A2A2A', desc: 'Readable text blocks' },
        { name: 'Slate Gray', hex: '#666664', desc: 'Metadata & dividers' }
      ],
      typography: [
        { name: 'Inter / Geist', desc: 'Standard UI legibility' },
        { name: 'Space Mono', desc: 'Identifiers & formulas' }
      ]
    }
  }
];
