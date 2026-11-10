"use client"

import { ArrowUpRight, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { CES_AWARD } from "@/config/ces-award"

export default function CesAnnouncementBar() {
  const t = useTranslations("cesAward")

  const dismiss = () => {
    try {
      sessionStorage.setItem(CES_AWARD.barStorageKey, "1")
    } catch {}
    document.documentElement.setAttribute("data-ces-bar", "hidden")
  }

  return (
    <div className="ces-bar relative w-full bg-[#1B1F4E] text-white">
      {/* lg 미만: 제목/제품명 2줄 + ↗ 아이콘 (제품 식별 + 영문 제목 잘림 방지) / lg 이상: 1줄 */}
      <div className="mx-auto flex min-h-[52px] max-w-[1880px] items-center justify-start gap-3 pl-4 pr-12 text-[13px] tracking-[-0.01em] lg:h-11 lg:min-h-0 lg:justify-center lg:text-sm">
        <span className="hidden lg:inline shrink-0 text-xs font-bold tracking-normal text-[#8FD3F4]">
          {t("barLabel")}
        </span>
        <span className="hidden lg:block h-3 w-px shrink-0 bg-white/20" aria-hidden="true" />
        <a
          href={CES_AWARD.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center gap-2 py-2 hover:opacity-90 lg:min-h-11 lg:flex-none lg:py-0"
        >
          <span className="flex min-w-0 flex-col lg:flex-row lg:items-center lg:gap-2">
            <strong className="truncate font-semibold leading-5 tracking-normal">{t("barTitle")}</strong>
            <span className="truncate text-xs leading-4 text-white/65 lg:shrink-0 lg:text-sm lg:leading-normal">
              <span className="sm:hidden">{t("barProduct")}</span>
              <span className="hidden sm:inline">
                <span className="hidden lg:inline">· </span>
                {t("barDesc")}
              </span>
            </span>
          </span>
          <span className="ml-1 hidden shrink-0 items-center gap-[3px] font-semibold hover:underline hover:underline-offset-[3px] lg:inline-flex">
            {t("cta")}
            <ArrowUpRight className="size-[13px]" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <ArrowUpRight className="ml-auto size-4 shrink-0 text-white/80 lg:hidden" strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">{t("newTab")}</span>
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("closeBarAria")}
        className="absolute right-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-white/60 hover:text-white md:right-3"
      >
        <X className="size-[15px]" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  )
}
