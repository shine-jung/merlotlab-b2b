import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import AboutHeroSection from "../_sections/about/hero";
import AboutIntro from "../_sections/about/intro";
import CompanyOverview from "../_sections/about/company-overview";
import DirectionsSection from "../_sections/about/directions";
import AboutHistory from "../_sections/about/history";
import CertificationsSection from "../_sections/about/certifications";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildPageMetadata({
    locale,
    path: `/about`,
    title: t("heroTitle"),
    description: t("metaDescription"),
  });
}

export default function About() {
  return (
    <div>
      <AboutHeroSection />
      <AboutIntro />
      <CompanyOverview />
      <DirectionsSection />
      <AboutHistory />
      <CertificationsSection />
    </div>
  );
}
