export const categories = [
  { slug: "cleaning", emoji: "🧹" },
  { slug: "laundry", emoji: "🧺" },
  { slug: "fundi", emoji: "🔧" },
  { slug: "delivery", emoji: "🛵" },
  { slug: "moving", emoji: "📦" },
  { slug: "gardening", emoji: "🌿" },
  { slug: "painting", emoji: "🎨" },
  { slug: "other", emoji: "✨" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
