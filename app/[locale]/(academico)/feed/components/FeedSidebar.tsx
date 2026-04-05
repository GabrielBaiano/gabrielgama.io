"use client";

import { Search, Hash, Mail, Layers } from "lucide-react";

export function FeedSidebar() {
  const categories = [
    { name: "Project Updates", count: 24 },
    { name: "YouTube Videos", count: 12 },
    { name: "Blog Posts", count: 18 },
    { name: "Academic Research", count: 5 },
    { name: "Personal Articles", count: 9 },
  ];

  return (
    <aside className="sticky top-[100px] flex flex-col gap-6">
      
      {/* Search Widget */}
      <div className="bg-white rounded-[24px] border border-stone-200/60 p-2 shadow-sm focus-within:shadow-md focus-within:border-stone-300 transition-all">
        <div className="relative flex items-center justify-between bg-stone-50 rounded-[18px] px-4 py-3 border border-stone-100">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="w-full bg-transparent border-none outline-none pl-3 text-[14px] text-stone-900 placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-[24px] border border-stone-200/60 p-5 shadow-sm">
        <h3 className="text-[16px] font-semibold tracking-tight text-stone-900 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          Categories
        </h3>
        
        <div className="flex flex-col gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-start justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-50 text-stone-400 group-hover:bg-stone-100 group-hover:text-stone-900 transition-colors">
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[14px] font-medium text-stone-900 group-hover:text-indigo-600 transition-colors">{cat.name}</div>
                  <div className="text-[12px] text-stone-400">{cat.count} posts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-5 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-[13px] font-medium text-stone-600 hover:text-stone-900 transition-colors">
          View all tags
        </button>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-stone-900 flex flex-col justify-between rounded-[24px] overflow-hidden p-6 shadow-xl relative min-h-[180px]">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800 opacity-50 z-0" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-[15px] font-medium tracking-tight text-white leading-tight">Join the Newsletter</h3>
        </div>
        
        <div className="relative z-10 space-y-4 pt-2">
          <p className="text-[13px] text-stone-400 leading-relaxed">Let's keep in touch! Get notified when I drop new articles, or side projects.</p>
          <div className="flex bg-white/10 rounded-full border border-white/10 p-1">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-transparent border-none outline-none pl-3 text-[13px] text-white placeholder:text-stone-400"
            />
            <button className="px-4 py-1.5 bg-white text-stone-950 text-[13px] font-medium rounded-full hover:bg-stone-200 transition-colors shrink-0">
              Assinar
            </button>
          </div>
        </div>
      </div>

    </aside>
  );
}
