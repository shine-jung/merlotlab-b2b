import type { NextPage } from 'next';
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer: NextPage = () => {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  return (
    <div className="w-full relative bg-[#1B2027] flex flex-col items-center justify-start px-4 sm:px-5 py-12 sm:py-16 box-border text-left text-sm sm:text-base text-zinc-400 font-roboto">
      <div className="w-full max-w-[1120px] relative">
        <div className="flex flex-col items-start justify-start gap-6 sm:gap-8">
          {/* 로고 */}
          <div className="flex flex-col items-start justify-start py-2">
            <div className="flex flex-col items-start justify-start">
              <div className="w-32 sm:w-40 h-8 sm:h-[35px] flex items-center justify-center">
                <Image
                  className="w-[120px] sm:w-[150px] h-[20px] sm:h-[25px] object-contain"
                  width={150}
                  height={25}
                  alt={tCommon("logoAlt")}
                  src="/images/brand/logo-white.svg"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-8">
            {/* 왼쪽 텍스트 */}
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
              <div className="relative leading-6 sm:leading-7">
                <p className="m-0 text-sm sm:text-base">{t("tagline1")}</p>
                <p className="m-0 text-primary font-semibold text-sm sm:text-base">
                  {t("tagline2")}
                </p>
              </div>
            </div>

            {/* 오른쪽 주소 정보 */}
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
              <div className="relative leading-6 sm:leading-7">
                <p className="m-0 text-sm sm:text-base">{t("address")}</p>
                <p className="m-0 text-sm sm:text-base">{t("phone")}</p>
                <p className="m-0 text-sm sm:text-base">{t("businessNumber")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full bg-zinc-300 h-px mt-8 sm:mt-12" />

        {/* 저작권 */}
        <div className="flex flex-col items-start justify-start break-keep text-xs sm:text-sm mt-4 sm:mt-6">
          <div className="relative leading-5">{t("copyright")}</div>
          {/* CES 로고 가이드(2026) 준수: CES® 사용 시 CTA 상표 귀속 문구를 표기 영역에 기재 */}
          <div className="relative leading-5 mt-1">{t("trademark")}</div>
          {/* CES Innovation Awards Honoree Guide 필수 문구: 웹사이트에서 수상 언급 시 원문(영문) 그대로 기재 */}
          <div className="relative leading-5 mt-1">{t("cesDisclaimer")}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
