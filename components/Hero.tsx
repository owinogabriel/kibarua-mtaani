import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
        <p className="mx-auto mb-4 w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Neighborhood gigs, done right
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
          Help and work,{" "}
          <span className="text-brand-600">right in your mtaa</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          Hire trusted people for everday jobs, or find work near you. Fast,
          fair and paid through M-pes
        </p>

        {/* The two-way split */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
          <Link
            href="/post-job"
            className="group rounded-2xl bg-brand-600 p-6 text-left text-white shadow-lg hover:-translate-y-1 hover:bg-brand-700"
          >
            <span className="text-3xl">🙋</span>
            <h2 className="mt-3 text-xl font-bold">I need help</h2>
            <p className="mt-1 text-sm text-brand-100">
              Post a job under a minute
            </p>
            <span className="mt-4 inline-block text-sm font-semibold">
              Post a job{" "}
              <span className="transition group-hover:translate-x-1 inline-block">
                →
              </span>
            </span>
          </Link>

          <Link
            href="/find-work"
            className="group rounded-2xl bg-accent-500 p-6 text-left text-white shadow-lg transition hover:-translate-y-1 hover:bg-accent-600"
          >
            <span className="text-3xl">💪</span>
            <h2 className="mt-3 text-xl font-bold">I want work</h2>
            <p className="mt-1 text-sm text-amber-50">
              Find gigs near you and earn today.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold">
              Find work{" "}
              <span className="transition group-hover:translate-x-1 inline-block">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
