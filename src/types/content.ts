export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  locale: string;
}

export interface TrustStat {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
}
