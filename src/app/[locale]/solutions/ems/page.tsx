import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { buildPageMetadata } from "@/lib/seo"
import EmsHero from "../../_sections/ems/hero"
import EmsIntro from "../../_sections/ems/intro"
import EmsSteps from "../../_sections/ems/steps"
import EmsFeatures from "../../_sections/ems/features"
import EmsSiteTypes from "../../_sections/ems/site-types"
import EmsCostBars from "../../_sections/ems/cost-bars"
import EmsPricingZero from "../../_sections/ems/pricing-zero"
import EmsProcessSteps from "../../_sections/ems/process-steps"
import EmsValues from "../../_sections/ems/values"
import EmsCta from "../../_sections/ems/cta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ems" })
  return buildPageMetadata({
    locale,
    path: `/solutions/ems`,
    title: t("heroTitle"),
    description: t.raw("heroSubtitle") as string,
  })
}

export default function EmsPage() {
  return (
    <div className="w-full">
      <EmsHero />
      <EmsIntro />
      <EmsSteps />
      <EmsFeatures />
      <EmsSiteTypes />
      <EmsCostBars />
      <EmsPricingZero />
      <EmsProcessSteps />
      <EmsValues />
      <EmsCta />
    </div>
  )
}
