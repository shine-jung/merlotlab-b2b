"use client"

import { type ReactNode, type TouchEvent, useCallback, useEffect, useId, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { CES_AWARD, isCesAwardActive } from "@/config/ces-award"

const SHOW_DELAY_MS = 600
const HIDE_ANIM_MS = 300
const DRAG_SLOP_PX = 6
const DISMISS_PX = 80
const DISMISS_VELOCITY = 0.5
const MOBILE_QUERY = "(max-width: 639px)"
const ONE_DAY_MS = 24 * 60 * 60 * 1000

const br = () => (
  <>
    <span className="sm:hidden">{" "}</span>
    <br className="hidden sm:inline" />
  </>
)
const b = (chunks: ReactNode) => (
  <strong className="font-semibold text-white">{chunks}</strong>
)

export default function CesAwardPopup() {
  const t = useTranslations("cesAward")
  const titleId = useId()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hideToday, setHideToday] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [swipedOut, setSwipedOut] = useState(false)
  const dragRef = useRef<{ startY: number; startT: number; active: boolean; dy: number } | null>(null)

  useEffect(() => {
    if (!isCesAwardActive()) return
    try {
      const until = Number(localStorage.getItem(CES_AWARD.popupStorageKey) ?? 0)
      if (Date.now() < until) return
    } catch {}
    setMounted(true)
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const close = useCallback(() => {
    if (hideToday) {
      try {
        localStorage.setItem(CES_AWARD.popupStorageKey, String(Date.now() + ONE_DAY_MS))
      } catch {}
    }
    setVisible(false)
    window.setTimeout(() => setMounted(false), HIDE_ANIM_MS)
  }, [hideToday])

  const onTouchStart = (e: TouchEvent) => {
    if (!window.matchMedia(MOBILE_QUERY).matches) return
    dragRef.current = { startY: e.touches[0].clientY, startT: performance.now(), active: false, dy: 0 }
  }

  const onTouchMove = (e: TouchEvent) => {
    const d = dragRef.current
    if (!d) return
    const dy = e.touches[0].clientY - d.startY
    if (!d.active) {
      if (Math.abs(dy) < DRAG_SLOP_PX) return
      d.active = true
      setDragging(true)
    }
    d.dy = dy > 0 ? dy : dy * 0.2
    setDragY(d.dy)
  }

  const onTouchEnd = () => {
    const d = dragRef.current
    dragRef.current = null
    if (!d?.active) return
    setDragging(false)
    const velocity = d.dy / Math.max(1, performance.now() - d.startT)
    if (d.dy > DISMISS_PX || velocity > DISMISS_VELOCITY) {
      setSwipedOut(true)
      close()
    } else {
      setDragY(0)
    }
  }

  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mounted, close])

  if (!mounted) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      style={
        swipedOut || dragging || dragY !== 0
          ? {
              transform: swipedOut ? "translateY(100%)" : `translateY(${dragY}px)`,
              transition: dragging ? "none" : undefined,
            }
          : undefined
      }
      className={`fixed touch-none overscroll-contain sm:touch-auto inset-x-0 bottom-0 z-[999] overflow-hidden rounded-t-[20px] border border-white/10 bg-[#1B1F4E] pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-12px_32px_-8px_rgba(8,10,36,0.5)] transition duration-300 ease-out motion-reduce:transition-none sm:inset-x-auto sm:bottom-8 sm:right-8 sm:w-[420px] sm:rounded-[20px] sm:pb-0 sm:shadow-[0_24px_48px_-12px_rgba(8,10,36,0.5),0_4px_12px_-2px_rgba(8,10,36,0.25)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/30 sm:hidden" aria-hidden="true" />

      <button
        type="button"
        onClick={close}
        aria-label={t("closePopupAria")}
        className="absolute right-1.5 top-2 flex size-11 items-center justify-center text-white/75 hover:text-white sm:top-1.5"
      >
        <X className="size-[18px]" aria-hidden="true" />
      </button>

      <div className="flex gap-4 px-5 pb-4 pt-[18px] sm:gap-[22px] sm:px-[26px] sm:pb-5 sm:pt-[26px]">
        <Image
          src={CES_AWARD.badgeSrc}
          alt={t("badgeAlt")}
          width={480}
          height={600}
          sizes="104px"
          className="h-[100px] w-20 shrink-0 sm:h-[130px] sm:w-[104px]"
        />
        <div className="flex flex-col gap-1.5 pr-6 sm:gap-2.5 sm:pr-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8FD3F4] sm:text-xs">
            {t("popupEyebrow")}
          </p>
          <h2 id={titleId} className="break-keep text-xl font-bold leading-[1.3] sm:text-2xl">
            {t.rich("popupTitle", { br })}
          </h2>
          <p className="break-keep text-[13px] leading-[1.55] text-white/80 sm:text-sm sm:leading-[1.6]">
            {t.rich("popupDesc", { b })}
          </p>
        </div>
      </div>

      <div className="px-5 pb-2 sm:px-[26px] sm:pb-5">
        <a
          href={CES_AWARD.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-white text-[15px] font-semibold text-[#1B1F4E] hover:opacity-90"
        >
          {t("cta")}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">{t("newTab")}</span>
        </a>
      </div>

      <div className="flex items-center justify-between pb-3 pl-5 pr-2.5 sm:border-t sm:border-white/10 sm:py-1.5 sm:pl-[22px] sm:pr-3.5">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[13px] text-white/80">
          <input
            type="checkbox"
            checked={hideToday}
            onChange={(e) => setHideToday(e.target.checked)}
            className="size-4 accent-[#8FD3F4]"
          />
          {t("hideToday")}
        </label>
        <button
          type="button"
          onClick={close}
          className="min-h-11 px-2.5 text-[13px] text-white/80 hover:text-white"
        >
          {t("close")}
        </button>
      </div>
    </div>
  )
}
