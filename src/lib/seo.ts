import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { SITE_URL, OG_LOCALE } from "@/config/site"

// 공유 미리보기(OG) 이미지: 1200×630, 국문/영문
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const
export const ogImagePath = (locale: string) => `/og/og-${locale === "en" ? "en" : "ko"}.jpg`

// 메시지의 <br></br> 등 rich 태그를 메타 설명용 평문으로
const toPlainText = (s: string) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()

type PageMetadataInput = {
  locale: string
  /** locale 접두어 없는 경로. 홈은 "" (예: "/tech", "/solutions/rtls") */
  path: string
  title: string
  description: string
  /** 기본값 `${title} | ${siteName}` — 홈처럼 별도 OG 제목이 있을 때만 지정 */
  ogTitle?: string
}

// 페이지 메타데이터 공통 빌더: title/description/canonical + 페이지별 OG·Twitter
// (Next는 하위 페이지가 openGraph를 지정하지 않으면 layout 것을 그대로 물려받아
//  어느 페이지를 공유해도 메인 카드가 뜨므로, 페이지마다 명시적으로 채운다)
export async function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
}: PageMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" })
  const siteName = t("siteName")
  const koUrl = `${SITE_URL}${path}`
  const enUrl = `${SITE_URL}/en${path}`
  const url = locale === "en" ? enUrl : koUrl
  const desc = toPlainText(description)
  const shareTitle = ogTitle ?? `${title} | ${siteName}`
  const image = ogImagePath(locale)

  return {
    title,
    description: desc,
    alternates: {
      canonical: url,
      languages: { ko: koUrl, en: enUrl },
    },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: shareTitle,
      description: desc,
      locale: OG_LOCALE[locale] ?? "ko_KR",
      images: [{ url: image, ...OG_IMAGE_SIZE, alt: t("ogImageAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: desc,
      images: [image],
    },
  }
}
