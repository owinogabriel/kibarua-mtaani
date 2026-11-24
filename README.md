# Kibarua Mtaani

**Neighborhood gigs, done right.** A hyperlocal marketplace for Kenya that connects people who need everyday jobs done (cleaning, fundi work, laundry, delivery, moving, gardening, painting) with trusted people looking for casual work in their own estate.

_Kibarua_ is Swahili for casual or daily-wage work, and _mtaani_ means "in the neighborhood."

> **Status:** early development. The core flows work locally. Payments and a public pilot are still ahead.

---

## Why this exists

Someone in Kilimani needs a plumber today. Someone one street away wants exactly that work. Right now they find each other through word of mouth, WhatsApp groups and luck. Kibarua Mtaani aims to make that connection faster and more trustworthy, starting in a single estate.

## What works so far

- **Home page** with a two-way split ("I need help" / "I want work"), popular job categories, how it works, trust points and a call to action
- **English and Swahili** across the whole site, switched with an EN | SW toggle (cookie-based, no i18n library)
- **Post a job** form with server-side validation (login required)
- **Worker registration** form with multi-select skills and areas, and a consent checkbox
- **Find work** page that reads real jobs from the database, with category and estate filters
- **One-tap "I'm interested"** applications for logged-in users
- **Accounts with phone number and password** (no email, no SMS cost), with signup, login, logout and a dashboard
- **Kenyan phone number handling**: `0712 345 678`, `+254712345678` and `254712345678` all become `254712345678`
- **How it works page** with an FAQ accordion
- **Mobile-first layout** with a responsive navbar

## Tech stack

| Area       | Choice                                                                     |
| ---------- | -------------------------------------------------------------------------- |
| Framework  | Next.js (App Router)                                                       |
| Language   | TypeScript                                                                 |
| Styling    | Tailwind CSS v4 (theme set in `app/globals.css`)                           |
| Database   | Neon (serverless Postgres)                                                 |
| ORM        | Drizzle ORM and Drizzle Kit                                                |
| Validation | Zod                                                                        |
| Forms      | Server Actions with `useActionState`                                       |
| Auth       | Custom: scrypt password hashing, hashed session tokens in httpOnly cookies |

## Project structure

```
kibarua-mtaani/
├── app/
│   ├── page.tsx               Home
│   ├── how-it-works/          How it works and FAQ
│   ├── find-work/             Job listings, filters, apply
│   ├── post-job/              Post a job (login required)
│   ├── register-worker/       Worker registration
│   ├── login/  signup/        Account pages
│   ├── dashboard/             Logged-in landing page
│   ├── auth/actions.ts        Signup, login and logout Server Actions
│   ├── actions.ts             Language switch Server Action
│   ├── layout.tsx             Root layout (navbar, footer, locale, user)
│   └── globals.css            Tailwind import and brand theme
├── components/                Navbar, Footer, Hero, forms, LanguageToggle...
├── data/
│   ├── dictionaries/          en.ts (source of truth) and sw.ts
│   ├── categories.ts          Job categories
│   ├── estates.ts             Estate suggestions
│   └── nav.ts                 Navigation links
├── lib/
│   ├── db/                    Drizzle client and schema
│   ├── auth/                  Passwords, sessions, safe redirects
│   ├── i18n.ts  locales.ts    Language helpers
│   ├── phone.ts               Kenyan phone normalization
│   └── validation.ts          Zod schemas
├── drizzle.config.ts
└── next.config.ts
```

## Getting started

**Requirements:** Node.js 20 or newer and a free [Neon](https://neon.tech) account.

```bash
git clone https://github.com/owinogabriel/kibarua-mtaani.git
cd kibarua-mtaani
npm install
```

Create a `.env.local` file in the project root:

```bash
DATABASE_URL="postgresql://user:password@your-neon-host/neondb?sslmode=require"
```

Never commit this file. It is already ignored by git.

Create the database tables and start the app:

```bash
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Production build                             |
| `npm run db:push`   | Sync the Drizzle schema to the Neon database |
| `npm run db:studio` | Open Drizzle Studio to browse data           |

## Database

| Table            | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `users`          | Accounts (name, phone, password hash)                      |
| `sessions`       | Login sessions (token hash, expiry)                        |
| `login_attempts` | Failed logins, used to slow down password guessing         |
| `jobs`           | Posted jobs, linked to the account that posted them        |
| `workers`        | Worker profiles (skills, areas, experience, verified flag) |
| `applications`   | Workers' interest in jobs (one per account per job)        |

## Security and privacy notes

- Passwords are hashed with scrypt and a per-password salt. They are never stored or logged in plain text.
- The session cookie holds a random token, and only its hash is stored in the database.
- Login checks live inside Server Actions, not only in page redirects, because Server Actions are public endpoints.
- Wrong phone number and wrong password show the same message, so the form can't be used to discover who is registered.
- After 5 failed logins on a number, further attempts are blocked for 15 minutes.
- Honeypot fields and per-account rate limits reduce spam (3 jobs and 10 applications per account per day).
- Public queries never select customer or worker phone numbers.
- The `next` redirect after login only accepts paths inside the site.
- Phone numbers are personal data. Before a public launch, review Kenya's Data Protection Act (including ODPC registration).

## Known limitations

- No password reset yet. For the pilot, users contact the team to reset.
- Phone numbers are not verified, since SMS one-time codes were postponed to avoid cost during the pilot.
- No notifications. Someone has to check the data to match jobs with workers.
- Payments are not built yet. Customers and workers agree and settle the price directly.

## Roadmap

- [x] Project setup, theme, navbar and footer
- [x] Home page
- [x] English / Swahili toggle
- [x] Post a job and worker registration forms
- [x] Neon and Drizzle, real job listings
- [x] Phone and password accounts
- [x] Login required to post jobs and apply
- [x] Dashboard: my jobs, interested workers and my applications
- [ ] Require login for worker registration and link profiles to accounts
- [ ] Admin page: view jobs and workers, WhatsApp links, mark workers verified, reset passwords
- [x] Deploy to Vercel
- [ ] Pilot in one estate and collect feedback
- [ ] Phone verification with SMS codes
- [ ] M-Pesa payments with Daraja (STK Push), then payouts to workers
- [ ] Ratings and reviews

## Contributing

This is a solo learning project for now. Issues and suggestions are welcome.

## Author

Built by [@owinogabriel](https://github.com/owinogabriel).
