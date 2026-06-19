export type MenuOrigin = "Maine" | "Haiti" | "Latin" | "Soulbait";
export type MenuTag = "Fan favorite" | "Spicy" | "New" | "Seasonal" | "Catering";
export type ReviewPlatform = "Yelp" | "Google" | "Instagram";
export type SocialPlatform = "Instagram" | "TikTok";

export interface SocialProfile {
  label: string;
  handle: string;
  url: string;
}

export interface ReviewLink {
  platform: ReviewPlatform;
  label: string;
  url: string;
  enabled: boolean;
}

export interface SocialUpdate {
  platform: SocialPlatform;
  title: string;
  detail: string;
  url: string;
  enabled: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  seasonLabel: string;
  city: string;
  region: string;
  siteUrl: string;
  heroImage: string;
  phone: string;
  email: string;
  ctas: {
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    cateringLabel: string;
    cateringHref: string;
  };
  social: {
    instagram: SocialProfile;
    tiktok: SocialProfile;
  };
  seo: {
    defaultTitle: string;
    description: string;
    ogImage: string;
    keywords: string[];
  };
}

export interface MenuItem {
  name: string;
  origin: MenuOrigin;
  description: string;
  price: string;
  tags: MenuTag[];
  featured: boolean;
  seasonal: boolean;
  image?: string;
  imageAlt?: string;
}

export interface LocationSlot {
  venue: string;
  area: string;
  address: string;
  schedule: string;
  hours: string;
  mapUrl: string;
  embedMapUrl?: string;
  status: "active" | "seasonal" | "private";
}

export const siteConfig: SiteConfig = {
  name: "Soulbait",
  tagline: "Maine coast. Haitian heat. Latin soul.",
  seasonLabel: "Summer 2026",
  city: "Portland",
  region: "Maine",
  siteUrl: "https://soulbaitme.com",
  heroImage: "/images/soulbait-waterfront-truck.png",
  phone: "(207) 555-0186",
  email: "hello@soulbaitme.com",
  ctas: {
    primaryLabel: "Find today's truck",
    primaryHref: "/find-us",
    secondaryLabel: "See the menu",
    secondaryHref: "/menu",
    cateringLabel: "Book catering",
    cateringHref: "/catering"
  },
  social: {
    instagram: {
      label: "Instagram",
      handle: "@soulbaitme",
      url: "https://www.instagram.com/soulbaitme/"
    },
    tiktok: {
      label: "TikTok",
      handle: "@soulbaitme",
      url: "https://www.tiktok.com/@soulbaitme"
    }
  },
  seo: {
    defaultTitle: "Soulbait | Portland Maine Seasonal Food Truck",
    description:
      "Soulbait is a seasonal Portland, Maine food truck serving Maine seafood with Haitian heat and Latin soul. Find today's truck, full menu, waterfront hours, and catering.",
    ogImage: "/images/soulbait-waterfront-truck.png",
    keywords: [
      "Portland Maine food truck",
      "best Portland Maine seafood truck",
      "Maine seafood",
      "Haitian food Portland Maine",
      "Latin food truck",
      "Portland waterfront food",
      "Old Port food",
      "food truck catering Portland Maine",
      "seasonal catering Portland"
    ]
  }
};

export const navItems = [
  { label: "Menu", href: "/menu" },
  { label: "Find Us", href: "/find-us" },
  { label: "Our Story", href: "/story" },
  { label: "Catering", href: "/catering" }
];

export const culturePillars = [
  {
    label: "Maine",
    marker: "Fresh catch",
    description: "Cold-water lobster, haddock, clams, and harbor-side summer energy."
  },
  {
    label: "Haiti",
    marker: "Epis base",
    description: "Green seasoning, bright acid, piment heat, and griot-style depth."
  },
  {
    label: "Latin",
    marker: "Sofrito roots",
    description: "Citrus, herbs, roasted peppers, slow pork, and crisp street-food texture."
  }
];

