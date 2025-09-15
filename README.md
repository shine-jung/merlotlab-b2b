# 메를로랩 (MerlotLab) 웹사이트

> 에너지 절감의 시작 - EMS 솔루션 전문 기업 메를로랩의 공식 웹사이트
- **웹사이트**: [https://www.merlotlab.com](https://www.merlotlab.com)
  
## 📋 프로젝트 개요

메를로랩은 IoT 기반 에너지 관리 시스템(EMS) 솔루션을 제공하는 기업입니다. 본 웹사이트는 사업장 유형별 맞춤형 에너지 절감 솔루션 소개, 도입 사례, 회사 정보, IR 정보 등을 제공합니다.

### 주요 기능

- **EMS 솔루션 소개**: 물류센터, 제조시설, 주차장, 사무실별 맞춤형 솔루션
- **도입 사례**: 삼성전자, 현대모비스, CJ대한통운 등 주요 기업 사례
- **모의 견적**: 실시간 에너지 절감 효과 계산기
- **사업 문의**: 맞춤형 견적 문의 시스템
- **회사 소개**: 회사 연혁, 특허 및 인증서, 오시는 길
- **IR 센터**: 공시 정보 및 공고사항 관리

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animation**: Custom CSS animations + Intersection Observer
- **Image Optimization**: Next.js Image component

### Backend & Database
- **CMS**: Sanity Studio
- **Database**: Supabase (PostgreSQL)
- **Email Service**: Resend
- **File Storage**: Sanity Assets

### DevOps & Deployment
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics
- **Environment**: Node.js

### External APIs
- **Maps**: Kakao Map API
- **Email**: Resend API

## 📁 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── about/               # 회사 소개 페이지
│   ├── api/                 # API 라우트
│   │   └── contact/         # 문의 접수 API
│   ├── cases/               # 도입 사례 페이지
│   ├── ir/                  # IR 센터
│   │   ├── disclosures/     # 공시 정보
│   │   └── notices/         # 공고 사항
│   ├── solutions/           # EMS 솔루션 페이지
│   ├── studio/              # Sanity Studio
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 메인 페이지
│   └── page.client.tsx      # 클라이언트 컴포넌트
├── components/              # 재사용 가능한 컴포넌트
│   ├── animation/           # 애니메이션 컴포넌트
│   ├── card/                # 카드 형태 컴포넌트
│   ├── carousel/            # 캐러셀 컴포넌트
│   ├── chart/               # 차트 컴포넌트
│   ├── form/                # 폼 컴포넌트
│   ├── header/              # 헤더 컴포넌트
│   ├── hero/                # 히어로 섹션
│   ├── statistics/          # 통계 컴포넌트
│   └── ui/                  # 기본 UI 컴포넌트
├── sanity/                  # Sanity CMS 설정
│   ├── lib/                 # Sanity 클라이언트 및 유틸리티
│   └── schemaTypes/         # 스키마 정의
└── lib/                     # 유틸리티 함수
```

## 🌐 배포 정보

### Production Environment
- **URL**: [https://www.merlotlab.com](https://www.merlotlab.com)
- **CDN**: Vercel Edge Network (Global)
- **SSL**: 자동 HTTPS (Let's Encrypt)
- **Performance**: 
  - Core Web Vitals 최적화
  - Image Optimization (WebP, AVIF)
  - Code Splitting & Lazy Loading


## 📊 주요 페이지

### 1. 메인 페이지 (`/`)
- 히어로 섹션 with 이미지 슬라이더
- 주요 도입사 로고 캐러셀
- 에너지 효율화 사업 설명 차트
- 가격 정책 (초기 투자 비용 0원)
- 도입 프로세스 5단계
- 모의 견적 / 사업 문의 폼

### 2. EMS 솔루션 (`/solutions`)
- 사업장 유형별 솔루션 소개
- 스마트폰 기반 모니터링 시스템
- 핵심 가치 및 회사 강점

### 3. 도입 사례 (`/cases`)
- 필터링 가능한 포트폴리오 카드
- 무한 스크롤 with 애니메이션
- 이미지 슬라이더
- 실시간 검색 기능

### 4. 회사 소개 (`/about`)
- 회사 연혁 타임라인
- 특허 및 인증서 갤러리
- 카카오 맵 기반 오시는 길
- 교통편 안내

### 5. IR 센터 (`/ir`)
- 공시 정보 목록 및 상세
- 공고 사항 목록 및 상세
- 페이지네이션
- 검색 기능
- 파일 다운로드

## 🎨 디자인 시스템

### 색상 팔레트
- Primary: `#583CF2` (메를로랩 브랜드 컬러)
- Secondary: 그레이 스케일
- Success: 그린 톤
- Warning: 오렌지/옐로우 톤

### 타이포그래피
- 기본 폰트: Arial, Helvetica, sans-serif
- IR 페이지: Titillium Web

### 반응형 브레이크포인트
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## 📧 문의 시스템

### 모의 견적 기능
- 사업장 유형별 절감률 자동 계산
- 실시간 전기 요금 시뮬레이션
- 투자 회수 기간 계산

### 사업 문의 기능
- 기관 유형별 맞춤 폼
- 자동 응답 이메일
- 관리자 알림 시스템

## 🔧 주요 컴포넌트

### 애니메이션
- `FadeInUp`: 스크롤 기반 페이드인 애니메이션
- `SplitText`: 텍스트 글자별 애니메이션
- `CountUp`: 숫자 카운트업 애니메이션

### 차트
- `AnimatedEnergyChart`: 에너지 효율화 사업 설명 차트

### 폼
- `QuoteForm`: 모의 견적 계산 폼
- `BusinessInquiryForm`: 사업 문의 폼

### 캐러셀
- `LogoCarouselMain`: 메인 페이지 회사 로고 캐러셀
- `LogoCarouselCases`: 사례 페이지 로고 캐러셀

## 🔒 보안 및 성능

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **폰트 최적화**: Google Fonts 사전 로딩
- **SEO 최적화**: 메타데이터, 구조화 데이터, 사이트맵
- **성능 모니터링**: Vercel Analytics
- **보안**: 환경 변수를 통한 API 키 관리

## 📈 SEO 최적화

- 구조화 데이터 (Organization, WebSite, SiteNavigation)
- 동적 메타데이터
- XML 사이트맵
- robots.txt
- Open Graph 및 Twitter 카드


## 📞 연락처

- **회사**: 메를로랩 (MerlotLab)
- **주소**: 서울특별시 금천구 디지털로9길 68 대륭포스트 타워 5차 2002~2005호
- **전화**: 02-862-1700
- **이메일**: info@merlotlab.com
- **웹사이트**: [https://www.merlotlab.com](https://www.merlotlab.com)

## 📄 라이선스

이 프로젝트는 메를로랩의 독점 소프트웨어입니다. 모든 권리는 메를로랩에 있습니다.

---

**© 2025 MerlotLab. All Rights Reserved.**
