import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import CasesShowcase from "../_sections/cases/cases-showcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildPageMetadata({
    locale,
    path: `/cases`,
    title: t("nav.cases"),
    description: t("cases.metaDescription"),
  });
}

export default function UseCases() {
  return (
    <main className="min-h-screen">
      <CasesShowcase />
    </main>
  );
}
