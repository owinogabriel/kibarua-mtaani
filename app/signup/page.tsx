import { redirect } from "next/navigation";
import SignupForm from "@/components/SignupForm";
import { getDictionary } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth/session";

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  const dict = await getDictionary();

  return (
    <main className="bg-brand-50/40">
      <div className="mx-auto max-w-md px-4 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {dict.auth.signup.title}
        </h1>
        <p className="mt-2 text-gray-600">{dict.auth.signup.subtitle}</p>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <SignupForm dict={dict.auth} />
        </div>
      </div>
    </main>
  );
}
