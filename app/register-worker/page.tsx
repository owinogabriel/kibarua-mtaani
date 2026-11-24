import WorkerForm from "@/components/WorkerForm";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { workers } from "@/lib/db/schema";
import { getDictionary } from "@/lib/i18n";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function RegisterWorkerPage() {
  const user = await getCurrentUser()
  if(!user) redirect("/login?next=/register-worker")

    // Nothing to register if already have profile
    const [existing] = await db.select({id:workers.id}).from(workers).where(eq(workers.userId, user.id)).limit(1)

    if (existing) redirect("/dashboard")
      const dict = await getDictionary()

  return (
    <main className="bg-accent-400/10">
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {dict.worker.title}
        </h1>
        <p className="mt-2 text-gray-600">{dict.worker.subtitle}</p>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <WorkerForm
            dict={dict.worker}
            categoryNames={dict.categories.items}
            account={{name:user.name, phone:user.name}}
          />
        </div>
      </div>
    </main>
  );
}
