import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
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

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workerName: text("worker_name").notNull(),
    workerPhone: text("worker_phone").notNull(), // 2547XXXXXXXX
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [unique("applications_job_user_unique").on(t.jobId, t.userId)],
);

// store users and their account details with each having unique identifier and their uuid being automatically generated when they are created
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(), // phone number set to be unique
  passwordHash: text("password_harsh").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  tokenHash: text("token_hash").primaryKey(), // every session token hash is unique
  // connect session to user in the user table
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // if user account is deleted there session is deleted to
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// failed loginss only
export const loginAttempts = pgTable("login_attemps", {
  id: uuid("id").defaultRandom().primaryKey(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
