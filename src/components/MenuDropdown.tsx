"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  DollarSign,
  Settings,
  Moon,
  HelpCircle,
  Shield,
  ChevronRight,
  LogOut,
  Copy,
} from "lucide-react";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/features/theme/themeSlice";

export default function MenuDropdown() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleLogout } = useWeb3Auth();

  const truncateAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleTheme());
  };

  return (
    <div className="top-14 right-0 w-72 bg-white dark:bg-[#161922] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Profile Section */}
      {isAuthenticated && (
        <div className="px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-500 flex-shrink-0 shadow-sm overflow-hidden border-2 border-white dark:border-zinc-800">
              {user?.profile_image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}${user.profile_image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-grow">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {user?.username || "Anonymous User"}
              </span>
              <div
                className="flex items-center gap-1.5 group/addr cursor-pointer"
                onClick={() => (user?.proxy_wallet || user?.proxyWallet) && copyToClipboard(user?.proxy_wallet || user?.proxyWallet || "")}
              >
                <span className="text-[10px] text-zinc-500 font-mono truncate">
                  {truncateAddress(user?.proxy_wallet || user?.proxyWallet)}
                </span>
                <Copy size={10} className="text-zinc-400 opacity-0 group-hover/addr:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prime Actions */}
      <div className="px-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-zinc-900 dark:text-zinc-100">
          <Trophy
            size={18}
            className="text-yellow-500 group-hover:scale-110 transition-transform"
          />
          <span className="text-sm font-semibold">Leaderboard</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-zinc-900 dark:text-zinc-100">
          <div className="w-5 h-5 flex items-center justify-center bg-emerald-500 rounded-full">
            <DollarSign size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold">Rewards</span>
        </button>
        {isAuthenticated && (
          <>
            <button
              onClick={() => router.push("/settings?tab=profile")}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-zinc-900 dark:text-zinc-100"
            >
              <Settings size={18} className="text-zinc-500 group-hover:rotate-45 transition-transform" />
              <span className="text-sm font-semibold">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-zinc-900 dark:text-zinc-100">
              <Settings size={18} className="text-rose-400" />
              <span className="text-sm font-semibold">APIs</span>
            </button>
          </>
        )}
      </div>

      {/* Theme Toggle Section */}
      <div className="px-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-2">
        <div className="flex items-center justify-between px-3 py-2.5 text-zinc-900 dark:text-zinc-100">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-blue-500" />
            <span className="text-sm font-semibold">Dark mode</span>
          </div>
          <button
            onClick={handleToggle}
            className={`w-11 h-6 rounded-full transition-colors relative ${mode === "dark" ? "bg-blue-600" : "bg-zinc-300"}`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${mode === "dark" ? "translate-x-5" : "translate-x-0"} shadow-sm`}
            ></div>
          </button>
        </div>
      </div>

      {/* Secondary Links Section */}
      <div className="px-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-2 space-y-0.5">
        <button className="w-full text-left px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          Accuracy
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          Documentation
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          Help Center
        </button>
        <button className="w-full text-left px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          Terms of Use
        </button>
      </div>

      {/* Language Section & Logout */}
      <div className="px-2 mt-1 space-y-1">
        <button className="w-full flex items-center justify-between px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group text-zinc-900 dark:text-zinc-100">
          <span className="text-sm font-medium">语言</span>
          <ChevronRight
            size={16}
            className="text-zinc-400 group-hover:translate-x-0.5 transition-transform"
          />
        </button>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors group text-rose-500 dark:text-rose-400 border-t border-zinc-100 dark:border-zinc-800 mt-1"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
