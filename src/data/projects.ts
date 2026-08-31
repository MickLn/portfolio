export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  flashConcept: string;
  timeline: string;
  tools: string[];
  thumbnail: string;
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  keyHighlights: {
    label: string;
    value: string;
  }[];
  figmaUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pansies',
    index: '01',
    title: 'Pansies',
    category: 'Mobile App / Sprint',
    flashConcept: 'Instant voice capture app with smart notifications',
    timeline: '4-day Academic Sprint',
    tools: ['Figma', 'UX Research', 'Interactive Prototyping', 'Design System'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    overview: 'An ultra-focused voice note capture app designed to turn spoken thoughts into prioritized actions with zero cognitive load.',
    problem: 'Standard audio note apps accumulate unstructured audio clips that users rarely listen back to, turning quick voice memos into an unmanageable archive.',
    solution: 'Designed an interactive mobile experience where recording takes one tap from the lock screen widget, audio is parsed instantly into structured bullet points, and contextual reminder notifications trigger based on schedule urgency.',
    results: [
      'Engineered a complete 4-day Figma prototype from wireframes to hi-fi interactive micro-states.',
      'Reduced voice-to-structured-task capture time from 15 seconds to under 3 seconds.',
      'Defined a crisp 8pt design token system for consistent typography and spacing.'
    ],
    keyHighlights: [
      { label: 'Sprint Duration', value: '4 Days' },
      { label: 'Platform', value: 'iOS Mobile' },
      { label: 'Deliverables', value: 'Hi-Fi Figma Prototype, UI Kit' }
    ]
  },
  {
    id: 'cms-ai-websites',
    index: '02',
    title: 'CMS & AI Web Systems',
    category: 'Web Design & Systems',
    flashConcept: 'High-efficiency web design leveraging CMS and AI workflows',
    timeline: 'Continuous Exploration & Client Work',
    tools: ['Framer', 'Webflow', 'AI Workflows', 'UI Systems', 'Information Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    overview: 'Production-ready web design pipeline combining AI-assisted wireframing and modern CMS engines to launch fast, accessible marketing sites.',
    problem: 'Traditional design-to-development cycles for marketing websites often take weeks of repetitive layout coding, delaying go-to-market testing for early-stage teams.',
    solution: 'Built a systematic web creation framework using modern visual builders and AI workflow automations to generate component variants, structure SEO-ready CMS schemas, and deploy live landing pages in days.',
    results: [
      'Streamlined responsive page generation with reusable component libraries.',
      'Maintained 100/100 Lighthouse performance and accessibility benchmarks across desktop and mobile.',
      'Cut design delivery iterations by 50% without compromising visual polish.'
    ],
    keyHighlights: [
      { label: 'Approach', value: 'Content-First & Systems' },
      { label: 'Stack', value: 'Framer / Webflow / CMS' },
      { label: 'Outcome', value: 'Fast Turnaround, Clean Code' }
    ]
  },
  {
    id: 'notion-templates',
    index: '03',
    title: 'Notion Productivity Systems',
    category: 'Information Architecture',
    flashConcept: 'Productivity frameworks and system design templates',
    timeline: 'Personal & Public Release',
    tools: ['Notion', 'Database Architecture', 'UX Mapping', 'System Design'],
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    overview: 'Modular Notion operating frameworks designed for freelance task tracking, design sprints, and personal knowledge management.',
    problem: 'Most workspace templates are either overloaded with redundant properties or too bare to maintain team alignment during rapid design cycles.',
    solution: 'Architected a minimalist relational database system with linked sprint trackers, asset libraries, and automated weekly review views optimized for UX designers and students.',
    results: [
      'Created intuitive UX navigation with contextual dashboards and filtered views.',
      'Eliminated clutter by structuring database relations around 3 core pillars: Inputs, Actions, and Archives.',
      'Adopted by design peers for tracking design sprint milestones and portfolio assets.'
    ],
    keyHighlights: [
      { label: 'Discipline', value: 'Information Architecture' },
      { label: 'Ecosystem', value: 'Notion Relational DB' },
      { label: 'Focus', value: 'UX Designers & Sprint Workflows' }
    ]
  }
];
