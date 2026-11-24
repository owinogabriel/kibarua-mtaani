import Link from "next/link";
import { navLinks } from "@/data/nav";
import { getDictionary } from "@/lib/i18n";
import { connection } from "next/server";

export default async function Footer() {
  await connection();
  const dict = await getDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">
            Kibarua<span className="text-accent-400">Mtaani</span>
          </p>
          <p className="mt-2 text-sm text-brand-100/80">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {dict.footer.quickLinks}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {dict.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {dict.footer.contact}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>WhatsApp: +254 740 851 719</li>
            <li>hello@kibaruamtaani.co.ke</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-100/60">
        © {year} Kibarua Mtaani. {dict.footer.rights}
      </div>
    </footer>
  );
}
