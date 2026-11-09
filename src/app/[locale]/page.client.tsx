"use client"

import HeroSection from "./_sections/home/hero"
import PlatformSection from "./_sections/home/platform"
import MerlotSolutionsSection from "./_sections/home/merlot-solutions"
import PartnersSection from "./_sections/home/partners"
import CasesPreviewSection from "./_sections/home/cases-preview"
import HomeCtaSection from "./_sections/home/cta"
import CesAwardPopup from "@/components/ces-award/popup"

// 리뉴얼 홈: 상태 오케스트레이션/useSearchParams 없음 → 정적(SSG). 6섹션 나열.
export default function LandingClient() {
  return (
    <div className="w-full">
      <HeroSection />
      <PlatformSection />
      <MerlotSolutionsSection />
      <PartnersSection />
      <CasesPreviewSection />
      <HomeCtaSection />
      <CesAwardPopup />
    </div>
  )
}
