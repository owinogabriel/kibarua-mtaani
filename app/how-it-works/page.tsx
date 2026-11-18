import HowItWorks from "@/components/HowItWorks";
import CtaBanner from "@/components/CtaBanner";
import { getDictionary } from "@/lib/i18n";

export default async function HowItWorksPage() {
  const { howPage } = await getDictionary();

  return (
    <main>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-5xl">
            {howPage.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{howPage.subtitle}</p>
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {howPage.faqHeading}
        </h2>
        <div className="mt-8 space-y-3">
          {howPage.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-gray-200 bg-white p-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                {faq.q}
                <span className="ml-4 text-brand-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
