export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  description: string
  items: FAQItem[]
}

export const FAQ_SECTION = {
  eyebrow: 'FAQ',
  title: 'Frequently Asked Questions',
  lead: 'Clear answers about how Projonexa works — from project types and deliverables to pricing, timelines, careers, and getting started.',
} as const

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'What Projonexa is and who we work with.',
    items: [
      {
        question: 'What is Projonexa?',
        answer:
          'Projonexa is a technology-driven innovation platform based in Maharashtra, India. We help students, colleges, startups, and businesses turn ideas into real-world software — including final year projects, AI/ML systems, web and mobile apps, IoT solutions, and startup MVPs with full documentation and mentor support.',
      },
      {
        question: 'Who can work with Projonexa?',
        answer:
          'We work with engineering and computer science students (BE, BTech, MCA, BCA), college faculty, startups, freelancers, and businesses. Whether you need an academic submission or a production-ready product, we align delivery to your goals and deadlines.',
      },
      {
        question: 'How do I start a project with Projonexa?',
        answer:
          'Visit our Contact page and submit the project inquiry form, or email nisargalokhande@gmail.com with your idea, branch, deadline, and budget range. Our team typically responds within 24 hours on business days with next steps and a discovery call if needed.',
      },
    ],
  },
  {
    id: 'projects-services',
    title: 'Projects & services',
    description: 'Types of work we deliver end to end.',
    items: [
      {
        question: 'What types of projects does Projonexa handle?',
        answer:
          'We deliver mini projects, final year (BE/BTech/MCA) projects, AI/ML and data science systems, web and mobile applications, IoT and embedded solutions, startup MVPs, custom enterprise software, technical documentation packs, and internship-oriented project support across major engineering streams.',
      },
      {
        question: 'Do you help with mini projects and semester submissions?',
        answer:
          'Yes. Mini projects include working implementation, project report, presentation slides, and code walkthrough support — ideal for quick semester deadlines with clean, evaluable deliverables.',
      },
      {
        question: 'Can you build AI/ML and IoT final year projects?',
        answer:
          'Yes. We build trained models, datasets pipelines, evaluation reports, dashboards, hardware integration, firmware, and cloud connectivity — with documentation suitable for viva and external evaluation.',
      },
      {
        question: 'Do you build products like mobile apps for real users?',
        answer:
          'Yes. We design and ship live products — for example SPPU BUDDY, our education app for SPPU students on Google Play. See the Projects page for apps and platforms we have built and published.',
      },
    ],
  },
  {
    id: 'deliverables',
    title: 'Deliverables & quality',
    description: 'What you receive with every engagement.',
    items: [
      {
        question: 'What deliverables are included with a project?',
        answer:
          'Depending on scope, deliverables typically include full source code, SRS and design documentation, project report, presentation slides (PPT), testing notes, deployment or hosting guidance, demo support, and viva preparation. Startup and MVP engagements add architecture docs and iteration roadmaps.',
      },
      {
        question: 'Will I receive complete source code?',
        answer:
          'Yes. You receive the complete codebase with setup instructions so you can run, demo, and explain the project. We also provide a code walkthrough session so you understand the implementation before submission or viva.',
      },
      {
        question: 'Do you help with viva and presentation preparation?',
        answer:
          'Yes. Mentor support covers likely viva questions, architecture explanations, demo flow, and presentation structure — so you can defend the project confidently, not only submit files.',
      },
      {
        question: 'Can you revise work if my guide requests changes?',
        answer:
          'Reasonable revisions within the agreed scope are part of our process. Share guide or evaluator feedback early; we align updates with your submission timeline where possible.',
      },
    ],
  },
  {
    id: 'timelines-pricing',
    title: 'Timelines & pricing',
    description: 'How long projects take and how pricing works.',
    items: [
      {
        question: 'How long does a typical final year project take?',
        answer:
          'Timelines depend on complexity. Mini projects often take 1–2 weeks, standard final year projects 3–6 weeks, and advanced AI/IoT or full-stack systems 6–10 weeks. We plan milestones against your college deadline from day one.',
      },
      {
        question: 'Is pricing affordable for students?',
        answer:
          'Yes. We offer student-friendly, transparent pricing based on scope and deadline. Visit the Pricing page for plan outlines, or contact us for a custom quote tailored to your requirements.',
      },
      {
        question: 'How is pricing calculated for a custom project?',
        answer:
          'Pricing reflects technology stack, feature count, documentation depth, timeline urgency, and support level (mentorship, viva prep, deployment). After a short discovery discussion, we share a clear scope and quote before work begins.',
      },
    ],
  },
  {
    id: 'startups-business',
    title: 'Startups & businesses',
    description: 'MVPs and software for founders and teams.',
    items: [
      {
        question: 'Can startups hire Projonexa for MVP development?',
        answer:
          'Yes. We build lean, scalable MVPs for demos, user testing, and investor conversations — including core features, admin tools, analytics hooks, and a practical post-MVP roadmap.',
      },
      {
        question: 'Do you work with clients outside India?',
        answer:
          'Yes. We collaborate remotely with students and institutions across India and support startups and businesses globally through structured sprints and clear communication channels.',
      },
    ],
  },
  {
    id: 'careers-team',
    title: 'Careers & joining the team',
    description: 'Apply to become part of the Projonexa network.',
    items: [
      {
        question: 'Can I join the Projonexa team as a developer or mentor?',
        answer:
          'Yes. We welcome developers, designers, QA engineers, mentors, interns, and open applications. Visit the Careers page to see roles, then complete the application form at /careers/apply to submit your profile, skills, and availability.',
      },
      {
        question: 'Is Projonexa hiring remote freelancers?',
        answer:
          'Yes. Much of our work is remote-friendly across India and globally. Roles include full-time, part-time, freelance, and internship arrangements depending on project needs and your profile.',
      },
    ],
  },
  {
    id: 'support-contact',
    title: 'Support & contact',
    description: 'How to reach us after you start.',
    items: [
      {
        question: 'How fast does Projonexa respond to inquiries?',
        answer:
          'We aim to respond within 24 hours on business days for project inquiries and career applications. Urgent deadline requests should mention your submission date in the first message.',
      },
      {
        question: 'What is the best way to contact Projonexa?',
        answer:
          'Use the Contact page form for project inquiries, the Careers apply form for joining the team, or email nisargalokhande@gmail.com directly. Include your project type, timeline, and any college or startup context so we can reply with relevant next steps.',
      },
    ],
  },
]

/** Flat list for FAQ schema and legacy imports */
export const FAQ_ITEMS: FAQItem[] = FAQ_CATEGORIES.flatMap((category) => category.items)
