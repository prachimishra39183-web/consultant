export type ServicePackage = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  inclusions: string[];
};

export const servicePackages: ServicePackage[] = [
  {
    id: 'gold',
    name: 'Gold Package',
    price: '₹2,50,000',
    tagline: 'A premium package for clients seeking comprehensive, high-level Astro-Vastu services.',
    inclusions: [],
  },
  {
    id: 'silver',
    name: 'Silver Package',
    price: '₹1,50,000',
    tagline: 'An advanced package offering a broad range of Astro-Vastu services.',
    inclusions: [],
  },
  {
    id: 'bronze',
    name: 'Bronze Package',
    price: '₹80,000',
    tagline: 'A focused package for clients seeking selected Astro-Vastu services.',
    inclusions: [],
  },
  {
    id: 'basic',
    name: 'Basic Package',
    price: '₹30,000 – ₹50,000',
    tagline: 'An entry-level package with services tailored to your requirements.',
    inclusions: [],
  },
];
