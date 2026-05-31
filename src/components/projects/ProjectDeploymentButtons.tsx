import { ArrowUpRight, ExternalLink, Github, Globe, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { DeploymentLink, DeploymentLinkType } from '@/data/projects'

const deploymentIcons: Record<DeploymentLinkType, typeof Globe> = {
  'play-store': Smartphone,
  'app-store': Smartphone,
  web: Globe,
  github: Github,
  demo: ExternalLink,
}

export function ProjectDeploymentButtons({ links }: { links: DeploymentLink[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = deploymentIcons[link.type]
        const isExternal = link.url.startsWith('http') || link.url.startsWith('mailto:')

        if (link.type === 'play-store' || link.type === 'app-store' || isExternal) {
          return (
            <Button
              key={link.url}
              href={link.url}
              variant={link.type === 'play-store' ? 'primary' : 'secondary'}
              className={link.type === 'play-store' ? 'shadow-glow-sm' : ''}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
            </Button>
          )
        }

        return (
          <Button key={link.url} to={link.url} variant="secondary">
            <Icon className="h-4 w-4" aria-hidden />
            {link.label}
          </Button>
        )
      })}
    </div>
  )
}
