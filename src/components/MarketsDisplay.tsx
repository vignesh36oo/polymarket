"use client";

import React from "react";
import MarketCard from "@/components/MarketCard";
import { Search, Settings2, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

interface MarketsDisplayProps {
  category: string;
}

export default function MarketsDisplay({ category }: MarketsDisplayProps) {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [markets, setMarkets] = React.useState<any[]>([]);

  const [subCategories, setSubCategories] = React.useState<string[]>(["All"]);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = React.useState(false);
  const [showRightScroll, setShowRightScroll] = React.useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [subCategories]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Fetch Questions (Markets) based on selected activeFilter
  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api';
        
        // Let's pass the active filter as 'market' payload. If it's 'All', our backend handles it.
        const response = await fetch(`${url}/question/list`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ market: activeFilter })
        });
        
        const data = await response.json();
        if (data.success && data.result) {
          // Map backend questions to our MarketCard props
          const formattedMarkets = data.result.map((q: any) => {
            const yesAmount = parseFloat(q.yesPool || 0);
            const noAmount = parseFloat(q.noPool || 0);
            const total = yesAmount + noAmount;
            const yesPercent = total > 0 ? Math.round((yesAmount / total) * 100) : 50;

            return {
              id: q._id,
              title: q.title || "Untitled Market",
              image: q.image || "https://cryptologos.cc/logos/polymarket-poly-logo.svg", // Fallback image if missing
              options: [{ name: "Yes", percentage: yesPercent }],
              volume: `$${(total).toLocaleString()}`, // Using pool total as volume approximation for now
              category: q.market,
              variant: "binary", // Ensure cards show as yes/no binary defaults for these
              badge: q.status === "resolved" ? "RESOLVED" : "LIVE"
            };
          });
          setMarkets(formattedMarkets);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [activeFilter]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api';
        const response = await fetch(`${url}/market/get-markets`);
        const data = await response.json();
        if (data.success && data.result) {
          const apiCategories = data.result.map((m: any) => m.name);
          setSubCategories(["All", ...apiCategories]);
        }
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };
    fetchCategories();
  }, []);

  const normalize = (str: string) =>
    str.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  // Local text search filtering on top of fetched items
  const filteredMarkets = (
    category === "All" || category === "Trending"
      ? markets
      : markets.filter(
          (m) =>
            normalize(m.category) === normalize(category) ||
            normalize(m.title).includes(normalize(category)),
        )
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Markets Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-black dark:text-white">
          All markets
        </h1>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-500">
          <button className="hover:text-black dark:hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="hover:text-black dark:hover:text-white transition-colors">
            <Settings2 size={20} />
          </button>
          <button className="hover:text-black dark:hover:text-white transition-colors">
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      {/* Sub-Category Filter Bar */}
      <div className="relative mb-8 group">
        {showLeftScroll && (
          <>
            <div className="absolute left-0 top-0 bottom-2 w-16 bg-gradient-to-r from-white dark:from-[#0b0c10] to-transparent pointer-events-none z-10"></div>
            <button 
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-[calc(50%+4px)] w-8 h-8 flex items-center justify-center bg-white dark:bg-[#12151c] border border-zinc-200 dark:border-zinc-800 rounded-full shadow-md text-zinc-400 hover:text-black dark:hover:text-white transition-all z-20"
            >
              <ChevronLeft size={16} />
            </button>
          </>
        )}

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 px-8"
        >
          {subCategories.map((sub, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === sub
                  ? "bg-blue-600/10 text-blue-600 dark:bg-blue-600 dark:text-white"
                  : "bg-zinc-100 dark:bg-[#12151c] text-zinc-500 dark:text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {showRightScroll && (
          <>
            <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-white dark:from-[#0b0c10] to-transparent pointer-events-none z-10"></div>
            <button 
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-[calc(50%+4px)] w-8 h-8 flex items-center justify-center bg-white dark:bg-[#12151c] border border-zinc-200 dark:border-zinc-800 rounded-full shadow-md text-zinc-400 hover:text-black dark:hover:text-white transition-all z-20"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Markets Grid */}
      {filteredMarkets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredMarkets.map((market, index) => (
            <MarketCard key={index} {...(market as any)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
            <Search size={24} className="text-zinc-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">No markets found</h3>
            <p className="text-zinc-500 text-sm">
              Try selecting a different category or search term.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
