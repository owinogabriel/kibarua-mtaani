import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getDictionary } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth/session";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  const dict = await getDictionary();

  return (
    <main className="bg-brand-50/40">
      <div className="mx-auto max-w-md px-4 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {dict.auth.login.title}
        </h1>
        <p className="mt-2 text-gray-600">{dict.auth.login.subtitle}</p>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <LoginForm dict={dict.auth} />
        </div>
      </div>
    </main>
  );
}
