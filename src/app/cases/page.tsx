"use client";

import { useState } from "react";
import Statistics from "@/components/statistics/statistics";
import PortfolioUseCases from "@/components/card/portfolio-use-cases";
import FadeInUp from "@/components/animation/fade-in-up";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import LogoCarouselMain from "@/components/carousel/logo-carousel-cases";

const stats = [
  {
    label: "도입 사업장",
    value: 54,
    unit: "개소",
    description: "23.01 ~ 25.12",
  },
  {
    label: "누적 설치량",
    value: 86763,
    unit: "개",
    description: "전환 시스템을 개수로 표기",
  },
  {
    label: "평균 설치 소요 기간",
    value: 10,
    unit: "일",
    description: "사업장 한 곳 설치 완료 기준",
  },
  {
    label: "사업장 전력량 절감 평균",
    value: 50,
    unit: "%",
    description: "시스템 도입 후 절감된 평균 수치",
  },
];

const filterTypes = [
  { label: "전체", value: "all" },
  { label: "공장", value: "factory" },
  { label: "물류센터", value: "logistics_center" },
  { label: "주차장", value: "parking_lot" },
  { label: "사무실", value: "office" },
];

export default function UseCases() {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative w-full px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white text-center">
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 bottom-0 left-[664px] right-[1300px] border-l border-r border-black/5 bg-[linear-gradient(-45deg,_rgba(3,7,18,0.05),_rgba(3,7,18,0.05)_7.07%,_rgba(3,7,18,0)_7.07%,_rgba(3,7,18,0)_50%)]" />
          <div className="absolute top-0 bottom-0 left-[1206px] right-[664px] border-l border-r border-black/5 bg-[linear-gradient(-45deg,_rgba(3,7,18,0.05),_rgba(3,7,18,0.05)_7.07%,_rgba(3,7,18,0)_7.07%,_rgba(3,7,18,0)_50%)]" />
        </div>

        <div className="inner-container relative max-w-full mx-auto text-primary">
          <div className="py-4 sm:py-8">
            {/* <h2 className="text-sm sm:text-base md:text-lg lg:text-xl">Customers</h2> */}
          </div>
          <div className="text-center text-gray-700">
            <FadeInUp delay={300}>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight xs:leading-[1.2] sm:leading-[50px] md:leading-[60px]">
                메를로랩이 사업장 전력 절감
                <FadeInUp delay={400}>
                  <span className="text-primary block mt-0 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-4">
                    함께 하겠습니다
                  </span>
                </FadeInUp>
              </h2>
            </FadeInUp>
            <LogoCarouselMain />
          </div>

          <div className="inner-container relative max-w-[1300px] mx-auto">
            <Statistics stats={stats} />

            {/* 필터 섹션 */}
            <FadeInUp delay={300} threshold={0.1}>
              <div className="my-6 xs:my-8 sm:my-10 md:my-12">
                <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3 mb-4 xs:mb-6 sm:mb-8 px-2 xs:px-4">
                  {filterTypes.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={
                        activeFilter === filter.value ? "default" : "outline"
                      }
                      onClick={() => handleFilterChange(filter.value)}
                      className={`px-2.5 xs:px-3 sm:px-4 md:px-6 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm sm:text-base rounded-full transition-all duration-200 whitespace-nowrap ${
                        activeFilter === filter.value
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "border-primary text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={300} threshold={0.1}>
              <PortfolioUseCases activeFilter={activeFilter} />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
