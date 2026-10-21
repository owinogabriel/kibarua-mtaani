const items = [
  {
    icon: "✅",
    title: "ID-verified workers",
    text: "We check IDs before badges are given.",
  },
  {
    icon: "⭐",
    title: "Real ratings",
    text: "Reviews only from completed jobs.",
  },
  {
    icon: "📱",
    title: "Pay with M-Pesa",
    text: "Safe, simple, no cash stress.",
  },
];

export default function TrustStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="text-center">
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-3 font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
