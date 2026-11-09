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
      <div className="mx-auto flex h-11 max-w-[1880px] items-center justify-start md:justify-center gap-3 pl-4 pr-12 text-[13px] md:text-sm">
        <span className="hidden md:inline-flex shrink-0 rounded-full bg-[#8FD3F4]/20 px-2.5 py-0.5 text-[11px] font-bold tracking-[0.08em] text-[#8FD3F4]">
          {t("barLabel")}
        </span>
        <a
          href={CES_AWARD.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 min-h-11 items-center gap-2 hover:opacity-90"
        >
          <strong className="truncate font-semibold">{t("barTitle")}</strong>
          <span className="hidden lg:inline shrink-0 text-white/80">· {t("barDesc")}</span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-white/85 md:text-white underline underline-offset-[3px]">
            {t("cta")}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="sr-only">{t("newTab")}</span>
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("closeBarAria")}
        className="absolute right-0 top-0 flex size-11 items-center justify-center text-white/80 hover:text-white md:right-3"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
