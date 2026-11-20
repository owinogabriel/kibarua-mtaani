import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  ref: text("ref").notNull().unique(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  estate: text("estate").notNull(),
  timing: text("timing").notNull(),
  budget: integer("budget"), // KES, null = "get quotes"
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status: text("status").notNull().default("open"), // open, assigned, done, cancelled
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workers = pgTable("workers", {
  id: uuid("id").defaultRandom().primaryKey(),
  ref: text("ref").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  skills: text("skills").array().notNull(),
  areas: text("areas").array().notNull(),
  experience: text("experience").notNull(),
  about: text("about").notNull().default(""),
  consent: boolean("consent").notNull().default(false), // true = consented to receive job notifications, false = not consented
  verified: boolean("verified").notNull().default(false), // true = verified, false = not verified
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
