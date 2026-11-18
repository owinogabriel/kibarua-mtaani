import type { CategorySlug } from "@/data/categories";

export type MockJob = {
  id: string;
  category: CategorySlug;
  title: string;
  estate: string;
  when: "asap" | "today" | "tomorrow" | "thisWeek" | "flexible";
  budget: number | null;
  postedHoursAgo: number;
};

export const mockJobs: MockJob[] = [
  { id: "1", category: "cleaning", title: "Clean a 2-bedroom house", estate: "Kilimani", when: "tomorrow", budget: 1500, postedHoursAgo: 2 },
  { id: "2", category: "fundi", title: "Fix leaking kitchen tap", estate: "South B", when: "today", budget: 800, postedHoursAgo: 3 },
  { id: "3", category: "moving", title: "Move a bedsitter to Rongai", estate: "Umoja", when: "thisWeek", budget: null, postedHoursAgo: 5 },
  { id: "4", category: "laundry", title: "Weekly laundry and ironing", estate: "Westlands", when: "flexible", budget: 1200, postedHoursAgo: 8 },
  { id: "5", category: "delivery", title: "Pick up and deliver a parcel", estate: "Donholm", when: "asap", budget: 400, postedHoursAgo: 1 },
  { id: "6", category: "gardening", title: "Trim hedge and mow lawn", estate: "Karen", when: "thisWeek", budget: 2500, postedHoursAgo: 12 },
  { id: "7", category: "painting", title: "Repaint one living room", estate: "Kasarani", when: "flexible", budget: null, postedHoursAgo: 20 },
];