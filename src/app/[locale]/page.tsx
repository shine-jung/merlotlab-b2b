// src/app/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import Script from "next/script";
import LandingClient from "./page.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildPageMetadata({
    locale,
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
    ogTitle: t("ogTitle"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const siteName = tMeta("siteName");
  return (
    <>
      {/* Sitelinks 힌트 */}
      <Script id="ld-sitenav" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "SiteNavigationElement", "name": tNav("solutionsEms"), "url": "https://www.merlotlab.com/solutions" },
              { "@type": "SiteNavigationElement", "name": tNav("cases"), "url": "https://www.merlotlab.com/cases" },
              { "@type": "SiteNavigationElement", "name": tNav("about"), "url": "https://www.merlotlab.com/about" },
              { "@type": "SiteNavigationElement", "name": tNav("ir"), "url": "https://www.merlotlab.com/ir/disclosures" }
            ]
          })
        }}
      />

      {/* Organization */}
      <Script id="ld-organization" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteName,
            "url": "https://www.merlotlab.com",
            "logo": "https://www.merlotlab.com/favicon.png",
            "sameAs": []
          })
        }}
      />

      {/* WebSite + SearchAction (검색창 없으면 유지해도 무방) */}
      <Script id="ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": "https://www.merlotlab.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.merlotlab.com/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <LandingClient />
    </>
  );
}
