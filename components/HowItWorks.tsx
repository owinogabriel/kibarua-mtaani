import { hirerSteps, workerSteps } from "@/data/steps";

type Step = { title: string; text: string };

function StepList({
  title,
  steps,
  color,
}: {
  title: string;
  steps: Step[];
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
      <ol className="mt-5 space-y-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-gray-900">{step.title}</p>
              <p className="text-sm text-gray-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
          How it works
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <StepList
            title="If you need help"
            steps={hirerSteps}
            color="text-brand-700"
          />
          <StepList
            title="If you want work"
            steps={workerSteps}
            color="text-accent-600"
          />
        </div>
      </div>
    </section>
  );
}
