export type ServicePackage = {
  id: string;
  name: string;
  price: string;
  tagline: string;

  inclusions: string[];
};

export const servicePackages: ServicePackage[] = [
   
  {
    id: 'platinum',
    name: 'platinum Package',
    price: '₹2,50,000',
    tagline: 'A premium package for clients seeking comprehensive, high-level Astro-Vastu services.',
    visit : ' visiting fee 11000',
    inclusions: [],
  },
  {
    id: 'gold',
    name: 'gold Package',
    price: '₹1,51,000',
    tagline: 'An advanced package offering a broad range of Astro-Vastu services.',

    inclusions: [],
  },
  {
    id: 'silver',
    name: 'silver Package',
    price: '₹75,000',
    tagline: 'A focused package for clients seeking selected Astro-Vastu services.',
 
    inclusions: [],
  },
  {
    id: 'bronze',
    name: 'bronze Package',
    price: '₹51000',
    tagline: 'An entry-level package with services tailored to your requirements.',
     
    inclusions: [],
  },
  
  
];
