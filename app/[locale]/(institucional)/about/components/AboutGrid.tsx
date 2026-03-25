"use client";

import { useTranslations } from "next-intl";
import { FolderCard } from "./FolderCard";
import { AboutMeCard } from "./AboutMeCard";
import { GithubActivityChart } from "./GithubActivityChart";
import { RabbitCard } from "./RabbitCard";
import { SocialFolderCard } from "./SocialFolderCard";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceItem } from "./ExperienceItem";
import { 
    Zap, 
    Compass, 
    Cpu, 
    User, 
    ArrowRightLeft, 
    CheckCircle2 
} from "lucide-react";

export function AboutGrid() {
    const t = useTranslations("About");

    return (
        <div className="flex flex-col gap-5 w-full max-w-[1240px] mx-auto p-4 mb-20">
            {/* Top Row: About Me -> Experience */}
            <div className="flex flex-col md:flex-row gap-5 w-full items-stretch">
                <div className="flex-1 max-w-[740px] flex min-w-[320px] w-full">
                    <AboutMeCard />
                </div>
                
                {/* Experience/Curriculum Widget */}
                <div className="w-full md:w-[440px] shrink-0 z-40 flex">
                    <ExperienceCard
                        currentJob={{
                            role: "Front-end Pleno",
                            company: "Flash",
                            color: "#FF3B00",
                            period: `2025 — ${t('current_indicator')}`,
                            description: "Desenvolvimento de Micro Front-ends com React e Next.js. Otimização de performance (lazy loading/code-splitting) reduzindo o tempo de carregamento em 40%."
                        }}
                    >
                        <ExperienceItem 
                            role="Front-end Pleno"
                            company="Flash"
                            period={`2025 — ${t('current_indicator')}`}
                            color="#FF3B00"
                            icon={Zap}
                            description="Desenvolvimento de Micro Front-ends com React e Next.js. Otimização de performance (lazy loading/code-splitting) reduzindo o tempo de carregamento em 40%."
                        />
                        <ExperienceItem 
                            role="Estágio Mobile"
                            company="Compass UOL"
                            period="2024 - 2025"
                            color="#00AEEF"
                            icon={Compass}
                            description="Desenvolvimento mobile iOS/Android com React Native e TypeScript. Foco em fidelidade visual pixel-perfect e animações fluídas."
                        />
                        <ExperienceItem 
                            role="Front-end Júnior"
                            company="TECHSOLUTION"
                            period="2023 - 2024"
                            color="#10B981"
                            icon={Cpu}
                            description="Interfaces de alta performance com React.js. Implementação de camada BFF com Node.js e Prisma, otimizando o fluxo de dados em 15%."
                        />
                        <ExperienceItem 
                            role="Front-end Freelancer"
                            company="Emporio 24h"
                            period="2021 - 2023"
                            color="#F59E0B"
                            icon={User}
                            description="Arquitetura de Web App customizado (JavaScript/HTML/CSS) e automação de inventário, reduzindo erros manuais."
                        />
                        <ExperienceItem 
                            role="Career Transition"
                            company="Career"
                            period="2023 - 2023"
                            color="#6366F1"
                            icon={ArrowRightLeft}
                            description="Pausa estratégica para transição de Qualidade Industrial para Desenvolvimento de Software e consolidação de freelances."
                        />
                        <ExperienceItem 
                            role="Analista Qualidade"
                            company="Schultz"
                            period="2022 - 2022"
                            color="#8B5CF6"
                            icon={CheckCircle2}
                            description="Implementação da norma IFS Foods. Otimização operacional (+30%) e monitoramento digital da rastreabilidade."
                        />
                        <ExperienceItem 
                            company="Açai Paraense"
                            period="2021 - 2022"
                            color="#EC4899"
                            icon={CheckCircle2}
                            subRoles={[
                                {
                                    role: "Analista de qualidade Junior",
                                    period: "jun de 2021 - jan de 2022",
                                    description: "Responsável pela conformidade dos produtos e a conferência de normas de higiene na unidade, auxiliando na organização da rotina do setor."
                                },
                                {
                                    role: "Assistente de Almoxarifado",
                                    period: "fev de 2021 - jun de 2021",
                                    description: "Controle de estoque, coleta de dados de produção e suporte direto à gerência e analistas seniores."
                                }
                            ]}
                            isLast
                        />
                    </ExperienceCard>
                </div>
            </div>

            {/* Bottom Row: Folder -> Github Activity -> Rabbit -> Social Folder */}
            <div className="flex flex-col lg:flex-row gap-5 w-full items-start">
                {/* Projects Folder Card */}
                <div className="w-full md:w-[440px] shrink-0 aspect-[3/2] z-40">
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

                <div className="flex-1 flex flex-wrap gap-5 justify-center lg:justify-start items-center">
                    <div className="w-full lg:w-[440px] shrink-0">
                        <GithubActivityChart />
                    </div>
                    <RabbitCard />
                    <SocialFolderCard />
                </div>
            </div>
        </div>
    );
}
