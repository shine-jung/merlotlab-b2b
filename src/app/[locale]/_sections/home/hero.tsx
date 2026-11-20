"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

// 리뉴얼 Hero: 슬라이더 대신 정적 풀블리드 배너 (docs/renewal/메인.png)
export default function HeroSection() {
  const t = useTranslations("home")
  // mbr: 모바일 전용 줄바꿈, dbr: 데스크톱(lg 이상) 전용 줄바꿈 — 태블릿은 자연 줄바꿈
  const mbr = () => <br className="sm:hidden" />
  const dbr = () => <br className="hidden lg:inline" />

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* 배경 배너 이미지 */}
      <Image
        src="/images/main/1-banner.webp"
        alt={t("logoAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* 가독성 그라디언트 (좌측만 은은하게 어둡게) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

      {/* 텍스트 (수직 중앙보다 약간 위) */}
      <div className="relative z-10 max-w-[1880px] mx-auto flex min-h-[calc(100vh-4rem)] items-center px-6 sm:px-10 lg:px-20 2xl:px-48">
        <div className="max-w-3xl text-white">
          {/* 프리미티브 미적용(의도): 커스텀 line-height(/[1.15]·/[1.5])가 hero variant와 달라 raw 유지 */}
          <h1 className="text-4xl/[1.15] sm:text-5xl/[1.5] font-bold">
            {t.rich("heroHeadline", { mbr })}
          </h1>
          <p className="mt-8 sm:mt-20 text-base sm:text-xl text-white/85 leading-relaxed break-keep">
            {t.rich("heroBannerSubtitle", { dbr })}
          </p>
        </div>
      </div>
    </section>
  )
}
