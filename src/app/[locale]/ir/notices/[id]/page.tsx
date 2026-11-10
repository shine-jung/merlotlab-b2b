import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { buildPageMetadata } from "@/lib/seo"
import { getNotice } from "@/sanity/lib/sanity"
import NoticeDetailClient from "./page.client"

// 상세 페이지: id로 Sanity에서 글을 조회해 제목을 동적 메타데이터로 제공.
// 본문 렌더는 client(page.client.tsx)가 useParams로 다시 fetch (기존 동작 유지).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const t = await getTranslations({ locale })
  const item = await getNotice(id)
  const title = item?.title ?? t("ir.tabAnnouncement")
  return buildPageMetadata({
    locale,
    path: `/ir/notices/${id}`,
    title,
    description: t("metadata.description"),
  })
}

export default function Page() {
  return <NoticeDetailClient />
}
