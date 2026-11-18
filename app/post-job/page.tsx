import PostJobForm from "@/components/PostJobForm";
import { getDictionary } from "@/lib/i18n";

export default async function PostJobPage() {
  const dict = await getDictionary();

  return (
    <main className="bg-brand-50/40">
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {dict.postJob.title}
        </h1>
        <p className="mt-2 text-gray-600">{dict.postJob.subtitle}</p>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <PostJobForm
            dict={dict.postJob}
            categoryNames={dict.categories.items}
          />
        </div>
      </div>
    </main>
  );
}
