import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { applications, jobs, workers } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { getDictionary, getLocale } from "@/lib/i18n";
import { categories } from "@/data/categories";
import { allowedNext, type JobStatus } from "@/lib/jobStatus";
import { whatsappLink } from "@/lib/whatsapp";
import { setMyJobStatus, withdrawApplication } from "./actions";

const statusStyle: Record<string, string> = {
  open: "bg-green-100 text-green-800",
  assigned: "bg-blue-100 text-blue-800",
  done: "bg-gray-200 text-gray-700",
  cancelled: "bg-red-100 text-red-800",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.dashboard;

  const date = (d: Date) =>
    d.toLocaleDateString(locale === "sw" ? "sw-KE" : "en-KE", {
      timeZone: "Africa/Nairobi",
      day: "numeric",
      month: "short",
    });
  const statusLabel = (s: string) => (t.status as Record<string, string>)[s] ?? s;
  const actionLabel = (s: string) => (t.actions as Record<string, string>)[s] ?? s;
  const emoji = (slug: string) => categories.find((c) => c.slug === slug)?.emoji ?? "🛠️";

  // Jobs I posted, and the people interested in them
  const myJobs = await db
    .select()
    .from(jobs)
    .where(eq(jobs.userId, user.id))
    .orderBy(desc(jobs.createdAt));

  const jobIds = myJobs.map((j) => j.id);
  const applicants = jobIds.length
    ? await db
        .select()
        .from(applications)
        .where(inArray(applications.jobId, jobIds))
        .orderBy(desc(applications.createdAt))
    : [];

  const applicantsByJob = new Map<string, typeof applicants>();
  for (const a of applicants) {
    const list = applicantsByJob.get(a.jobId) ?? [];
    list.push(a);
    applicantsByJob.set(a.jobId, list);
  }

  // Jobs I applied to
  const myApplications = await db
    .select({
      id: applications.id,
      createdAt: applications.createdAt,
      title: jobs.title,
      estate: jobs.estate,
      status: jobs.status,
      category: jobs.category,
      budget: jobs.budget,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(eq(applications.userId, user.id))
    .orderBy(desc(applications.createdAt));

  // My worker profile, if I have one
  const [profile] = await db
    .select({ verified: workers.verified })
    .from(workers)
    .where(eq(workers.userId, user.id))
    .limit(1);

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t.greeting.replace("{name}", user.name.split(" ")[0])}
        </h1>
        <p className="mt-2 text-gray-600">{t.subtitle}</p>

        {/* Quick actions */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link
            href="/post-job"
            className="rounded-2xl bg-brand-600 p-4 text-center font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            🙋 {t.postJob}
          </Link>
          <Link
            href="/find-work"
            className="rounded-2xl bg-accent-500 p-4 text-center font-semibold text-white shadow-sm hover:bg-accent-600"
          >
            💪 {t.findWork}
          </Link>
          {profile ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center text-sm font-semibold text-gray-700 shadow-sm">
              🧰 {t.workerReady}
              {profile.verified && (
                <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-700">
                  ✅ {t.verifiedBadge}
                </span>
              )}
            </div>
          ) : (
            <Link
              href="/register-worker"
              className="rounded-2xl border border-gray-200 bg-white p-4 text-center font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
            >
              🧰 {t.registerWorker}
            </Link>
          )}
        </div>

        {/* My jobs */}
        <h2 className="mt-12 text-xl font-bold text-gray-900">{t.myJobs}</h2>

        {myJobs.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-600">
            {t.noJobs}
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {myJobs.map((job) => {
              const people = applicantsByJob.get(job.id) ?? [];
              const nextOptions = allowedNext[job.status as JobStatus] ?? [];

              return (
                <li key={job.id} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-500">
                        {job.ref} · {t.posted.replace("{date}", date(job.createdAt))}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900">
                        {emoji(job.category)} {job.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        📍 {job.estate} ·{" "}
                        {job.budget ? `KES ${job.budget.toLocaleString("en-KE")}` : "—"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[job.status] ?? ""}`}
                    >
                      {statusLabel(job.status)}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {t.interested.replace("{n}", String(people.length))}
                    </p>
                    {people.length === 0 ? (
                      <p className="mt-1 text-sm text-gray-500">{t.noApplicants}</p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {people.map((a) => (
                          <li
                            key={a.id}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm"
                          >
                            <span>
                              <strong>{a.workerName}</strong> · +{a.workerPhone}
                            </span>
                            <a
                              href={whatsappLink(
                                a.workerPhone,
                                t.whatsappMsg
                                  .replace("{name}", a.workerName)
                                  .replace("{title}", job.title),
                              )}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-md bg-brand-600 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-700"
                            >
                              {t.contact}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {nextOptions.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {nextOptions.map((s) => (
                        <form key={s} action={setMyJobStatus}>
                          <input type="hidden" name="jobId" value={job.id} />
                          <input type="hidden" name="status" value={s} />
                          <button
                            type="submit"
                            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            {actionLabel(s)}
                          </button>
                        </form>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* My applications */}
        <h2 className="mt-12 text-xl font-bold text-gray-900">{t.myApplications}</h2>

        {myApplications.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-600">
            {t.noApplications}
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {myApplications.map((app) => (
              <li
                key={app.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {emoji(app.category)} {app.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    📍 {app.estate} · {t.applied.replace("{date}", date(app.createdAt))}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[app.status] ?? ""}`}
                  >
                    {statusLabel(app.status)}
                  </span>
                  <form action={withdrawApplication}>
                    <input type="hidden" name="applicationId" value={app.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {t.withdraw}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}