// CES 2027 혁신상 수상 알림 (상단 배너 + 메인 팝업) 설정
// endsAt 이후에는 배너·팝업 모두 자동 미노출 → 기간 종료 후 코드 제거 전까지 안전
export const CES_AWARD = {
  url: "https://www.ces.tech/ces-innovation-awards/2027/merlot-building-dx-platform/",
  badgeSrc: "/images/awards/ces-2027-honoree.webp",
  endsAt: "2027-02-01T00:00:00+09:00",
  barStorageKey: "ces2027-bar-dismissed",
  popupStorageKey: "ces2027-popup-hide-until",
} as const

export const isCesAwardActive = (now: number = Date.now()) =>
  now < new Date(CES_AWARD.endsAt).getTime()

// hydration 전에 실행되는 인라인 스크립트: 만료/닫힘이면 <html data-ces-bar="hidden">
export const cesBarInitScript = `(function(){try{var h=Date.now()>=${new Date(
  CES_AWARD.endsAt
).getTime()}||sessionStorage.getItem(${JSON.stringify(
  CES_AWARD.barStorageKey
)})==="1";if(h)document.documentElement.setAttribute("data-ces-bar","hidden")}catch(e){}})()`
