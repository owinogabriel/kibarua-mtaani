import Link from "next/link";
import { and, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { categories, type CategorySlug } from "@/data/categories";
import { getDictionary } from "@/lib/i18n";
import { inputClass } from "@/lib/formStyles";
import { estates } from "@/data/estate";

type Props = {
  searchParams: Promise<{ category?: string; estate?: string }>;
};

export default async function FindWorkPage({ searchParams }: Props) {
  const { category = "", estate = "" } = await searchParams;
  const dict = await getDictionary();
  const t = dict.findWork;
  const catNames = dict.categories.items;

  const rows = await db
    .select({
      id: jobs.id,
      category: jobs.category,
      title: jobs.title,
      estate: jobs.estate,
      timing: jobs.timing,
      budget: jobs.budget,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .where(
      and(
        eq(jobs.status, "open"),
        category ? eq(jobs.category, category) : undefined,
        estate ? ilike(jobs.estate, estate) : undefined,
      ),
    )
    .orderBy(desc(jobs.createdAt))
    .limit(50);

  const hasFilters = Boolean(category || estate);

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold text-gray-900">{t.title}</h1>
        <p className="mt-2 text-gray-600">{t.subtitle}</p>

        {/* Filters: a plain GET form, so no client JavaScript needed */}
        <form
          method="get"
          className="mt-8 grid gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto]"
        >
          <select
            name="category"
            defaultValue={category}
            aria-label={t.category}
            className={inputClass()}
          >
            <option value="">{t.allCategories}</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.emoji} {catNames[cat.slug].name}
              </option>
            ))}
          </select>

          <select
            name="estate"
            defaultValue={estate}
            aria-label={t.area}
            className={inputClass()}
          >
            <option value="">{t.allAreas}</option>
            {estates.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {t.filter}
          </button>

          {hasFilters && (
            <Link
              href="/find-work"
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {t.clear}
            </Link>
          )}
        </form>

        <p className="mt-6 text-sm text-gray-500">
          {t.results.replace("{n}", String(rows.length))}
        </p>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
            {t.noResults}
          </div>
        ) : (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {rows.map((job) => {
              const cat = categories.find((c) => c.slug === job.category);
              if (!cat) return null;

              const hoursAgo = Math.max(
                1,
                Math.floor((Date.now() - job.createdAt.getTime()) / 3_600_000),
              );
              const whenLabel =
                dict.postJob.when[
                  job.timing as keyof typeof dict.postJob.when
                ] ?? job.timing;

              return (
                <li
                  key={job.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {cat.emoji} {catNames[cat.slug as CategorySlug].name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {t.postedAgo.replace("{n}", String(hoursAgo))}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-gray-900">
                    {job.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    📍 {job.estate} · 🕒 {whenLabel}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {job.budget
                        ? `KES ${job.budget.toLocaleString("en-KE")}`
                        : t.quotes}
                    </span>
                    <Link
                      href="/register-worker"
                      className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
                    >
                      {t.interested}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10 text-center text-sm text-gray-600">
          {t.noAccountCta}{" "}
          <Link
            href="/register-worker"
            className="font-semibold text-brand-700 hover:underline"
          >
            {t.register}
          </Link>
        </div>
      </div>
    </main>
  );
}
