import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinetic Studio",
  description: "Advanced Automotive Management - Sistema Premium de Taller Mecánico en Caracas",
  manifest: "/manifest.json",
  keywords: ["Taller Mecánico", "Caracas", "Toyota", "JAC", "Frenos", "Diagnóstico", "Automotriz"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kinetic",
  },
  openGraph: {
    title: "Kinetic Studio",
    description: "Gestión Automotriz de Clase Mundial en Caracas",
    locale: "es_VE",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
