import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { buildPageMetadata } from "@/lib/seo"
import TechHero from "../_sections/tech/hero"
import TechVideo from "../_sections/tech/video"
import TechAlgorithms from "../_sections/tech/algorithms"
import TechCta from "../_sections/tech/cta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "tech" })
  return buildPageMetadata({
    locale,
    path: `/tech`,
    title: t("heroTitle"),
    description: t("heroSubtitle"),
  })
}

export default function TechPage() {
  return (
    <div className="w-full">
      <TechHero />
      <TechVideo />
      <TechAlgorithms />
      <TechCta />
    </div>
  )
}
