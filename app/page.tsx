import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TrustStrip from "@/components/TrustStrip";
import CtaBanner from "@/components/CtaBanner";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <HowItWorks />
      <TrustStrip />
      <CtaBanner />
    </main>
  );
}