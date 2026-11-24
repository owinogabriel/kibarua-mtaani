import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { getDictionary } from "@/lib/i18n";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { dashboard: t } = await getDictionary();

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t.greeting.replace("{name}", user.name.split(" ")[0])}
        </h1>
        <p className="mt-2 text-gray-600">{t.subtitle}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/post-job"
            className="rounded-2xl bg-brand-600 p-5 font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            🙋 {t.postJob}
          </Link>
          <Link
            href="/find-work"
            className="rounded-2xl bg-accent-500 p-5 font-semibold text-white shadow-sm hover:bg-accent-600"
          >
            💪 {t.findWork}
          </Link>
          <Link
            href="/register-worker"
            className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
          >
            🧰 {t.registerWorker}
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">{t.soon}</p>
      </div>
    </main>
  );
}