export const menuItems: MenuItem[] = [
  {
    name: "Lobster Roll Griot",
    origin: "Maine",
    description:
      "Butter-poached Maine lobster, crispy griot, pickled scotch bonnet slaw, and lime herb butter on a toasted split-top roll.",
    price: "$22",
    tags: ["Fan favorite", "Seasonal"],
    featured: true,
    seasonal: true
  },
  {
    name: "Ti Malice Shrimp Tacos",
    origin: "Haiti",
    description:
      "Seared shrimp in ti malice sauce with mango curtido, avocado crema, cabbage, and cilantro. Two per order.",
    price: "$16",
    tags: ["Spicy"],
    featured: true,
    seasonal: true
  },
  {
    name: "Clam Sofrito Bowl",
    origin: "Latin",
    description:
      "Steamed Maine clams over arroz con sofrito with herb oil, charred corn, lime, and a clean hit of brine.",
    price: "$18",
    tags: ["New"],
    featured: true,
    seasonal: true
  },
  {
    name: "Griot and Beans Plate",
    origin: "Haiti",
    description:
      "Crispy pork griot, red beans and rice, pikliz, mayi moulen, and roasted garlic jus.",
    price: "$17",
    tags: ["Fan favorite"],
    featured: false,
    seasonal: false
  },
  {
    name: "Haddock Ceviche Tostones",
    origin: "Maine",
    description:
      "Line-caught haddock, lime, cilantro, cucumber, habanero, and crisp plantain cups.",
    price: "$14",
    tags: ["Spicy", "Seasonal"],
    featured: false,
    seasonal: true
  },
  {
    name: "Pernil Wharf Sandwich",
    origin: "Latin",
    description:
      "Slow-roasted pork shoulder, adobo, pickled red onion, garlic aioli, and greens on pan de agua.",
    price: "$15",
    tags: ["New"],
    featured: false,
    seasonal: false
  },
  {
    name: "Plantain Harbor Nachos",
    origin: "Soulbait",
    description:
      "Crisp plantain chips with black beans, lobster queso, pikliz, crema, scallion, and chili oil.",
    price: "$19",
    tags: ["Catering", "Fan favorite"],
    featured: false,
    seasonal: true
  },
  {
    name: "Citrus Limeade",
    origin: "Soulbait",
    description:
      "Cold limeade with orange, mint, ginger, and a salted rim option for hot dock days.",
    price: "$6",
    tags: ["Seasonal"],
    featured: false,
    seasonal: true
  }
];

export const locationSlots: LocationSlot[] = [
  {
    venue: "Old Port Wharf",
    area: "Commercial Street waterfront",
    address: "Commercial Street, Portland, ME 04101",
    schedule: "Friday - Sunday",
    hours: "11:00 AM - 8:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Old+Port+Wharf+Portland+ME",
    embedMapUrl: "https://www.google.com/maps?q=Commercial%20Street%20waterfront%20Portland%20ME&output=embed",
    status: "active"
  },
  {
    venue: "Eastern Prom",
    area: "East End park loop",
    address: "Eastern Promenade, Portland, ME 04101",
    schedule: "Wednesday - Thursday",
    hours: "12:00 PM - 7:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Eastern+Promenade+Portland+ME",
    embedMapUrl: "https://www.google.com/maps?q=Eastern%20Promenade%20Portland%20ME&output=embed",
    status: "active"
  },
  {
    venue: "Private events",
    area: "Greater Portland",
    address: "Greater Portland, ME",
    schedule: "Monday - Tuesday",
    hours: "By request",
    mapUrl: "/catering",
    status: "private"
  }
];

export const reviewLinks: ReviewLink[] = [
  {
    platform: "Yelp",
    label: "Yelp reviews",
    url: "",
    enabled: false
  },
  {
    platform: "Google",
    label: "Google reviews",
    url: "",
    enabled: false
  },
  {
    platform: "Instagram",
    label: "Tagged guest posts",
    url: "",
    enabled: false
  }
];

export const socialUpdates: SocialUpdate[] = [];

export const storyHighlights = [
  {
    title: "Built for Portland summer",
    body:
      "Soulbait is designed around a short, high-energy Maine season: clear locations, quick service, and dishes that make waterfront lunch feel like an event."
  },
  {
    title: "One window, three foodways",
    body:
      "The menu ties Maine seafood to Haitian epis, pikliz, and griot technique, then finishes with Latin citrus, sofrito, herbs, and street-food structure."
  },
  {
    title: "Fresh enough to stay flexible",
    body:
      "The board changes with weather, catch, and event demand, so the site makes the seasonal lineup easy to update from one typed content file."
  }
];

export const cateringOptions = [
  {
    name: "Dockside Drop",
    detail: "A tight menu for offices, boat crews, and casual gatherings of 20 to 40 guests."
  },
  {
    name: "Full Truck Service",
    detail: "The truck on site with a focused menu, service window, and optional late-day limeade bar."
  },
  {
    name: "Festival Lineup",
    detail: "High-volume seasonal service for markets, music nights, and waterfront events."
  }
];

export const originOrder: MenuOrigin[] = ["Maine", "Haiti", "Latin", "Soulbait"];
