import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth/session";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = await getDictionary();
  const user = await getCurrentUser();

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Navbar
          dict={dict.nav}
          locale={locale}
          user={user ? { name: user.name } : null}
        />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
