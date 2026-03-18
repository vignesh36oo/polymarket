"use client";

import React, { useState } from "react";
import { 
  Code, Link as LinkIcon, Bookmark, ChevronDown, 
  BarChart2, CandlestickChart, Activity, Info
} from "lucide-react";

function OrderBookSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mt-12 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? '' : 'hover:border-zinc-400 dark:hover:border-zinc-600'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-transparent outline-none cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm">Order Book</h3>
          <Info size={14} className="text-zinc-500 hover:text-white transition-colors" />
        </div>
        <div className="flex items-center gap-1 text-sm text-zinc-500 font-bold">
          {isOpen && <span className="mr-2">$29.8K Vol.</span>}
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={16} className="text-zinc-600" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-sm font-bold text-zinc-500">
              <button className="text-black dark:text-white">Trade Up</button>
              <button className="hover:text-black dark:hover:text-white transition-colors">Trade Down</button>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <button className="text-[#f7931a] flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-current flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-current rounded-full" />
                </div>
                Maker Rebate
              </button>
              <button className="text-blue-500 flex items-center gap-1 hover:text-blue-400 transition-colors">
                <span className="text-lg leading-none font-medium mb-0.5">+</span> Rewards
              </button>
              <button className="text-zinc-500 hover:text-white transition-colors ml-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
              </button>
            </div>
          </div>

          <div className="w-full text-[10px] font-black text-zinc-500 uppercase tracking-wider mb-2 grid grid-cols-4 gap-4 px-2">
            <div className="flex items-center gap-1.5 col-span-1">
              TRADE UP
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <div className="text-center col-span-1">PRICE</div>
            <div className="text-center col-span-1">SHARES</div>
            <div className="text-right col-span-1">TOTAL</div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800/80 rounded-xl overflow-hidden text-xs">
            <div className="py-2.5 text-center font-bold text-blue-500/80 border-b border-zinc-200 dark:border-zinc-800/80 bg-blue-500/5">
              No asks
            </div>
            <div className="flex justify-between items-center py-2.5 text-zinc-500 font-bold px-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#12151c]/50">
              <span>Last: 99¢</span>
              <span>Spread: 0¢</span>
              <span className="w-16" />
            </div>
            <div className="py-2.5 text-center font-bold text-emerald-500/80 bg-emerald-500/5">
              No bids
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RulesSection() {
  const [activeTab, setActiveTab] = useState<'rules' | 'context'>('rules');

  return (
    <div className="mt-10">
      <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-5 px-1">
        <button 
          onClick={() => setActiveTab('rules')}
          className={`text-sm font-bold pb-3 transition-colors ${activeTab === 'rules' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
        >
          Rules
        </button>
        <button 
          onClick={() => setActiveTab('context')}
          className={`text-sm font-bold pb-3 transition-colors ${activeTab === 'context' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
        >
          Market Context
        </button>
      </div>
      
      {activeTab === 'rules' && (
        <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed animate-in fade-in duration-300">
          This market will resolve to "Up" if the Bitcoin price at the end of the time range specified in the title is greater than or equal to the price at the beginning of that range. Otherwise, it will resolve to "Down".
        </p>
      )}

      {activeTab === 'context' && (
        <div className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed animate-in fade-in duration-300">
          <p>
            The market resolved "Up" per Chainlink BTC/USD data, with price rising from ~$67,850 at 7:45AM ET to ~$67,920 by 7:50AM on March 17 amid light weekend trading. No targeted news covered this exact 5-minute window in the past week; broader Bitcoin developments included steady ETF inflows topping $1B, MicroStrategy's ongoing buys, and analyst optimism for post-halving rallies, but volatility stayed low around 67k, reinforcing the minor uptick without major catalysts. Outcome probabilities locked at 100% Up post-resolution.
          </p>
          <p className="mt-4">
            Results are experimental.
          </p>
        </div>
      )}
    </div>
  );
}

function ActivitySection() {
  const [activeTab, setActiveTab] = useState<'comments' | 'holders' | 'positions' | 'activity'>('comments');

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-6 px-1">
        <button 
          onClick={() => setActiveTab('comments')}
          className={`text-sm font-bold pb-3 transition-colors ${activeTab === 'comments' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
        >
          Comments (34,786)
        </button>
        <button 
          onClick={() => setActiveTab('holders')}
          className={`text-sm font-bold pb-3 transition-colors ${activeTab === 'holders' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
        >
          Top Holders
        </button>
        <button 
          onClick={() => setActiveTab('positions')}
          className={`text-sm font-bold pb-3 transition-colors ${activeTab === 'positions' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
        >
          Positions
        </button>
        <button 
          onClick={() => setActiveTab('activity')}
          className={`text-sm font-bold pb-3 transition-colors ${activeTab === 'activity' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
        >
          Activity
        </button>
      </div>

      {activeTab === 'comments' && (
        <div className="animate-in fade-in duration-300">
          {/* Add Comment Input */}
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-4 pr-24 text-sm text-black dark:text-white focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-700 transition-colors"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#0099ff] hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors">
              Post
            </button>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-bold text-black dark:text-white">
                Newest <ChevronDown size={14} className="text-zinc-400" />
              </button>
              <label className="flex items-center gap-2 text-sm font-bold text-black dark:text-white cursor-pointer group">
                <div className="w-5 h-5 rounded p-0.5 border border-zinc-200 dark:border-zinc-800 bg-transparent flex items-center justify-center group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                </div>
                Holders
              </label>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#12151c]/50 text-xs font-medium text-zinc-500">
              <Info size={14} className="text-zinc-400" />
              Beware of external links.
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {[
              { author: "Hado-meta", time: "now", text: "rawdogging the 5m without poly cue is just crazy...", likes: 0, avatar: "from-red-500 to-purple-500" },
              { author: "CryptoGambler600...", time: "13m ago", text: "waiting for the 68k break before taking any position here", likes: 2, avatar: "from-zinc-700 to-zinc-900" },
            ].map((comment, i) => (
              <div key={i} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br ${comment.avatar} flex items-center justify-center overflow-hidden`}>
                  {i === 0 && <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center"><div className="w-4 h-4 bg-cyan-400 rounded-sm"></div></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black dark:text-white">{comment.author}</span>
                      <span className="text-xs text-zinc-500 font-medium">{comment.time}</span>
                    </div>
                    <button className="text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    {comment.text}
                  </p>
                  <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-400 transition-colors text-xs font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {comment.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#1c202a] text-xs font-bold text-zinc-500 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors border border-transparent dark:border-zinc-800/80">
              Min amount <ChevronDown size={14} className="text-zinc-500" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Live
            </div>
          </div>

          <div className="space-y-1">
            {[
              { user: "0xd15075c4efc8d...", action: "bought", qty: "100", type: "Down", price: "1.0", total: "$1", time: "6m", avatar: "from-emerald-400 to-cyan-400" },
              { user: "xstats", action: "sold", qty: "1", type: "Up", price: "99.0", total: "$1", time: "7m", avatar: "from-orange-400 to-red-400" },
              { user: "eddddddddd", action: "sold", qty: "2", type: "Up", price: "99.0", total: "$2", time: "7m", avatar: "from-emerald-400 to-teal-400" },
              { user: "PhantomSniper", action: "sold", qty: "7", type: "Up", price: "99.0", total: "$7", time: "7m", avatar: "from-purple-400 to-pink-400" },
              { user: "Remarkable-Heif...", action: "sold", qty: "11", type: "Up", price: "99.0", total: "$11", time: "7m", avatar: "from-zinc-400 to-zinc-600" },
              { user: "Unhappy-Interje...", action: "sold", qty: "15", type: "Up", price: "99.0", total: "$15", time: "7m", avatar: "from-yellow-400 to-green-400" },
              { user: "Doanfg", action: "sold", qty: "2", type: "Up", price: "99.0", total: "$2", time: "7m", avatar: "from-blue-400 to-indigo-400" },
              { user: "Royal-Paranoia", action: "sold", qty: "2", type: "Up", price: "99.0", total: "$2", time: "7m", avatar: "from-pink-400 to-rose-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group hover:bg-zinc-50 dark:hover:bg-[#12151c] p-2.5 -mx-2.5 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.avatar}`}></div>
                  <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    <span className="font-bold text-black dark:text-white">{item.user}</span>{" "}
                    <span>{item.action}</span>{" "}
                    <span className={`font-bold ${item.type === 'Up' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.qty} {item.type}</span>{" "}
                    <span>at {item.price}¢</span>{" "}
                    <span className="text-zinc-400 dark:text-zinc-500">({item.total})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                  {item.time} ago
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Holders Tab */}
      {activeTab === 'holders' && (
        <div className="animate-in fade-in duration-300">
          <div className="flex gap-12">
            {/* Up Holders */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
                <span className="font-bold text-sm text-black dark:text-white">Up holders</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase">SHARES</span>
              </div>
              <div className="space-y-1">
                {[
                  { user: "para888", shares: "290", avatar: "from-yellow-400 to-amber-600" },
                  { user: "Steel-Lag", shares: "195", avatar: "from-lime-400 to-green-600" },
                  { user: "DonaldRump", shares: "136", avatar: "from-zinc-700 to-zinc-900" },
                  { user: "0xbdf9804e0811d5bde33c68bd24e88a26e613ca...", shares: "110", avatar: "from-teal-400 to-emerald-600" },
                  { user: "0x25366h872f639565H49uRuL7b5d544390NV", shares: "100", avatar: "from-purple-400 to-pink-600" },
                  { user: "abacaxi", shares: "76", avatar: "from-blue-400 to-indigo-600" },
                  { user: "jakipica", shares: "60", avatar: "from-cyan-400 to-blue-600" },
                  { user: "vague-sourdough", shares: "57", avatar: "from-red-400 to-orange-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-[#12151c] p-2 -mx-2 rounded-xl transition-colors cursor-pointer border-b border-transparent dark:border-zinc-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatar}`}></div>
                      <span className="text-sm font-bold text-black dark:text-white">{item.user}</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-500">{item.shares}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Down Holders */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
                <span className="font-bold text-sm text-black dark:text-white">Down holders</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase">SHARES</span>
              </div>
              <div className="space-y-1">
                {[
                  { user: "Losingggstreak", shares: "3,000", avatar: "from-green-400 to-emerald-600" },
                  { user: "MrmrmrYAYAYA", shares: "2,738", avatar: "from-purple-500 to-purple-700" },
                  { user: "Anxious-Fountain", shares: "1,018", avatar: "from-lime-400 to-green-500" },
                  { user: "emir22", shares: "886", avatar: "from-violet-400 to-purple-600" },
                  { user: "Heavy-Coral", shares: "629", avatar: "from-red-400 to-rose-600" },
                  { user: "5pmhappyhour", shares: "600", avatar: "from-yellow-400 to-lime-500" },
                  { user: "talam", shares: "591", avatar: "from-fuchsia-400 to-pink-600" },
                  { user: "Bztisejvfu", shares: "500", avatar: "from-green-500 to-emerald-700" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-[#12151c] p-2 -mx-2 rounded-xl transition-colors cursor-pointer border-b border-transparent dark:border-zinc-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatar}`}></div>
                      <span className="text-sm font-bold text-black dark:text-white">{item.user}</span>
                    </div>
                    <span className="text-sm font-medium text-rose-500">{item.shares}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Positions Tab */}
      {activeTab === 'positions' && (
        <div className="animate-in fade-in duration-300">
          <div className="flex justify-end gap-2 mb-6">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-[#12151c] transition-colors">
              All <ChevronDown size={14} className="text-zinc-500" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-[#12151c] transition-colors">
              Desc <ChevronDown size={14} className="text-zinc-500" />
            </button>
          </div>

          <div className="flex gap-12">
            {/* Up Positions */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
                <span className="font-bold text-sm text-black dark:text-white">Up</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase">PNL</span>
              </div>
              <div className="space-y-1">
                {[
                  { user: "0xe594336603f4fb5d3ba4125...", avg: "$0.59", pnl: "$3,054.99", avatar: "from-amber-100 to-emerald-600" },
                  { user: "livebreathevolatility", avg: "$0.64", pnl: "$1,111.05", avatar: "from-yellow-300 to-green-500" },
                  { user: "purple-lamp-tree", avg: "$0.56", pnl: "$888.17", avatar: "from-blue-200 to-indigo-600" },
                  { user: "dmbl", avg: "$0.43", pnl: "$877.45", avatar: "from-blue-300 to-purple-600" },
                  { user: "dracarysth", avg: "$0.41", pnl: "$861.26", avatar: "from-red-400 to-orange-500" },
                  { user: "0x1414960e5f6860744b284e7...", avg: "$0.68", pnl: "$738.96", avatar: "from-cyan-400 to-blue-600" },
                  { user: "snoopdoge", avg: "$0.56", pnl: "$622.58", avatar: "from-zinc-700 to-zinc-900" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-[#12151c] p-2 -mx-2 rounded-xl transition-colors cursor-pointer border-b border-transparent dark:border-zinc-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatar}`}></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-black dark:text-white">{item.user}</span>
                        <span className="text-xs text-zinc-500">avg {item.avg}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-500">{item.pnl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Down Positions */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
                <span className="font-bold text-sm text-black dark:text-white">Down</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase">PNL</span>
              </div>
              <div className="space-y-1">
                {[
                  { user: "VOID-PEPPER", avg: "$0.10", pnl: "$350.86", avatar: "from-green-300 to-emerald-600" },
                  { user: "qT9vL2", avg: "$0.16", pnl: "$256.56", avatar: "from-emerald-300 to-teal-500" },
                  { user: "BrokePinata", avg: "$0.13", pnl: "$100.25", avatar: "from-indigo-300 to-purple-600" },
                  { user: "yydd2", avg: "$0.04", pnl: "$91.99", avatar: "from-lime-400 to-green-500" },
                  { user: "prtss334", avg: "$0.38", pnl: "$54.15", avatar: "from-purple-400 to-pink-500" },
                  { user: "VortexLane", avg: "$0.35", pnl: "$42.18", avatar: "from-violet-200 to-purple-500" },
                  { user: "xr9-PLM42", avg: "$0.28", pnl: "$32.87", avatar: "from-green-400 to-emerald-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-[#12151c] p-2 -mx-2 rounded-xl transition-colors cursor-pointer border-b border-transparent dark:border-zinc-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatar}`}></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-black dark:text-white">{item.user}</span>
                        <span className="text-xs text-zinc-500">avg {item.avg}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-500">{item.pnl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventPage() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [selectedOutcome, setSelectedOutcome] = useState<'up' | 'down'>('up');
  const [tradeMode, setTradeMode] = useState<'limit' | 'market'>('limit');
  const [isHoveringMode, setIsHoveringMode] = useState(false);

  const isBuy = side === 'buy';
  const isLimit = tradeMode === 'limit';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c10] text-black dark:text-white transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Chart and Info) */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#f7931a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M16.6 8.5L17.7 4.1L15.6 3.6L14.5 7.9C13.9 7.8 13.4 7.6 12.8 7.5L13.9 3.2L11.8 2.7L10.7 7C10.2 6.9 9.8 6.8 9.2 6.7L6.6 6.1L6.1 8.2C6.1 8.2 7.5 8.5 7.4 8.5C8.2 8.7 8.3 9.3 8.3 9.8L7.3 13.8C7.3 13.8 7.3 13.9 7.2 14.1C7.4 14.1 7.6 14.2 8 14.3C7.9 14.3 7.8 14.3 7.8 14.3L6.7 18.6L8.8 19.1L9.9 14.8C10.4 14.9 11 15 11.5 15.2L10.4 19.5L12.5 20L13.6 15.7C16.3 16.1 18.2 15.7 19.1 13.3C19.9 11.4 19.2 10.3 17.6 9.6C18.7 9.3 19.5 8.7 19.2 7.1C18.9 5.8 17.8 5.2 15.7 4.7L16.6 8.5ZM13 14.2C12 14 11 13.7 9.8 13.5L10.5 10.5C11.5 10.7 12.5 11 13.6 11.2C14.4 11.4 14.7 11.8 14.6 12.5C14.3 13.4 13.7 14.4 13 14.2ZM13.8 9.5C12.9 9.2 12 9 10.9 8.7L11.6 6C12.5 6.2 13.3 6.4 14.1 6.6C14.8 6.8 15 7.1 14.9 7.7C14.7 8.5 14.3 9.7 13.8 9.5Z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold leading-tight mb-1">Bitcoin Up or Down - 5 Minutes</h1>
                  <p className="text-zinc-500 font-medium text-sm">March 17, 7-7:05AM ET</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <button className="hover:text-black dark:hover:text-white transition-colors"><Code size={20} /></button>
                <button className="hover:text-black dark:hover:text-white transition-colors"><LinkIcon size={20} /></button>
                <button className="hover:text-black dark:hover:text-white transition-colors"><Bookmark size={20} /></button>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-zinc-500 text-sm font-bold mb-1">Price to beat</p>
                <h2 className="text-3xl font-black tabular-nums tracking-tight">$73,734.95</h2>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 dark:bg-[#1c202a] hover:bg-zinc-200 dark:hover:bg-[#252a36] transition-colors text-sm font-bold text-zinc-900 dark:text-zinc-100">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Go to live market
                <ChevronDown size={16} className="-rotate-90 text-zinc-500" />
              </button>
            </div>

            {/* Chart Area */}
            <div className="h-[400px] w-full relative mb-6">
              {/* Fake grid lines */}
              <div className="absolute inset-x-0 bottom-0 top-10 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-zinc-200 dark:border-zinc-800/50 border-dashed w-full h-0 relative">
                  <span className="absolute right-0 -translate-y-1/2 bg-white dark:bg-[#0b0c10] pl-2 text-xs font-mono text-zinc-500">$73,900</span>
                </div>
                <div className="border-b border-zinc-200 dark:border-zinc-800/50 border-dashed w-full h-0 relative">
                  <span className="absolute right-0 -translate-y-1/2 bg-white dark:bg-[#0b0c10] pl-2 text-xs font-mono text-zinc-500">$73,800</span>
                </div>
                <div className="border-b border-zinc-200 dark:border-zinc-800/50 border-dashed w-full h-0 relative">
                  <div className="absolute right-0 -translate-y-1/2 flex items-center gap-2 bg-white dark:bg-[#0b0c10] pl-2">
                    <span className="bg-zinc-200 dark:bg-zinc-600 text-black dark:text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Target</span>
                    <span className="text-xs font-mono text-zinc-500">$73,700</span>
                  </div>
                </div>
              </div>

              {/* Fake SVG Chart Line */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
                <path d="M0 300 C 100 300, 150 320, 200 300 S 300 280, 400 280 S 500 260, 600 260 S 650 200, 700 150" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="700" cy="150" r="4" fill="#f59e0b" />
                <circle cx="700" cy="150" r="8" fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M700 150 V 400" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3" />
                {/* Gradient Fill under line */}
                <path d="M0 400 L0 300 C 100 300, 150 320, 200 300 S 300 280, 400 280 S 500 260, 600 260 S 650 200, 700 150 L700 400 Z" fill="url(#chart-gradient)" opacity="0.1" />
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time labels below chart */}
              <div className="absolute bottom-[-24px] left-0 right-16 flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>4:30:00 PM</span>
                <span>4:31:00 PM</span>
                <span>4:32:00 PM</span>
                <span>4:33:00 PM</span>
                <span>4:34:00 PM</span>
                <span>4:35:00 PM</span>
              </div>
            </div>

            {/* Chart controls footer */}
            <div className="flex items-center justify-between pt-8">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1c202a] text-xs font-bold transition-colors">
                  Past <ChevronDown size={14} className="text-zinc-500" />
                </button>
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1c202a]">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 relative flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-transparent border-b-white"></div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-red-500 relative flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-white"></div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-zinc-500 mx-0.5"></div>
                </div>
                <button className="px-3 py-1.5 rounded-full bg-white dark:bg-white text-black text-xs font-bold">
                  7:05 AM
                </button>
                <button className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1c202a] text-zinc-500 hover:text-white transition-colors text-xs font-bold">
                  7:10 AM
                </button>
                <button className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1c202a] text-zinc-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  7:15 AM
                </button>
                <button className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1c202a] text-zinc-500 hover:text-white transition-colors text-xs font-bold">
                  7:20 AM
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-[#1c202a] text-xs font-bold transition-colors text-zinc-500 hover:text-white">
                  More <ChevronDown size={14} className="text-zinc-500" />
                </button>
              </div>
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-[#1c202a] rounded-lg p-1">
                <button className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-black dark:hover:text-white">
                  <Activity size={16} />
                </button>
                <button className="p-1.5 rounded bg-zinc-200 dark:bg-zinc-700 text-black dark:text-[#f7931a] shadow-sm">
                  <BarChart2 size={16} />
                </button>
                <button className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-black dark:hover:text-white">
                  <CandlestickChart size={16} />
                </button>
              </div>
            </div>

            {/* Order Book Section */}
            <OrderBookSection />

            {/* Rules / Market Context Section */}
            <RulesSection />

            {/* Activity Section */}
            <ActivitySection />
          </div>

          {/* Right Column (Trading Card) */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white dark:bg-[#12151c] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm sticky top-24">
              
              {/* Buy / Sell Tabs */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4 text-sm font-bold">
                  <button 
                    onClick={() => setSide('buy')}
                    className={`pb-1 transition-colors ${side === 'buy' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
                  >
                    Buy
                  </button>
                  <button 
                    onClick={() => setSide('sell')}
                    className={`pb-1 transition-colors ${side === 'sell' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-zinc-500 hover:text-black dark:hover:text-white border-b-2 border-transparent'}`}
                  >
                    Sell
                  </button>
                </div>
                <div 
                  className="relative"
                  onMouseEnter={() => setIsHoveringMode(true)}
                  onMouseLeave={() => setIsHoveringMode(false)}
                >
                  <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                    {tradeMode === 'limit' ? 'Limit' : 'Market'} <ChevronDown size={14} className={`transition-transform duration-200 ${isHoveringMode ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isHoveringMode && (
                    <div className="absolute right-0 top-full pt-2 z-50">
                      <div className="bg-white dark:bg-[#1c202a] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl py-1.5 w-32 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <button 
                          onClick={() => {
                            setTradeMode('limit');
                            setIsHoveringMode(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-xs font-bold transition-colors ${tradeMode === 'limit' ? 'text-blue-500 bg-blue-500/5' : 'text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                        >
                          Limit
                        </button>
                        <button 
                          onClick={() => {
                            setTradeMode('market');
                            setIsHoveringMode(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-xs font-bold transition-colors ${tradeMode === 'market' ? 'text-blue-500 bg-blue-500/5' : 'text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                        >
                          Market
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Up / Down Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setSelectedOutcome('up')}
                  className={`font-black py-3 rounded-xl transition-all shadow-lg ${
                    selectedOutcome === 'up' 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                      : 'bg-zinc-100 dark:bg-[#252a36] text-zinc-400 dark:text-zinc-500 border border-transparent dark:border-zinc-700/50'
                  }`}
                >
                  Yes 29¢
                </button>
                <button 
                  onClick={() => setSelectedOutcome('down')}
                  className={`font-black py-3 rounded-xl transition-all shadow-lg ${
                    selectedOutcome === 'down' 
                      ? 'bg-red-500 text-white shadow-red-500/20' 
                      : 'bg-zinc-100 dark:bg-[#252a36] text-zinc-400 dark:text-zinc-500 border border-transparent dark:border-zinc-700/50'
                  }`}
                >
                  No 72¢
                </button>
              </div>

              {/* Form Inputs */}
              <div className="space-y-6 mb-6">
                {isLimit ? (
                  <>
                    {/* Limit Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-zinc-400">Limit Price</span>
                      <div className="flex items-center bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 w-[180px]">
                        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white transition-colors focus:outline-none">
                          <span className="text-xl font-light leading-none">-</span>
                        </button>
                        <input 
                          type="text" 
                          defaultValue="28¢" 
                          className="w-full bg-transparent text-center text-sm font-bold focus:outline-none text-white"
                        />
                        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white transition-colors focus:outline-none">
                          <span className="text-xl font-light leading-none">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Shares */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-zinc-400">Shares</span>
                        <input 
                          type="text" 
                          defaultValue="1,311" 
                          className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-right text-sm font-bold w-[180px] focus:outline-none text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-1.5 mt-2">
                        {isBuy ? (
                          ['-100', '-10', '+10', '+100', '+200'].map(val => (
                            <button key={val} className="px-3 py-1.5 bg-zinc-100 dark:bg-[#1c202a] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold rounded-lg transition-colors">
                              {val}
                            </button>
                          ))
                        ) : (
                          <>
                            {['25%', '50%', 'Max'].map(val => (
                              <button key={val} className="px-3 py-1.5 bg-zinc-100 dark:bg-[#1c202a] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold rounded-lg transition-colors">
                                {val}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                      {!isBuy && (
                        <div className="flex justify-end mt-2 text-[10px] font-bold text-emerald-500 items-center gap-1">
                          <Info size={12} /> 1,311 matching
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Market Mode */}
                    {isBuy ? (
                      <div>
                        <div className="flex justify-between items-end mb-6">
                          <span className="text-sm font-bold text-zinc-400 mb-2">Amount</span>
                          <span className="text-4xl font-black text-white">$1,311</span>
                        </div>
                        <div className="flex justify-end gap-1.5">
                          {['+$1', '+$5', '+$10', '+$100', 'Max'].map(val => (
                            <button key={val} className="px-4 py-2 bg-zinc-100 dark:bg-[#1c202a] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-300 text-xs font-bold rounded-lg transition-colors">
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-end mb-6">
                          <span className="text-sm font-bold text-zinc-400 mb-2">Shares</span>
                          <span className="text-4xl font-black text-white">1,311</span>
                        </div>
                        <div className="flex justify-end gap-1.5">
                          {['25%', '50%', 'Max'].map(val => (
                            <button key={val} className="px-4 py-2 bg-zinc-100 dark:bg-[#1c202a] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-300 text-xs font-bold rounded-lg transition-colors">
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Set Expiration */}
              <div className="flex justify-between items-center py-5 border-t border-b border-zinc-100 dark:border-zinc-800/50 mb-4">
                <span className="text-sm text-zinc-500 font-medium">Set Expiration</span>
                <button className="w-9 h-5 bg-zinc-200 dark:bg-[#252a36] rounded-full relative">
                  <span className="absolute left-[3px] top-[3px] w-[14px] h-[14px] bg-white rounded-full transition-all"></span>
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-4 mb-6">
                {!isBuy || isLimit ? (
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                      {isBuy ? 'Total' : "You'll receive"} {(!isBuy && isLimit) && <Info size={12} className="inline ml-1" />}
                    </span>
                    <span className={`${isBuy ? 'text-blue-500' : 'text-emerald-500'} flex items-center gap-1`}>
                      {!isBuy && (
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h2.45c.1 1.05.9 1.48 1.94 1.48 1.15 0 2-.47 2-1.39 0-.82-.57-1.27-1.89-1.61-2.11-.53-3.46-1.34-3.46-3.1 0-1.45 1.06-2.52 2.76-2.88V5.37h2.67v1.86c1.37.29 2.54 1.25 2.76 2.89h-2.39c-.19-.89-.95-1.19-1.82-1.19-1 0-1.75.52-1.75 1.28 0 .8.62 1.13 1.97 1.49 2.3.61 3.38 1.54 3.38 3.12 0 1.63-1.18 2.72-2.88 3.09z" />
                        </svg>
                      )}
                      $367.08
                    </span>
                  </div>
                ) : null}

                {isBuy && (
                  <div className="flex justify-between items-center font-bold">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 text-sm">
                        To win <Info size={12} className="text-zinc-400" />
                      </span>
                      {!isLimit && (
                        <span className="text-[11px] text-zinc-500 font-medium">Avg. Price 29¢ <Info size={10} className="inline" /></span>
                      )}
                    </div>
                    <span className={`${isLimit ? 'text-emerald-500' : 'text-emerald-400 text-3xl font-black'} flex items-center gap-1`}>
                       <svg width={isLimit ? 14 : 24} height={isLimit ? 14 : 24} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h2.45c.1 1.05.9 1.48 1.94 1.48 1.15 0 2-.47 2-1.39 0-.82-.57-1.27-1.89-1.61-2.11-.53-3.46-1.34-3.46-3.1 0-1.45 1.06-2.52 2.76-2.88V5.37h2.67v1.86c1.37.29 2.54 1.25 2.76 2.89h-2.39c-.19-.89-.95-1.19-1.82-1.19-1 0-1.75.52-1.75 1.28 0 .8.62 1.13 1.97 1.49 2.3.61 3.38 1.54 3.38 3.12 0 1.63-1.18 2.72-2.88 3.09z" />
                      </svg>
                      $4,520.69
                    </span>
                  </div>
                )}

                {(!isBuy && !isLimit) && (
                   <div className="text-[11px] text-zinc-500 font-medium -mt-2">Avg. Price 28¢ <Info size={10} className="inline" /></div>
                )}
              </div>

              {/* Trade Button */}
              <button className="w-full bg-[#0099ff] hover:bg-blue-500 text-white font-black py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-500/20 mb-4 active:scale-[0.98]">
                Trade
              </button>

              <p className="text-center text-xs text-zinc-500">
                By trading, you agree to the <a href="#" className="underline hover:text-zinc-400">Terms of Use</a>.
              </p>

              {/* Related Markets List */}
              <div className="border-t border-zinc-200 dark:border-zinc-800/80 border-dashed pt-5 mt-6">
                <div className="flex items-center gap-1 mb-5">
                  <button className="px-3 py-1.5 bg-transparent text-zinc-500 font-bold text-xs hover:text-black dark:hover:text-white transition-colors">5 Min</button>
                  <button className="px-3 py-1.5 bg-zinc-200 dark:bg-[#252a36] text-black dark:text-white font-bold text-xs rounded-full transition-colors">15 Min</button>
                  <button className="px-3 py-1.5 bg-transparent text-zinc-500 font-bold text-xs hover:text-black dark:hover:text-white transition-colors">1 Day</button>
                </div>

                <div className="space-y-4">
                  {[
                    { bg: "bg-[#f7931a]", name: "Bitcoin Up or Down - 15 minutes", pct: "3%", type: "Up", color: "text-emerald-500", dot: "bg-emerald-500" },
                    { bg: "bg-indigo-500", name: "Ethereum Up or Down - 15 minutes", pct: "2%", type: "Up", color: "text-emerald-500", dot: "bg-emerald-500" },
                    { bg: "bg-black dark:bg-[#14f195]", name: "Solana Up or Down - 15 minutes", pct: "2%", type: "Up", color: "text-emerald-500", dot: "bg-emerald-500" },
                    { bg: "bg-zinc-800", name: "XRP Up or Down - 15 minutes", pct: "1%", type: "Up", color: "text-rose-500", dot: "bg-rose-500" },
                  ].map((market, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${market.bg}`}>
                          <div className="w-4 h-4 rounded-full bg-white opacity-90 mix-blend-overlay"></div>
                        </div>
                        <span className="text-xs font-bold text-black dark:text-white truncate">
                          {market.name}
                        </span>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0 ml-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1 h-1 rounded-full ${market.dot}`}></span>
                          <span className={`text-xs font-black text-black dark:text-white`}>{market.pct}</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">{market.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
