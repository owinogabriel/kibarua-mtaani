export type Category = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
};

export const categories: Category[] = [
  {
    slug: "cleaning",
    name: "Cleaning",
    emoji: "🧹",
    blurb: "Homes, offices, post-event",
  },
  { slug: "laundry", name: "Laundry", emoji: "🧺", blurb: "Mama fua, ironing" },
  {
    slug: "fundi",
    name: "Fundi",
    emoji: "🔧",
    blurb: "Plumbing, electrical, repairs",
  },
  {
    slug: "delivery",
    name: "Delivery",
    emoji: "🛵",
    blurb: "Errands and packages",
  },
  {
    slug: "moving",
    name: "Moving",
    emoji: "📦",
    blurb: "House moves, loading",
  },
  {
    slug: "gardening",
    name: "Gardening",
    emoji: "🌿",
    blurb: "Lawns, hedges, planting",
  },
  {
    slug: "painting",
    name: "Painting",
    emoji: "🎨",
    blurb: "Interior and exterior",
  },
  {
    slug: "other",
    name: "Other jobs",
    emoji: "✨",
    blurb: "Anything else you need",
  },
];
