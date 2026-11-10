// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { routing } from "@/i18n/routing";
import { SITE_URL, OG_LOCALE } from "@/config/site";
import { OG_IMAGE_SIZE, ogImagePath } from "@/lib/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CesAnnouncementBar from "@/components/ces-award/announcement-bar";
import { cesBarInitScript } from "@/config/ces-award";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  // as-needed: 기본어(ko)는 접두어 없음, 그 외는 /{locale}
  const localeRoot = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      url: localeRoot,
      siteName: t("siteName"),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: ogImagePath(locale), ...OG_IMAGE_SIZE, alt: t("ogImageAlt") }],
      locale: OG_LOCALE[locale] ?? "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ogImagePath(locale)],
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // 정적 렌더링을 위해 요청 locale 설정
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
        <head>
        <meta
          name="google-site-verification"
          content="NKQOJg90j72zxiMiwFdrHaYZOgX5mOYIN6LoRFZcC80"
        />
        <meta
          name="naver-site-verification"
          content="a3ea98909496dc26ff2182b47e9aaf493e2c217a"
        />
        {/* CES 배너: 만료/닫힘이면 hydration 전에 숨김 표시 (깜빡임·CLS 방지) */}
        <script dangerouslySetInnerHTML={{ __html: cesBarInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="#583CF2" height={3} showSpinner={false} shadow="0 0 10px #583CF2,0 0 5px #583CF2" />
        <NextIntlClientProvider>
          <CesAnnouncementBar />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
