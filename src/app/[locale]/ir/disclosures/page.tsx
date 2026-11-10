import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { buildPageMetadata } from "@/lib/seo"
import DisclosuresClient from "./page.client"

// client 페이지(page.client.tsx)는 metadata를 export할 수 없어, server 래퍼에서 generateMetadata 제공.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return buildPageMetadata({
    locale,
    path: `/ir/disclosures`,
    title: t("ir.tabDisclosure"),
    description: t("metadata.description"),
  })
}

export default function Page() {
  return <DisclosuresClient />
}
