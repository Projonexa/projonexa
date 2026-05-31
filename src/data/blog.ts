export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'final-year-guide',
    title: 'The Complete Guide to Choosing Your Final Year Project Topic',
    excerpt:
      'Learn how to select a project topic that impresses evaluators, aligns with industry trends, and sets you apart in placements.',
    category: 'Academic',
    readTime: '8 min read',
    date: '2025-11-15',
  },
  {
    id: 'ai-project-trends',
    title: 'Top AI Project Ideas for Engineering Students in 2026',
    excerpt:
      'From computer vision to NLP chatbots — explore high-impact AI project ideas with real implementation pathways.',
    category: 'AI / ML',
    readTime: '10 min read',
    date: '2025-12-02',
  },
  {
    id: 'mvp-playbook',
    title: 'How to Build a Startup MVP on a Student Budget',
    excerpt:
      'A practical playbook for validating your startup idea with a lean MVP that investors and early users actually understand.',
    category: 'Startups',
    readTime: '12 min read',
    date: '2026-01-20',
  },
  {
    id: 'documentation-matters',
    title: 'Why Documentation Can Make or Break Your Project Grade',
    excerpt:
      'SRS, diagrams, and reports are not afterthoughts. Here is how professional documentation elevates your project evaluation.',
    category: 'Best Practices',
    readTime: '6 min read',
    date: '2026-03-01',
  },
  {
    id: 'iot-starter',
    title: 'Getting Started with IoT Projects: Hardware to Cloud',
    excerpt:
      'A beginner-friendly roadmap for building connected IoT systems from sensor selection to cloud dashboards.',
    category: 'IoT',
    readTime: '9 min read',
    date: '2026-03-18',
  },
]
