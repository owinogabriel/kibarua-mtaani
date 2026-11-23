"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/data/nav";
import { logout } from "@/app/auth/actions";
import LanguageToggle from "@/components/LanguageToggle";
import type { Dictionary } from "@/data/dictionaries/en";
import type { Locale } from "@/lib/locales";

type Props = {
  dict: Dictionary["nav"];
  locale: Locale;
  user: { name: string } | null;
};

export default function Navbar({ dict, locale, user }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold text-brand-700"
          onClick={() => setOpen(false)}
        >
          Kibarua<span className="text-accent-500">Mtaani</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition hover:text-brand-600 ${
                  pathname === link.href ? "text-brand-600" : "text-gray-600"
                }`}
              >
                {dict[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: language toggle, desktop buttons, mobile hamburger */}
        <div className="flex items-center gap-3">
          <LanguageToggle current={locale} />

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-100"
                >
                  {user.name.split(" ")[0]}
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="text-sm font-medium text-gray-600 hover:text-brand-600"
                  >
                    {dict.logout}
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-brand-600"
                >
                  {dict.login}
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  {dict.signup}
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={dict.menu}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    pathname === link.href
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {dict[link.key]}
                </Link>
              </li>
            ))}

            <li className="mt-2 flex gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    {dict.dashboard}
                  </Link>
                  <form action={logout} className="flex-1">
                    <button
                      type="submit"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-700"
                    >
                      {dict.logout}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-700"
                  >
                    {dict.login}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    {dict.signup}
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
