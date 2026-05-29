export interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  highlight?: string
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'railways-innovation',
    title: 'Indian Railways Innovation System',
    category: 'Government Innovation',
    description:
      'Proposed innovation project for Indian Railways focusing on operational efficiency, safety monitoring, and data-driven decision support.',
    tech: ['IoT', 'Cloud', 'Analytics', 'Mobile'],
    highlight: 'Proposed Innovation Project',
  },
  {
    id: 'sih-winner',
    title: 'Smart India Hackathon 2025 Solution',
    category: 'Hackathon Winner',
    description:
      'Award-winning SIH 2025 project led by our founder, demonstrating rapid prototyping, team leadership, and scalable problem-solving.',
    tech: ['AI/ML', 'React', 'Node.js', 'Cloud'],
    highlight: 'SIH 2025 Winner',
  },
  {
    id: 'health-ai',
    title: 'AI-Powered Health Diagnostics Platform',
    category: 'AI / Healthcare',
    description:
      'Machine learning platform for preliminary health screening with doctor dashboard, patient records, and explainable AI outputs.',
    tech: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
  },
  {
    id: 'campus-erp',
    title: 'University Campus Management System',
    category: 'Web Application',
    description:
      'Full-stack ERP for attendance, exams, fees, and faculty management with role-based access and real-time notifications.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    id: 'smart-agri',
    title: 'Smart Agriculture IoT Suite',
    category: 'IoT',
    description:
      'Sensor-based crop monitoring with soil moisture, weather integration, and automated irrigation control via mobile app.',
    tech: ['Arduino', 'MQTT', 'React Native', 'Firebase'],
  },
  {
    id: 'fintech-mvp',
    title: 'FinTech Startup MVP',
    category: 'Startup MVP',
    description:
      'Investor-ready fintech prototype with KYC flow, wallet management, transaction history, and admin analytics dashboard.',
    tech: ['React', 'Golang', 'PostgreSQL', 'Docker'],
  },
]
