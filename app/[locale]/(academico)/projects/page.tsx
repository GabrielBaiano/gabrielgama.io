import { useTranslations } from "next-intl";
import { Layers, Play, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Frontend developer",
      description: "Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.",
      color: "bg-indigo-500/10",
      tag: "Code"
    },
    {
      title: "Product Designer",
      description: "Crafting intuitive and aesthetically pleasing interfaces for a global audience.",
      color: "bg-rose-500/10",
      tag: "Design"
    },
    {
      title: "System Architect",
      description: "Building scalable and resilient backends that support high-performance web applications.",
      color: "bg-emerald-500/10",
      tag: "Architecture"
    },
  ];

  return (
    <div className="min-h-screen relative w-full bg-stone-50/50 selection:bg-stone-200 pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
        <div className="mb-12 pl-2 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-stone-900 font-sans leading-tight">
            Projects
          </h1>
          <p className="text-stone-500 text-[16px] mt-4 leading-relaxed">
            Featured work across frontend engineering, product design, and system architecture.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((project, i) => (
            <div key={i} className="group relative w-full aspect-auto md:aspect-[21/9] flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
              
              {/* Visual Side */}
              <div className={`relative w-full md:w-[60%] h-[300px] md:h-full ${project.color} overflow-hidden border-b md:border-b-0 md:border-r border-stone-100`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-stone-400/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center">
                <div className="text-[12px] uppercase tracking-widest font-semibold text-stone-400 mb-4">
                  {project.tag}
                </div>
                <h3 className="text-3xl font-medium text-stone-900 mb-4 group-hover:text-stone-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-stone-500 mb-8">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-2 text-stone-900 font-medium group-hover:text-stone-600 transition-colors text-sm">
                    View Project Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}