import fs from 'fs';
import path from 'path';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  price: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  services: string;
  year: string;
  metric: string;
  metricLabel: string;
  image: string;
  summary: string;
  clientQuote: string;
  results: string[];
}

export interface PricingTier {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export interface SiteSettings {
  heroHeading: string;
  heroSubtext: string;
  aboutHeading: string;
  servicesHeading: string;
}

export interface SiteData {
  team: TeamMember[];
  services: Service[];
  projects: Project[];
  pricing: PricingTier[];
  siteSettings: SiteSettings;
}

const DATA_PATH = path.join(process.cwd(), 'public', 'data', 'site-data.json');

export function getSiteData(): SiteData {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as SiteData;
}

export function writeSiteData(data: SiteData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
