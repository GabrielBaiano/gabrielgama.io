"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, MoreHorizontal, Bookmark, Repeat2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { FeedPostActions } from "./FeedPostActions";

export interface FeedPostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  timeAgo: string;
  title: string;
  content: string;
  imageUrl?: string;
  href?: string;
  metrics: {
    upvotes: number;
    comments?: number;
  };
  isShared?: {
    by: string;
  };
  category?: string;
  sections?: { id: string; title: string; body: string; }[];
}

export function FeedPost({ post }: { post: FeedPostProps }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] border border-stone-200/60 p-5 shadow-sm transition-all hover:shadow-md"
    >
      {post.isShared && (
        <div className="flex items-center gap-2 mb-4 text-[13px] font-medium text-stone-500 ml-1">
          <Repeat2 className="w-4 h-4 text-stone-400" />
          <span>Shared by {post.isShared.by}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-stone-900">{post.author.name}</h3>
              <span className="text-[13px] text-stone-500">{post.author.handle}</span>
              <span className="text-stone-300">•</span>
              <span className="text-[13px] text-stone-500">{post.timeAgo}</span>
            </div>
            {post.category && (
              <div className="text-[12px] font-medium text-emerald-600 mt-0.5">
                {post.category}
              </div>
            )}
          </div>
        </div>
        <button className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content Block linking to Post Detail Page */}
      <Link href={`/feed/${post.id}` as any} className="mb-4 space-y-3 group cursor-pointer block">
        <h2 className="text-xl font-medium tracking-tight text-stone-900 leading-snug group-hover:text-orange-500 transition-colors">
          {post.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-stone-600 whitespace-pre-line group-hover:text-stone-700 transition-colors">
          {post.content}
        </p>
        
        {post.imageUrl && (
          <div className="mt-4 rounded-[16px] overflow-hidden border border-stone-100 bg-stone-50">
            <img src={post.imageUrl} alt="Post content" className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
          </div>
        )}
      </Link>

      {/* Footer / Actions */}
      <FeedPostActions metrics={post.metrics} />
    </motion.article>
  );
}
