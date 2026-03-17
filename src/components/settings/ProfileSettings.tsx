"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ProfileSettings() {
  const { user } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email || "");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [bio, setBio] = useState("");

  const address = user?.proxyWallet;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Profile Settings</h2>

      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-500 flex-shrink-0 mb-8 shadow-lg"></div>

      <div className="space-y-6 max-w-2xl">
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-4 py-2.5 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-4 py-2.5 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
          />
          <div className="pt-1 flex items-center gap-2">
            {/* <input 
               type="checkbox" 
               id="updates"
               checked={receiveUpdates}
               onChange={(e) => setReceiveUpdates(e.target.checked)}
               className="w-3.5 h-3.5 rounded border-zinc-700 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" 
            /> */}
            <label htmlFor="updates" className="text-xs text-zinc-500 cursor-pointer">Receive important market updates</label>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Address</label>
          <div className="flex items-center gap-2">
            <div className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-500 font-mono text-sm">
              {address}
            </div>
            <button className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className="w-full h-24 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-4 py-2.5 outline-none text-zinc-900 dark:text-zinc-100 transition-colors resize-none"
          />
        </div>

        {/* Social Connections */}
        {/* <div className="space-y-3 pt-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Social Connections</label>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-semibold">
            <span className="font-bold text-lg leading-none">𝕏</span> Connect X
          </button>
        </div> */}

        <div className="pt-4">
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98]">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
