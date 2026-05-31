import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/context/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { BlogPage } from '@/pages/BlogPage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { PricingPage } from '@/pages/PricingPage'
import { CareersPage } from '@/pages/CareersPage'
import { FAQPage } from '@/pages/FAQPage'
import { ContactPage } from '@/pages/ContactPage'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="research" element={<Navigate to="/services" replace />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
