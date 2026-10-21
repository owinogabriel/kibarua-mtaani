import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
        Popular jobs
      </h2>
      <p className="mt-2 text-center text-gray-600">
        Whatever needs doing, someone nearby can do it.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/find-work?category=${cat.slug}`}
            className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-500 hover:shadow-md"
          >
            <div className="text-4xl">{cat.emoji}</div>
            <h3 className="mt-3 font-semibold text-gray-900">{cat.name}</h3>
            <p className="mt-1 text-xs text-gray-500">{cat.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
