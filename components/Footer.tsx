import Link from "next/link";
import { navLinks } from "../data/nav";
import { cacheLife } from "next/cache";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">
            Kibarua<span className="text-accent-500">Mtaani</span>
          </p>
          <p className="mt-2 text-sm text-brand-100/80">
            Neighborhood gigs, done right. Find trusted help or find work in
            your estate.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Qick links</p>
          <ul>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>WhatsApp: +254 786 800 859</li>
            <li>hello@kibaruamtaani.co.ke</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-brand-100/60">
          © <CurrentYear /> Kibarua Mtaani. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Cache the current year for a day to avoid unnecessary re-renders
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
