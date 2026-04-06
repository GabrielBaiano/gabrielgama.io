"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Share2, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPostActionsProps {
  metrics: {
    upvotes: number;
    comments?: number;
  };
}

export function BlogPostActions({ metrics }: BlogPostActionsProps) {
  const [voteStatus, setVoteStatus] = useState<'up' | 'none'>('none');
  const [isSaved, setIsSaved] = useState(false);
  const [showBookmarkTip, setShowBookmarkTip] = useState(false);
  const [shortcut, setShortcut] = useState('Ctrl + D');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      setShortcut(isMac ? '⌘ + D' : 'Ctrl + D');
    }
  }, []);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setShowBookmarkTip(true);
    setTimeout(() => setShowBookmarkTip(false), 4000);
  };

  const rawUpvotes = metrics.upvotes + (voteStatus === 'up' ? 1 : 0);
  const displayUpvotes = rawUpvotes > 9999 ? "9999+" : rawUpvotes.toString();

  return (
    <div className="flex items-center pt-3 mt-4">
      <button 
        onClick={(e) => { e.preventDefault(); setVoteStatus(prev => prev === 'up' ? 'none' : 'up') }}
        className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-colors ${voteStatus === 'up' ? 'bg-orange-50 text-orange-600' : 'bg-[#F9F9F9] hover:bg-[#F2F2F2]'}`}
      >
        <ArrowUp className={`w-4 h-4 transition-transform ${voteStatus === 'up' ? 'stroke-[2.5] text-orange-600 -translate-y-0.5' : 'text-stone-500 group-hover:-translate-y-0.5'}`} />
        <span className={`text-[14px] font-medium ${voteStatus === 'up' ? 'text-orange-600' : 'text-stone-700'}`}>
          {displayUpvotes}
        </span>
      </button>

      <button 
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-stone-500 hover:bg-[#F9F9F9] hover:text-stone-900 transition-colors ml-1"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-[14px] font-medium">Share</span>
      </button>

      <div className="flex-1" />

      <div className="relative">
        <AnimatePresence>
          {showBookmarkTip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-3 w-[220px] bg-stone-900 text-stone-100 text-[13px] font-medium p-3.5 rounded-[16px] shadow-2xl pointer-events-none z-50 leading-relaxed"
            >
              Para adicionar na barra de favoritos do navegador, pressione <strong className="text-orange-400 font-bold">{shortcut}</strong> no seu teclado.
              <div className="absolute -bottom-1.5 right-4 w-3.5 h-3.5 bg-stone-900 rotate-45 rounded-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={handleBookmark}
          className={`p-2.5 rounded-full transition-colors ${isSaved ? 'text-orange-500 bg-orange-50' : 'text-stone-400 hover:text-stone-900 hover:bg-[#F9F9F9]'}`}
        >
          <Bookmark className={`w-[18px] h-[18px] ${isSaved ? 'fill-orange-500' : ''}`} />
        </button>
      </div>
    </div>
  );
}
