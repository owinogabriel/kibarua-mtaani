import WorkerForm from "@/components/WorkerForm";
import { getDictionary } from "@/lib/i18n";

export default async function RegisterWorkerPage() {
  const dict = await getDictionary();

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
          />
        </div>
      </div>
    </main>
  );
}
