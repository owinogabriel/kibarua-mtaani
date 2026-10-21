import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="px-4 pb-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-brand-900 px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-brand-100">
          Join your neighbours already getting things done on Kibarua Mtaani.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/post-job"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-900 transition hover:bg-brand-50"
          >
            Post a job
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition hover:bg-accent-600"
          >
            Register as a worker
          </Link>
        </div>
      </div>
    </section>
  );
}
