"use client";

import { useTranslations } from "next-intl";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#FDFDFD] flex items-center justify-center">
      <div className="w-full max-w-[620px] px-6 py-24 md:py-32">
        
        {/* Top Spacer / Emoji Placeholder */}
        {/* Você pode trocar esse emoji depois como mencionou */}
        <div className="text-[52px] sm:text-[68px] leading-none mb-5 select-none -translate-x-1">
          🌱
        </div>
        
        <h1 className="text-[19px] sm:text-[20px] font-semibold tracking-[-0.03em] text-stone-950 leading-none">
          Gabriel Gama
        </h1>
        <p className="text-[15px] sm:text-[16px] text-stone-400 tracking-[-0.01em] mt-1.5 mb-8 font-medium">
          Brazil
        </p>

        <div className="flex flex-col gap-6 text-[17px] sm:text-[18px] font-medium leading-[1.65] tracking-[-0.01em] text-stone-800">
          <p>
            As a child, I was fascinated by the intersection of art and technology. Little did I know at the time, but that fascination combined with my natural wonder for the digital world would be the start of my journey in software design.
          </p>
          <p>
            Currently engineering seamless experiences and elevating digital products with React + native curiosity.
          </p>
        </div>

      </div>
    </section>
  );
}
