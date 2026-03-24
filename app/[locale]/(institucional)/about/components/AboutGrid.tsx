"use client";

import { useTranslations } from "next-intl";
import { FolderCard } from "./FolderCard";
import { AboutMeCard } from "./AboutMeCard";
import { GithubActivityChart } from "./GithubActivityChart";
import { RabbitCard } from "./RabbitCard";
import { SocialFolderCard } from "./SocialFolderCard";

export function AboutGrid() {
    const t = useTranslations("About");

    return (
        <div className="flex flex-col gap-5 w-full max-w-[1240px] mx-auto p-4 mb-20">
            {/* Top Row: Folder + About Me */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
                {/* Folder Card */}
                <div className="w-full md:w-[340px] shrink-0 aspect-[3/2] z-40">
                    <FolderCard
                        color="#94B9FF"
                        hoverColor="#9DBEFF"
                        label={t("projects")}
                        subtitle="Experimentações web"
                    >
                        {/* Capa */}
                        <div key="welcome" className="w-full h-[250px] flex flex-col justify-center items-center gap-4 bg-stone-50 border-2 border-stone-100 rounded-none p-8 text-center">
                            <h3 className="text-3xl font-bold text-stone-800 tracking-tight">Meus Projetos</h3>
                            <p className="text-stone-500 leading-relaxed font-sans text-[16px] max-w-sm">
                                Bem vindo ao repositório! Role pelos papéis flutuantes abaixo para ver o que construímos nessa sessão.
                            </p>
                        </div>
                        
                        {/* 5 Folhas de Projetos */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`project-${i}`} className="w-full h-[350px] flex flex-col justify-center items-center bg-white border border-stone-200 rounded-none p-8 text-center group transition-colors hover:bg-slate-50 cursor-pointer shadow-sm">
                                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-none flex items-center justify-center mb-6 ring-8 ring-blue-50/50 font-black text-2xl group-hover:scale-110 transition-transform duration-500">
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                                <h4 className="text-2xl font-bold text-stone-800 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">Visual Demo {i + 1}</h4>
                                <p className="text-stone-500 max-w-md text-[15px] leading-relaxed">
                                    Esta é mais uma folha renderizada fisicamente fora da pasta, demonstrando a perfeita intercalação entre a aba traseira fixa e a o painel de rolagem.
                                </p>
                            </div>
                        ))}
                    </FolderCard>
                </div>
                
                {/* About Me Card */}
                <div className="flex-1 flex min-w-[320px]">
                    <AboutMeCard />
                </div>
            </div>

            {/* Bottom Row: GitHub Activity + Rabbit + Social Folder + Photos Folder */}
            <div className="flex flex-col lg:flex-row gap-5 w-full">
                <div className="w-full lg:w-[440px] shrink-0">
                    <GithubActivityChart />
                </div>
                <div className="flex-1 flex flex-wrap gap-5 justify-center lg:justify-start items-center">
                    <RabbitCard />
                    <SocialFolderCard />
                    
                    {/* Yellow Photos Folder */}
                    <div className="w-full max-w-[280px] shrink-0 aspect-[3/2]">
                        <FolderCard
                            color="#FACC15"
                            hoverColor="#FDE047"
                            label={t("academic_certificates")}
                            subtitle="Galeria"
                        >
                            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-stone-200 rounded-xl">
                                <span className="text-stone-400 text-sm font-medium">Álbum em construção...</span>
                            </div>
                        </FolderCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
