import { redirect } from "next/navigation";
import SignupForm from "@/components/SignupForm";
import { getDictionary } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth/session";
import { safeNext } from "@/lib/auth/redirect";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function SignupPage({ searchParams }: Props) {
  const { next: rawNext } = await searchParams;
  const next = safeNext(rawNext);

  if (await getCurrentUser()) redirect(next);

  const dict = await getDictionary();

  return (
    <main className="bg-brand-50/40">
      <div className="mx-auto max-w-md px-4 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {dict.auth.signup.title}
        </h1>
        <p className="mt-2 text-gray-600">{dict.auth.signup.subtitle}</p>

        {rawNext && (
          <p className="mt-4 rounded-lg bg-accent-400/15 px-3 py-2 text-sm text-gray-800">
            {dict.auth.reason}
          </p>
        )}

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <SignupForm dict={dict.auth} next={next} />
        </div>
      </div>
    </main>
  );
}
