export type ServicePackage = {
  id: string;
  name: string;
  
  tagline: string;

  inclusions: string[];
};

export const servicePackages: ServicePackage[] = [
   
  {
    id: 'platinum',
    name: 'platinum Package',
    
    tagline: 'A premium package for clients seeking comprehensive, high-level Astro-Vastu services.',
    
    inclusions: [],
  },
  {
    id: 'gold',
    name: 'gold Package',
   
    tagline: 'An advanced package offering a broad range of Astro-Vastu services.',

    inclusions: [],
  },
  {
    id: 'silver',
    name: 'silver Package',
    
    tagline: 'A focused package for clients seeking selected Astro-Vastu services.',
 
    inclusions: [],
  },
  {
    id: 'bronze',
    name: 'bronze Package',
    
    tagline: 'An entry-level package with services tailored to your requirements.',
     
    inclusions: [],
  },
  
  
];
